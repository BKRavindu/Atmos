import axios from "axios";

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter q" });
  }

  try {
    const response = await axios.get(
      "https://api.weatherapi.com/v1/search.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    const message =
      error.response?.data?.error?.message || "Search failed";
    res.status(error.response?.status || 500).json({ error: message });
  }
}
