let cityName = document.querySelector(".city_name");
let cityDateTime = document.querySelector(".city_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_min = document.querySelector(".temperature_min");
let w_max = document.querySelector(".temperature_max");
let w_feelsLike = document.querySelector(".feels-like-value");
let w_wind = document.querySelector(".wind-value");
let w_humidity = document.querySelector(".humidity-value");
let w_pressure = document.querySelector(".pressure-value");
let w_sunset = document.querySelector(".sun-rise-value");
let w_sunrise = document.querySelector(".sun-set-value");
let citySearch = document.querySelector(".citySearch");
let btn = document.querySelector(".btnSearch");
let container = document.querySelector(".container");

let city = "lahore";

const getCurrentCityTime = (timezone) => {
  const now = new Date(); // your current local time
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // convert your time to UTC
  const cityTime = new Date(utc + timezone * 1000); // apply the city's timezone offset
  return cityTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getSunTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  console.log(curDate);
  // // const date = new Date();
  const options = {
    //   weekday: "long",
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("ban", options);
  // // console.log(formatter);
  const formattedDate = formatter.format(curDate);
  // console.log(formattedDate);

  return formattedDate;
};

const getWeatherData = async () => {
  const webApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=df7e138f3bc9140aa6253f1343bfa4f3`;
  try {
    let res = await fetch(webApi);
    let data = await res.json();
    console.log(data);

    const { main, name, sys, weather, wind, dt } = data;

    cityName.innerHTML = `${name} ,${sys.country}`;
    cityDateTime.innerHTML = getCurrentCityTime(data.timezone);

    w_temperature.innerHTML = `${Math.round(main.temp - 273.15)}°C`;
    w_min.textContent = `min: ${Math.round(main.temp_min - 273.15)}°C`;
    w_max.textContent = `max: ${Math.round(main.temp_max - 273.15)}°C`;
    w_humidity.textContent = `${Math.round(main.humidity)}%`;
    w_wind.textContent = `${Math.round(wind.speed)} km/h`;
    w_pressure.textContent = `${Math.round(main.pressure)}Pa`;
    w_feelsLike.textContent = `${Math.round(main.feels_like - 273.15)}°C`;
    w_sunrise.textContent = getSunTime(sys.sunset);
    w_sunset.textContent = getSunTime(sys.sunrise);

    w_forecast.textContent = `${weather[0].main}`;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
  } catch (error) {
    console.log(error);
    container.innerHTML = `
          <header class="search">
        <form class="search_space">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Enter City Name"
            spellcheck="true"
            class="citySearch"
            autofocus
          />
        </form>
        <button class="btnSearch">Search</button>
      </header>
    <h1>CITY NOT FOUND\t\tOR\t\tINVALID API</h1>`;
  }
};

window.addEventListener("load", getWeatherData);
btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target);

  console.log(citySearch.value);
  city = citySearch.value;
  getWeatherData();
  citySearch.value = "";
});
document.querySelector(".search_space").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(citySearch.value);
  city = citySearch.value;
  getWeatherData();
  citySearch.value = "";
});
