# 🌤️ Atmos - Weather Reporter Web App

A modern and responsive weather web application that displays the current weather in **Colombo, Sri Lanka**, with support for city search and 5-day forecast.**.

🔗 **Live Demo:** [https://atmos-nine-eta.vercel.app/](https://atmos-nine-eta.vercel.app/)

---

## 🚀 Features

### ✅ Core Functionality
- 🌡️ Displays **current temperature**
- 💧 Shows **humidity**
- 🌬️ Displays **wind speed**
- 🔆 UV **Index information**

### 🧠 Additional Features (Extra Credit)
- 🔎 **City search** input with real-time weather updates
- 📅 **5-day weather forecast**
- 🌇 Shows **sunrise**, **sunset**, **moonrise**, and **moonset**
- 🌙 Includes **moon illumination percentage**
- 🎨 Modern **glassmorphic UI** with Material Symbols
- 📱 Fully **responsive design** (mobile/tablet/desktop)
- ⚠️ Custom **toast notifications** for error handling (e.g., city not found)
- 🌀 **Loading animations** and hover effects for enhanced UX

---

## 🛠️ Tech Stack

| Tech/Tool        | Usage                                  |
|------------------|-----------------------------------------|
| **HTML5**        | Page structure                          |
| **CSS3**         | Styling with custom animations and responsive design |
| **JavaScript (Vanilla)** | Application logic and API integration |
| **WeatherAPI.com** | Weather data source (`current.json` & `forecast.json`) |
| **Vercel**       | Deployment platform                     |
| **Google Fonts & Material Symbols** | Custom fonts and icons |
| **Vite**         | Frontend build tool (for local dev, env vars, bundling) |

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/atmos-weather-app.git
cd atmos-weather-app
````

### 2. Install dependencies (if using Vite or similar)

```bash
npm install
```
### 3. Get Weather API Key

* Sign up at [https://www.weatherapi.com](https://www.weatherapi.com)
* Generate a **free API key**

### 4. Create `.env` file

Create a `.env` file in the root directory and add the following line:

```env
VITE_API_KEY=your_api_key_here
```

### 5. Run the app locally

```bash
npm run dev
```

By default, the app will be available at:

```
http://localhost:5173
```

