
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

function formateDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response){
    let forecast = (response.data.daily);
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function(forecastDay, index) {
        if (index < 6){

            forecastHTML =  forecastHTML + 
            `
            <div class="col-2">
                <div class="weather-forecast-date">${formateDay(forecastDay.dt)}</div>
                <img 
                src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                alt=""
                width="45px"
                />
                <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                    <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
                </div>
            </div>
            `;
        }
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



