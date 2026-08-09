const getWeatherCondition = (weatherData) => {
  const forecast = weatherData?.list?.[0];

  if (!forecast) {
    return null;
  }

  const weatherMain = forecast.weather?.[0]?.main;
  const rainChance = forecast.pop ?? 0;

  if (weatherMain === "Rain" || rainChance >= 0.6) {
    return "rainExpected";
  }

  return null;
};

module.exports = { getWeatherCondition };