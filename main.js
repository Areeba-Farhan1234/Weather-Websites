let cityInput = document.getElementById('search');
let searchIcon = document.getElementById('fa-search');
let searchBtn = document.getElementById('searchBtn');
let apiKey = '3beea88fd75d88a6059e4eaf7f7df31f';
let currentWeatherCard = document.querySelector('.content-left .card');
let fiveDaysForecastCard = document.getElementById('forecast-day');
let apiCard = document.querySelector('.content-right .card');
let sunriseCard = document.querySelector('.content-right .card');
humidityVal = document.getElementById('humidityVal'),
pressureVal = document.getElementById('pressureVal'),
visibilityVal = document.getElementById('visibilityVal'),
FeelsVal = document.getElementById('FeelsVal');
hourlyForcastCard = document.querySelector('.content-right #card-box');
apiList = ["Good", "Fair", "Moderate", "Poor", "VeryPoor"];


function getWeatherDetails(name, lat, lon, country, state) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
                                             
        let {so2, no2, pm10, nh3} = data.list[0].components;  
        apiCard.innerHTML = `
                    <div class="card-body">
                        <h2 class="card-title">Today's Highlights</h2>
                        <div id="small-cards" class="d-flex flex-wrap flex-lg-nowrap justify-content-between">
                                <div class="card card-sm mb-3" style="width: 580px">
                                    <div class="card-body">
                                        <div class="d-flex flex-column flex-sm-column">
                                            <div class="air-quality">
                                                <h4 class="air-title">Air Quality Index</h4>
                                                <button class="good api-${data.list[0].main.api}"> ${apiList[data.list[0].main.api - 1]} </button>  
                                            </div>
                                            <div class="air d-flex flex-column flex-sm-row">
                                                <img src="images/wind.png" alt="air" width="46px" height="46px" class="justify-content-center"/>
                                                <ul class="ms-3">
                                                <li>
                                                    <p class="air-scale">SO<sub>2</sub></p>
                                                    <h3 class="air-nmnr">${so2}</h3>
                                                </li>
                                                <li>
                                                    <p class="air-scale">SO<sub>2</sub></p>
                                                    <h3 class="air-nmnr">${no2}</h3>
                                                </li>
                                                <li>
                                                    <p class="air-scale">SO<sub>2</sub></p>
                                                    <h3 class="air-nmnr">${pm10}</h3>
                                                </li>
                                                <li>
                                                    <p class="air-scale">SO<sub>2</sub></p>
                                                    <h3 class="air-nmnr">${nh3}</h3>
                                                </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
        `;
    }).catch(() => {
        alert(`Failed to fetch Quality Index`);
    }),


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
        let [sunrise , sunset] = data.sys,
        {timezonne, visibility} = data,
        {humidity, pressure, Feels} = data.main,
        sunRiseTime = moment.utc(sunrise, 'X').add(timezonne, 'seconds').format('hh:mm A'),
        sunSetTime = moment.utc(sunset, 'X').add(timezonne, 'seconds').format('hh:mm A');
        sunriseCard.innerHTML = `
            <div class="card card-sm mb-3" style="width: 580px;">
                  <div class="card-body">
                    <div class="sunrise-sunset">
                      <h3 class="sunset-title">Sunrise & Sunset</h3>
                    </div>
                    <div class="sun-times d-flex align-items-center flex-column flex-sm-row">
                      <ul class="list-unstyled me-3">
                        <li class="d-flex align-items-center">
                          <img src="images/sun .png" alt="sun" width="56px" height="56px" class="me-2">
                          <div>
                            <div class="set">Sunrise</div>
                            <div class="time">${sunRiseTime}</div>
                          </div>
                        </li>
                      </ul>
                      <ul class="list-unstyled">
                        <li class="d-flex align-items-center">
                          <img src="images/moon.png" alt="moon" width="56px" height="56px" class="me-2">
                          <div>
                            <div class="set">Sunset</div>
                            <div class="time">${sunSetTime}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                </div>
            </div>
        `;
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure} hPa`;
        visibilityVal.innerHTML = `${visibility / 1000}km`;
        FeelsVal.innerHTML = `${(Feels - 273.15).toFixed(2)}&deg;C`;

    }).catch(() => {
        alert(`Failed to fetch current weather`);
    }),

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForcast = data.list;
        hourlyForcastCard.innerHTML = ``;
        for(i = 0; i <= 7; i++) {
            let hrForecastDate = new Date(hourlyForcast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            let a = 'PM';
            if(hr < 12) a = 'AM';
            if(hr == 0) hr = 12;
            if(hr > 12) hr = hr - 12;
            hourlyForcastCard.innerHTML = `
                    <div class="card-body">
                        <ul class="list-unstyled text-center">
                            <li class="times-days">${hr} ${a}</li>
                            <li class="img-days">
                                <img src="https://openweathermap.org/img/wn/${hourlyForcast[i].weather[0].icon}@2x.png" alt="clouds" width="78px" height="70px"/>
                            </li>
                            <li class="cel-days">${(hourlyForcast[i].main.temp - 273.15).toFixed(2)}&deg;C</li>
                        </ul>
                    </div>
            `;
        }
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
                <ul class="list" id="forecast-day">
                  <li class="items">
                      <div class="icons-wrapper d-flex">
                          <img src="http://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}@2x.png" alt="weather-icon" width="46" height="46" class="weather-icon">
                          <span>
                              <p class="temperature" {style="font-size: 1.5rem"}>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;<sup>c</sup></p>
                          </span>
                          <p class="dates">${date.getDate()} ${months[date.getMonth()]}</p>
                          <p class="days">${days[date.getDay()]}</p>
                      </div>
                  </li>
              </ul>
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
