import { CloudSun, Droplets, Wind, Calendar, Sprout, AlertTriangle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// ---- Dummy data (swap for real weather API + curated content later) ----
const weather = {
  location: "Port Harcourt, NG",
  temp: 28,
  condition: "Partly Cloudy",
  humidity: 82,
  rainChance: 30,
  wind: 12,
};

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
                  <p className="text-sm text-gray-500">{weather.location}</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-1">{weather.temp}°C</p>
                  <p className="text-sm text-gray-500">{weather.condition}</p>
                </div>
                <CloudSun size={40} className="text-amber-400" />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-center">
                <div>
                  <Droplets size={14} className="mx-auto text-blue-400 mb-1" />
                  <p className="text-xs text-gray-500">Humidity</p>
                  <p className="text-sm font-medium text-gray-900">{weather.humidity}%</p>
                </div>
                <div>
                  <CloudSun size={14} className="mx-auto text-amber-400 mb-1" />
                  <p className="text-xs text-gray-500">Rain</p>
                  <p className="text-sm font-medium text-gray-900">{weather.rainChance}%</p>
                </div>
                <div>
                  <Wind size={14} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">Wind</p>
                  <p className="text-sm font-medium text-gray-900">{weather.wind} km/h</p>
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
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
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
