let cityInput = document.getElementById('search');
let searchIcon = document.getElementById('fa-search');
let searchBtn = document.getElementById('searchBtn');
let apiKey = '3beea88fd75d88a6059e4eaf7f7df31f';
let currentWeatherCard = document.querySelector('.content-left .card');
let fiveDaysForecastCard = document.getElementById('day-forecast');

function getWeatherDetails(name, lat, lon, country, state) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
            <div class="card-body p-0">
                <h2 class="card-title">Now</h2>
                <div class="weapper">
                    <div class="heading">${(data.main.temp - 273.15).toFixed(2)}&deg;<sup>c</sup></div>
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" width="74" height="74" class="weather-icon">
                </div>
                <div class="body-3">${data.weather[0].description}</div>
                <hr>
                <ul class="list">
                    <li class="items">
                        <span><i class="fa-solid fa-calendar"></i></span>
                        <div class="calender">${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</div>
                    </li>
                    <li class="items">
                        <span><i class="fa-solid fa-location-dot"></i></span>
                        <div class="location" id="location">${name}, ${country}</div>
                        <span></span>
                    </li>
                </ul>
            </div>
        `;
    }).catch(() => {
        alert(`Failed to fetch current weather`);
    });

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        fiveDaysForecastCard.innerHTML = '';
        for (let i = 0; i < fiveDaysForecast.length; i++) {
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `


            <section>
              <div class="card">
                <ul class="list day-forecast">
                  <li class="items">
                      <div class="icons-wrapper d-flex">
                          <img src="http://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}@2x.png" alt="weather-icon" width="46" height="46" class="weather-icon">
                          <span>
                              <p class="temperature">${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;<sup>c</sup></p>
                          </span>
                          <p class="dates">${date.getDate()} ${months[date.getMonth()]}</p>
                          <p class="days">${days[date.getDay()]}</p>
                      </div>
                  </li>
              </ul>
              </div>
            </section>
            `;
        }
    }).catch(() => {
        alert(`Failed to fetch weather forecast`);
    });
}

function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if (!cityName) return;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let { name, lat, lon, country, state } = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

searchIcon.addEventListener('click', getCityCoordinates);
searchBtn.addEventListener('click', getCityCoordinates);
