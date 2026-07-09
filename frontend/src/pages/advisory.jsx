import { CloudSun, Droplets, Wind, Calendar, Sprout, AlertTriangle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useWeather } from "../api/weather";
import { getWeatherIcon } from "../components/WeatherIcon";
import AdvisorySkeleton from "../components/AdvisorySkeleton";

const plantingWindows = [
  { crop: "Okra", status: "Good time to plant", window: "Now – 2 weeks" },
  { crop: "Waterleaf", status: "Good time to plant", window: "Now – 3 weeks" },
  { crop: "Maize", status: "Wait — too wet", window: "In 4 weeks" },
];

const seasonalTips = [
  { title: "Hold off on fertilizing maize", detail: "Heavy rain expected this week may wash nutrients away before uptake." },
  { title: "Watch for fall armyworm", detail: "Humid conditions this season increase pest risk on young maize." },
];

const Advisory = () => {
  const { weatherData, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather("Port harcourt", "metric");
    console.log("Weather data fetched:", weatherData);
  }, [fetchWeather]);

    const cityName = weatherData?.city?.name;
  const currentTemp = weatherData?.list?.[0]?.main?.temp;
  const description = weatherData?.list?.[0]?.weather?.[0]?.description;
  const humidity = weatherData?.list?.[0]?.main?.humidity;
  const windSpeed = weatherData?.list?.[0]?.wind?.speed;
  const rainChance = weatherData?.list?.[0]?.pop; // Probability of precipitation
  const iconCode = weatherData?.list?.[0]?.weather?.[0]?.icon;
  const WeatherIconComponent = getWeatherIcon(iconCode);


  if (loading) return <AdvisorySkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Page header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Advisory</h1>
            <p className="text-gray-500 text-sm mt-1">Weather-based tips and planting guidance for your area.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weather card */}
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
                  <CloudSun size={14} className="mx-auto text-amber-400 mb-1" />
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

            {/* Planting calendar */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-green-600" />
                <h2 className="font-medium text-gray-900">Planting Windows</h2>
              </div>
              <div className="space-y-3">
                {plantingWindows.map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <Sprout size={14} className="text-green-600" />
                      <span className="text-gray-900">{p.crop}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-700">{p.status}</p>
                      <p className="text-xs text-gray-400">{p.window}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seasonal tips */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-medium text-gray-900 mb-4">Tips for This Season</h2>
            <div className="space-y-3">
              {seasonalTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle size={14} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tip.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{tip.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Advisory;
