import { useState, useCallback } from "react";
import axios from "axios";

export const useWeather = () => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL;

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city, tempUnit = "metric") => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(weatherApiUrl, {
        params: {
          q: city,
          appid: API_KEY,
          units: tempUnit,
        },
      });

      setWeatherData(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  }, [API_KEY, weatherApiUrl]);

  return { weatherData, loading, error, fetchWeather };
};