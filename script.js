
let dayOfWeek = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[dayOfWeek.getDay()];

let minutes = dayOfWeek.getMinutes();
if(minutes < 10){
    minutes = `0${minutes}`;
}
let hours = dayOfWeek.getHours();
if(hours <10){
    hours = `0${hours}`;
}
let changeInformation = document.querySelector("#date-time");
changeInformation.innerHTML = `${day}, ${hours}:${minutes}`;

function displayForecast(response){
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
    days.forEach(function(day) {
        forecastHTML =  forecastHTML + 
        `
        <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img 
            src="http://openweathermap.org/img/wn/50d@2x.png" 
            alt=""
            width="45px"
            />
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> 25° </span>
                <span class="weather-forecast-temperature-min"> 4° </span>
            </div>
        </div>
        `;
    })   

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function showWeather(response){
    celsiusTemp = response.data.main.temp;

    let temperature = Math.round(celsiusTemp);
    let description = (response.data.weather[0].description);
    let windSpeed = Math.round(response.data.wind.speed);
    let humidity = response.data.main.humidity;
    
    let windSpeedElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let descroptionElement = document.querySelector("h5");
    let temperatureElement = document.querySelector("#today");
    let iconElement = document.querySelector("#icon");
    
    temperatureElement.innerHTML = `${temperature}`;
    descroptionElement.innerHTML = `${description}`;
    windSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    document.querySelector("#city-name").innerHTML = response.data.name;

    getForecast(response.data.coord);
}

function searchCity(cityName){
    let apiKey = "e7dbb1a7cbf271831b301595cd51d95b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function ourSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#search-text");
    let cityName = cityInput.value;
   
    searchCity(cityName);   
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", ourSubmit);

searchCity("Kharkiv");

function myPosition(position) {
    let apiKey = "e7dbb1a7cbf271831b301595cd51d95b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(showWeather);
}

function currentPosition(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(myPosition);
}

let currentButton = document.querySelector("#button-current");
currentButton.addEventListener("click", currentPosition);

function showFahrenheitTemp(event){
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    let ourTemp = document.querySelector(".ourTemp");
    ourTemp.innerHTML = Math.round(fahrenheitTemp); 
}

function showCelsiusTemp(event){
    event.preventDefault();
    let ourTemp = document.querySelector(".ourTemp");
    ourTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

