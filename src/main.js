const input = document.getElementById("city-input");

document.addEventListener("DOMContentLoaded", () => {
  getWeather("Colombo");

  document.querySelector(".search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) getWeather(city);
  });
});

function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

async function getWeather(city) {
  try {
    showLoader(); // Show spinner

    const res = await fetch(`/api/forecast?city=${city}`);
    const data = await res.json();

    document.querySelector(
      ".location h5"
    ).textContent = `${data.location.name}, ${data.location.country}`;

    const dateObj = new Date(data.location.localtime);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    document.querySelector(
      ".current-date-txt"
    ).textContent = `${formattedDate} - ${formattedTime}`;

    document.querySelector(
      ".weather-icon"
    ).src = `https:${data.current.condition.icon}`;

    document.querySelector(
      ".temperature"
    ).textContent = `${data.current.temp_c}°C`;

    document.querySelector(".weather-desc").innerHTML = `
      <span class="material-symbols-outlined">wb_sunny</span> ${data.current.condition.text}
    `;

    const infoItems = document.querySelectorAll(".weather-right .info-item");
    const astro = data.forecast.forecastday[0].astro;
    const current = data.current;

    const values = [
      { icon: "humidity_percentage", text: `Humidity: ${current.humidity}%` },
      { icon: "air", text: `Wind: ${current.wind_kph} km/h` },
      { icon: "wb_iridescent", text: `UV Index: ${getUvCategory(current.uv)}` },
      { icon: "wb_twilight", text: `Sun rise: ${astro.sunrise}` },
      { icon: "dew_point", text: `Dew point: ${current.dewpoint_c} °C` },
      { icon: "explore", text: `Wind direction: ${current.wind_degree}°` },
      { icon: "visibility", text: `Visibility: ${current.vis_km} km` },
      { icon: "tire_repair", text: `Pressure: ${current.pressure_mb} mb` },
    ];

    infoItems.forEach((item, i) => {
      item.innerHTML = `
        <span class="material-symbols-outlined">${values[i].icon}</span>
        <p>${values[i].text}</p>
      `;
    });

    const forecastElements = document.querySelectorAll(".forecast-item");
    const forecastData = data.forecast.forecastday;

    forecastElements.forEach((el, i) => {
      const dayEl = el.querySelector(".day");
      const imgEl = el.querySelector("img");
      const tempEl = el.querySelector(".temp");

      if (forecastData[i + 1]) {
        const forecast = forecastData[i + 1];
        const dayName = new Date(forecast.date).toLocaleDateString("en-US", {
          weekday: "short",
        });

        dayEl.textContent = dayName;
        imgEl.src = `https:${forecast.day.condition.icon}`;
        tempEl.textContent = `${forecast.day.avgtemp_c}°C`;
      }
    });
  } catch (err) {
    showToast("City not found.");
  } finally {
    hideLoader(); // Always hide loader
  }
}

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
