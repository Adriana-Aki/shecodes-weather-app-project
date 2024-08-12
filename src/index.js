function displayCurrentInfo(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  console.log(response.data);
  temperatureElement.innerHTML = temperature;
  console.log(temperature);

  let currentInfo = document.querySelector(".current-info");
  let description = response.data.condition.description;
  currentInfo.innerHTML = description;
  console.log(description);
  let currentHumidity = document.querySelector(".current-humidity");
  let humidity = response.data.temperature.humidity;
  console.log(humidity);
  currentHumidity.innerHTML = humidity;
  let currentWind = document.querySelector(".current-humidity");
  let windSpeed = response.data.wind.speed;
  console.log(windSpeed);
  currentWind.innerHTML = windSpeed;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let emojiElement = document.querySelector(".current-temperature-icon");
  let emojiUrl = response.data.condition.icon_url;
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function search(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentInfo);
}

function handlerSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatForecastDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  console.log(forecastElement);
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handlerSearchSubmit);

search("Barcelona");
