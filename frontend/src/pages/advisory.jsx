import { Calendar, Sprout, AlertTriangle } from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { useWeather } from "../api/weather";
import { getCrops, getCropById } from "../api/crops";
import AdvisorySkeleton from "../components/advisorySkeleton";
import WeatherCard from "../components/weatherCard";

const plantingWindows = [
  { crop: "Okra", status: "Good time to plant", window: "Now – 2 weeks" },
  { crop: "Waterleaf", status: "Good time to plant", window: "Now – 3 weeks" },
  { crop: "Maize", status: "Wait — too wet", window: "In 4 weeks" },
];

const Advisory = () => {
  const { weatherData, loading: weatherLoading, error: weatherError, fetchWeather } =
    useWeather();

  const [cropWarnings, setCropWarnings] = useState([]);
  const [tipsLoading, setTipsLoading] = useState(true);

  useEffect(() => {
    fetchWeather("Port Harcourt", "metric");
  }, [fetchWeather]);

  useEffect(() => {
    const fetchCropWarnings = async () => {
      try {
        setTipsLoading(true);

        const cropsResponse = await getCrops();
        const crops = cropsResponse.data;

        const cropDetails = await Promise.all(
          crops.map((crop) => getCropById(crop._id))
        );

        const warnings = cropDetails
          .map((response) => {
            const data = response.data;

            const allTips = [
              ...(data.cropTips || []),
              ...(data.weatherTips || []),
            ];

            const warningTips = allTips.filter(
              (tip) => tip.severity === "warning"
            );

            if (warningTips.length === 0) {
              return null;
            }

            return {
              crop: data.crop,
              growth: data.growth,
              tips: warningTips,
            };
          })
          .filter(Boolean)
          .slice(0, 3);

        setCropWarnings(warnings);
      } catch (error) {
        console.error("Failed to load crop warnings:", error);
        setCropWarnings([]);
      } finally {
        setTipsLoading(false);
      }
    };

    fetchCropWarnings();
  }, []);

  if (weatherLoading || tipsLoading) {
    return <AdvisorySkeleton />;
  }

  if (weatherError) {
    return <div>Error: {weatherError}</div>;
  }

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">

          {/* Page header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Advisory
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Weather-based tips and planting guidance for your area.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Weather card */}
            <WeatherCard weatherData={weatherData} />

            {/* Planting calendar */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">

              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-green-600" />

                <h2 className="font-medium text-gray-900">
                  Planting Windows
                </h2>
              </div>

              <div className="space-y-3">
                {plantingWindows.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Sprout size={14} className="text-green-600" />

                      <span className="text-gray-900">
                        {p.crop}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-700">
                        {p.status}
                      </p>

                      <p className="text-xs text-gray-400">
                        {p.window}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Crop warnings */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <h2 className="font-medium text-gray-900 mb-4">
              Crop Warnings
            </h2>

            {cropWarnings.length === 0 ? (
              <p className="text-sm text-gray-400">
                No crop warnings at the moment.
              </p>
            ) : (
              <div className="space-y-4">

                {cropWarnings.map((item) => (
                  <div
                    key={item.crop._id}
                    className="flex items-start gap-3"
                  >

                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <AlertTriangle
                        size={14}
                        className="text-amber-600"
                      />
                    </div>

                    <div className="flex-1">

                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-gray-900">
                          {item.crop.name}
                        </p>

                        <span className="text-xs text-gray-400">
                          {item.growth.stage}
                        </span>
                      </div>

                      {item.tips.map((tip) => (
                        <div key={tip.id} className="mt-1">
                          <p className="text-sm text-gray-700">
                            {tip.title}
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            {tip.body}
                          </p>
                        </div>
                      ))}

                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Advisory;

