const apiKey = ;  
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const locationButton = document.getElementById("location-btn");
const weatherDisplay = document.getElementById("weather-display");
const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const recentSearches = document.getElementById("recent-list");
const errorMessage = document.getElementById("error-message");

let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];


async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayWeather(data);
    saveRecentSearch(city);
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

// Display Weather Data
function displayWeather(data) {
  cityName.textContent = data.name;
  weatherDescription.textContent = data.weather[0].description;
  temperature.textContent = data.main.temp;
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;
  weatherDisplay.style.display = "block";
  errorMessage.textContent = "";
}

// Use Geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      displayWeather(data);
      saveRecentSearch(data.name);
    });
  } else {
    errorMessage.textContent = "Geolocation is not supported by this browser.";
  }
}


function saveRecentSearch(city) {
  if (!recentCities.includes(city)) {
    recentCities.push(city);
    if (recentCities.length > 5) recentCities.shift();
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
    renderRecentSearches();
  }
}

function renderRecentSearches() {
  recentSearches.innerHTML = "";
  recentCities.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => fetchWeather(city));
    recentSearches.appendChild(li);
  });
}

// Event Listeners
searchButton.addEventListener("click", () => fetchWeather(cityInput.value));
locationButton.addEventListener("click", getLocation);
window.addEventListener("load", renderRecentSearches);
