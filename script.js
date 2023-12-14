const API_KEY = "4958bb891db13d2d347c35a7836d7a7a";

document.getElementById("searchButton").addEventListener("click", function () {
  const cityInput = document.getElementById("cityInput").value;

  if (cityInput) {
    getCoordinates(cityInput);
  } else {
    alert("Please enter a city name");
  }
});

function getCoordinates(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.coord) {
        const coordinates = {
          lat: data.coord.lat,
          lon: data.coord.lon
        };
        getWeatherDetails(coordinates);
      } else {
        console.error("Error: Coordinates not found in API response", data);
      }
    })
    .catch(error => console.error("Error fetching coordinates:", error));
}

function getWeatherDetails(coordinates) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayWeatherInfo(data);
      })
      .catch(error => console.error("Error fetching weather details:", error));
  }
  
  function displayWeatherInfo(weatherData) {
    const weatherInfoContainer = document.getElementById("weatherInfo");
  
    if (weatherData.main) {
      const temperature = Math.round(weatherData.main.temp - 273.15);
      const description = weatherData.weather[0].description;
      const country = weatherData.sys.country;
      const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
      const windSpeed = weatherData.wind.speed;
  
      const html = `
        <h3>Current Weather</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Country: ${country}</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
  
      weatherInfoContainer.innerHTML = html;
    } else {
      console.error("Error: 'main' property not found in API response", weatherData);
      weatherInfoContainer.innerHTML = "<p>Error fetching weather details</p>";
    }
  }
  