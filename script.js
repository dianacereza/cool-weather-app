//////// DATE&TIME ///////////

let now = new Date ();
let dateToday  = document.getElementById("dateToday");
let hours = now.getHours();
if (hours < 10){
    hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let day = days[now.getDay()];

dateToday.innerHTML = `${day}, ${hours}:${minutes}`;

//////////// WEATHER BY CITY ////////////
function showTemperature(response){
 document.querySelector("#city").innerHTML = response.data.name;
 document.querySelector("#temperature-now").innerHTML = `${Math.round(response.data.main.temp)}ºC`;
 document.querySelector("#weather-type").innerHTML = `${response.data.weather[0].description}`;
 document.querySelector("#humidity-now").innerHTML = `Humidity ${response.data.main.humidity}`;
 document.querySelector("#wind-now").innerHTML = `Wind ${response.data.wind.speed}`;
 
}

function searchCity(city){
let apiKey ="338ad8d174dc01460bda54dd03bef62b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}


function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchLocation(position){
let apiKey ="338ad8d174dc01460bda54dd03bef62b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function getCurrenLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrenLocation);

searchCity("New York");