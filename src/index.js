function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let setTemp = document.querySelector("#current-temp");
  setTemp.innerHTML = `${temperature}°C`;

  let setCity = document.querySelector("#city-search");
  setCity.innerHTML = response.data.name;

  let unix_timestamp = response.data.dt;
  let timezone = response.data.timezone;
  let date = new Date(unix_timestamp * 1000 + timezone * 1000);

  let formatedTime = date.toLocaleString("en-UK", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let setCurrentTime = document.querySelector("#current-time");
  setCurrentTime.innerHTML = formatedTime;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let todaysDate = date.getDate();

  let formattedDate = `${day}, ${todaysDate} ${month}`;
  let setCurrentDay = document.querySelector("#current-day");
  setCurrentDay.innerHTML = formattedDate;
}

function retrievePosition(position, event) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-fillin");

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let cityName = city.value;
  let urlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(urlSearch).then(showWeather);
}
let cityButton = document.querySelector("#city-seatch-form");
cityButton.addEventListener("submit", citySearch);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("submit", retrievePosition);
