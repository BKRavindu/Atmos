import axios from "axios";

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Missing query parameter city" });
  }

  try {
    const response = await axios.get(
      "https://api.weatherapi.com/v1/forecast.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
          days: 6,
          aqi: "no",
          alerts: "no",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    const message =
      error.response?.data?.error?.message || "Forecast failed";
    res.status(error.response?.status || 500).json({ error: message });
  }
}
