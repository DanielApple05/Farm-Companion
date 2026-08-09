import React from 'react';
import { getWeatherIcon } from "./weatherIcon";
import { CloudSun, Droplets, Wind } from "lucide-react";

const weatherCard = ({ weatherData }) => {
  const cityName = weatherData?.city?.name;
  const currentTemp = weatherData?.list?.[0]?.main?.temp;
  const description = weatherData?.list?.[0]?.weather?.[0]?.description;
  const humidity = weatherData?.list?.[0]?.main?.humidity;
  const windSpeed = weatherData?.list?.[0]?.wind?.speed;
  const rainChance = weatherData?.list?.[0]?.pop; // Probability of precipitation
  const iconCode = weatherData?.list?.[0]?.weather?.[0]?.icon;
  const WeatherIconComponent = getWeatherIcon(iconCode);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{cityName}</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">{currentTemp ? `${Math.round(currentTemp)}°C` : "--"}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <WeatherIconComponent size={40} className="text-amber-400" />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-center">
        <div>
          <Droplets size={14} className="mx-auto text-blue-400 mb-1" />
          <p className="text-xs text-gray-500">Humidity</p>
          <p className="text-sm font-medium text-gray-900">{humidity}%</p>
        </div>
        <div>
          <WeatherIconComponent size={14} className="mx-auto text-amber-400 mb-1" />
          <p className="text-xs text-gray-500">Rain</p>
          <p className="text-sm font-medium text-gray-900">{rainChance}%</p>
        </div>
        <div>
          <Wind size={14} className="mx-auto text-gray-400 mb-1" />
          <p className="text-xs text-gray-500">Wind</p>
          <p className="text-sm font-medium text-gray-900">{windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}

export default weatherCard;
