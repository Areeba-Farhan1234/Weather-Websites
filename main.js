document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'YOUR_API_KEY';
  const searchInput = document.getElementById('search');
  const searchButton = document.querySelector('.btn');
  
  searchButton.addEventListener('click', function() {
    const city = searchInput.value;
    if (city) {
      getWeatherData(city);
    }
  });

  async function getWeatherData(city) {
    try {
      const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const currentWeatherData = await currentWeatherResponse.json();
      displayCurrentWeather(currentWeatherData);
      
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  function displayCurrentWeather(data) {
    const temperatureElement = document.querySelector('.heading');
    const weatherIconElement = document.querySelector('.weather-icon');
    const descriptionElement = document.querySelector('.body-3');
    const calendarElement = document.querySelector('.calendar');
    const locationElement = document.querySelector('.location');

    temperatureElement.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    descriptionElement.textContent = data.weather[0].description;
    calendarElement.textContent = new Date().toLocaleDateString();
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
  }

  function displayForecast(data) {
    const forecastElement = document.getElementById('day-forecast');
    const forecastList = document.querySelector('.card ul');

    forecastList.innerHTML = ''; // Clear previous forecast

    data.list.forEach(item => {
      const forecastDate = new Date(item.dt * 1000);
      if (forecastDate.getHours() === 12) { // Show data for 12:00 PM
        const listItem = document.createElement('li');
        listItem.classList.add('items');
        
        const iconsWrapper = document.createElement('div');
        iconsWrapper.classList.add('icons-wrapper', 'd-flex');
        
        const weatherIcon = document.createElement('img');
        weatherIcon.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        weatherIcon.alt = 'weather-icon';
        weatherIcon.width = 46;
        weatherIcon.height = 46;
        weatherIcon.classList.add('weather-icon');
        
        const temperature = document.createElement('p');
        temperature.classList.add('temperature');
        temperature.textContent = `${Math.round(item.main.temp)}&deg;C`;
        
        const date = document.createElement('p');
        date.classList.add('dates');
        date.textContent = forecastDate.toLocaleDateString();
        
        const day = document.createElement('p');
        day.classList.add('days');
        day.textContent = forecastDate.toLocaleDateString(undefined, { weekday: 'long' });

        iconsWrapper.appendChild(weatherIcon);
        iconsWrapper.appendChild(temperature);
        iconsWrapper.appendChild(date);
        iconsWrapper.appendChild(day);

        listItem.appendChild(iconsWrapper);
        forecastList.appendChild(listItem);
      }
    });

    forecastElement.innerHTML = '5 Days Forecast';
  }

  // Automatically get weather data for a default city on page load
  getWeatherData('London');
});
