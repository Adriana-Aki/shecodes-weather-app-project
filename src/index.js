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
}

function handlerSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}
function search(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentInfo);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handlerSearchSubmit);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

search("Barcelona");
