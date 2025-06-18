const apiKey = import.meta.env.VITE_API_KEY;
const input = document.getElementById("city-input");
const suggestionBox = document.getElementById("suggestions"); 

document.addEventListener("DOMContentLoaded", () => {
  getWeather("Colombo");

  document.querySelector(".search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) getWeather(city);
  });
});

input.addEventListener("input", async () => {
  const query = input.value.trim();
  if (query.length === 0) {
    suggestionBox.innerHTML = "";
    return;
  }

  try {
    const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`);
    const suggestions = await res.json();

    suggestionBox.innerHTML = ""; // Clear previous results
    suggestions.forEach((place) => {
      const li = document.createElement("li");
      li.textContent = `${place.name}, ${place.country}`;
      li.addEventListener("click", () => {
        input.value = place.name;
        suggestionBox.innerHTML = "";
        getWeather(place.name);
      });
      suggestionBox.appendChild(li);
    });
  } catch (err) {
    console.error("Autocomplete error:", err);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) getWeather(city);
  });
});

async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=6&aqi=no&alerts=no`
    );
    const data = await res.json();

    // Update location name
    document.querySelector(".location h4").textContent = data.location.name;

    // Update date
    const dateObj = new Date(data.location.localtime);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long"
    });
    document.querySelector(".current-date-txt").textContent = formattedDate;

    // Update weather icon
    document.querySelector(".weather-icon").src = `https:${data.current.condition.icon}`;

    // Update temperature
    document.querySelector(".temperature").textContent = `${data.current.temp_c}°C`;

    // Update weather description
    document.querySelector(".weather-desc").innerHTML = `
      <span class="material-symbols-outlined">wb_sunny</span> ${data.current.condition.text}
    `;

    // Update right side info items 
    const infoItems = document.querySelectorAll(".weather-right .info-item");
    const astro = data.forecast.forecastday[0].astro;
    const current = data.current;

    const values = [
      { icon: "humidity_percentage", text: `Humidity: ${current.humidity}%` },
      { icon: "air", text: `Wind: ${current.wind_kph} km/h` },
      { icon: "wb_iridescent", text: `UV Index: ${getUvCategory(current.uv)}` },
      { icon: "wb_twilight", text: `Sun rise: ${astro.sunrise}` },
      { icon: "water_lux", text: `Sun set: ${astro.sunset}` },
      { icon: "nights_stay", text: `Moon rise: ${astro.moonrise}` },
      { icon: "bedtime", text: `Moon set: ${astro.moonset}` },
      { icon: "brightness_2", text: `illumination: ${astro.moon_illumination}%` },
    ];

    infoItems.forEach((item, i) => {
      item.innerHTML = `
        <span class="material-symbols-outlined">${values[i].icon}</span>
        <p>${values[i].text}</p>
      `;
    });

    // Update forecast section
    const forecastElements = document.querySelectorAll(".forecast-item");
    const forecastData = data.forecast.forecastday;

    forecastElements.forEach((el, i) => {
      const dayEl = el.querySelector(".day");
      const imgEl = el.querySelector("img");
      const tempEl = el.querySelector(".temp");

      if (forecastData[i + 1]) { 
        const forecast = forecastData[i + 1];
        const dayName = new Date(forecast.date).toLocaleDateString("en-US", {
          weekday: "short"
        });

        dayEl.textContent = dayName;
        imgEl.src = `https:${forecast.day.condition.icon}`;
        tempEl.textContent = `${forecast.day.avgtemp_c}°C`;
      }
    });
  } catch (err) {
    showToast("City not found.");
  }
}

//Error message
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  toast.classList.remove("hide");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 3000);
}


function getUvCategory(uv) {
  if (uv <= 2) return "Low";
  else if (uv <= 5) return "Moderate";
  else if (uv <= 7) return "High";
  else return "Very High";
}
