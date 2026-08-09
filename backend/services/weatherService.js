const axios = require("axios");
require("dotenv").config();

const getWeather = async (location) => {
  if (!location) {
    throw new Error("Location is required");
  }

  const response = await axios.get(process.env.WEATHER_API_URL, {
    params: {
      q: location,
      appid: process.env.WEATHER_API_KEY,
      units: "metric",
    },
  });

  return response.data;
};

module.exports = { getWeather };
