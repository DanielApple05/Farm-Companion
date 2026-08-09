import { Calendar, Sprout, AlertTriangle } from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { useWeather } from "../api/weather";
import AdvisorySkeleton from "../components/advisorySkeleton";
import WeatherCard from "../components/weatherCard";

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
    console.log(weatherData);
  }, [fetchWeather]);

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
            <WeatherCard weatherData={weatherData} />

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
