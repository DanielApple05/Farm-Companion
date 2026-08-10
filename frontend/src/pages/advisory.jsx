import {
  Sprout,
  PawPrint,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { useWeather } from "../api/weather";
import {
  getCrops,
  getCropById,
} from "../api/crops";
import {
  getLivestock,
  getLivestockById,
} from "../api/livestock";
import AdvisorySkeleton from "../components/advisorySkeleton";
import WeatherCard from "../components/weatherCard";

const Advisory = () => {
  const {
    weatherData,
    loading: weatherLoading,
    error: weatherError,
    fetchWeather,
  } = useWeather();

  const [cropWarnings, setCropWarnings] = useState([]);
  const [livestockWarnings, setLivestockWarnings] = useState([]);
  const [tipsLoading, setTipsLoading] = useState(true);

  useEffect(() => {
    fetchWeather("Port Harcourt", "metric");
  }, [fetchWeather]);

  useEffect(() => {
    const fetchAdvisories = async () => {
      try {
        setTipsLoading(true);

        /*
         * -------------------------
         * CROP WARNINGS
         * -------------------------
         */

        const cropsResponse = await getCrops();
        const crops = cropsResponse.data || [];

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
              id: data.crop?._id,
              crop: data.crop,
              growth: data.growth,
              tips: warningTips,
            };
          })
          .filter(Boolean)
          .slice(0, 3);

        setCropWarnings(warnings);

        /*
         * -------------------------
         * LIVESTOCK WARNINGS
         * -------------------------
         */

        const livestockResponse = await getLivestock();
        const livestock = livestockResponse.data || [];

        const livestockDetails = await Promise.all(
          livestock.map((animal) =>
            getLivestockById(animal._id)
          )
        );

        const animalWarnings = livestockDetails
          .map((response) => {
            const payload = response.data || {};
            const livestockPayload = payload.livestock || payload;

            const tipsPayload = payload.livestockTips || {};
            const allTips = Array.isArray(tipsPayload.livestockTips)
              ? tipsPayload.livestockTips
              : Array.isArray(tipsPayload)
                ? tipsPayload
                : [];

            if (allTips.length === 0) {
              return null;
            }

            return {
              id: livestockPayload?._id,
              livestock: livestockPayload,
              tips: allTips,
            };
          })
          .filter(Boolean)
          .slice(0, 3);

        setLivestockWarnings(animalWarnings);

      } catch (error) {
        console.error(
          "Failed to load advisories:",
          error
        );

        setCropWarnings([]);
        setLivestockWarnings([]);
      } finally {
        setTipsLoading(false);
      }
    };

    fetchAdvisories();
  }, []);

  if (weatherLoading || tipsLoading) {
    return <AdvisorySkeleton />;
  }

  if (weatherError) {
    return (
      <>
        <Header />

        <div className="flex min-h-screen">
          <Sidebar />

          <div className="w-full p-6 mt-20 bg-gray-50">
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
              Failed to load weather information.
            </div>
          </div>
        </div>
      </>
    );
  }

  const totalWarnings =
    cropWarnings.length + livestockWarnings.length;

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Advisory
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Farm conditions, weather insights and important alerts.
            </p>
          </div>

          {/* Weather */}
          <WeatherCard weatherData={weatherData} />

          {/* Advisory summary */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-gray-900">
                  Farm Overview
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Based on your current crops and livestock.
                </p>
              </div>

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${totalWarnings > 0
                  ? "bg-amber-50"
                  : "bg-green-50"
                  }`}
              >
                {totalWarnings > 0 ? (
                  <AlertTriangle
                    size={18}
                    className="text-amber-600"
                  />
                ) : (
                  <CheckCircle2
                    size={18}
                    className="text-green-600"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Sprout
                    size={15}
                    className="text-green-600"
                  />

                  <span className="text-xs text-gray-500">
                    Crop alerts
                  </span>
                </div>

                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {cropWarnings.length}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <PawPrint
                    size={15}
                    className="text-amber-600"
                  />

                  <span className="text-xs text-gray-500">
                    Livestock alerts
                  </span>
                </div>

                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {livestockWarnings.length}
                </p>
              </div>

            </div>
          </div>

          {/* Crop warnings */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <div className="flex items-center gap-2 mb-4">
              <Sprout
                size={17}
                className="text-green-600"
              />

              <h2 className="font-medium text-gray-900">
                Crop Warnings
              </h2>
            </div>

            {cropWarnings.length === 0 ? (
              <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                <CheckCircle2
                  size={18}
                  className="text-green-600"
                />

                <div>
                  <p className="text-sm font-medium text-green-700">
                    No crop warnings
                  </p>

                  <p className="text-xs text-green-600 mt-0.5">
                    Your crops currently have no important warnings.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">

                {cropWarnings.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3"
                  >

                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <AlertTriangle
                        size={15}
                        className="text-amber-600"
                      />
                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex items-center justify-between gap-3">

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.crop?.name}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.growth?.stage}
                          </p>
                        </div>

                        <span className="text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700">
                          Warning
                        </span>

                      </div>

                      <div className="mt-2 space-y-2">

                        {item.tips.map((tip, index) => (
                          <div
                            key={tip.id || index}
                            className="bg-gray-50 rounded-lg p-3"
                          >
                            <p className="text-sm font-medium text-gray-800">
                              {tip.title}
                            </p>

                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                              {tip.body}
                            </p>
                          </div>
                        ))}

                      </div>

                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* Livestock warnings */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <div className="flex items-center gap-2 mb-4">
              <PawPrint
                size={17}
                className="text-amber-600"
              />

              <h2 className="font-medium text-gray-900">
                Livestock Warnings
              </h2>
            </div>

            {livestockWarnings.length === 0 ? (
              <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                <CheckCircle2
                  size={18}
                  className="text-green-600"
                />

                <div>
                  <p className="text-sm font-medium text-green-700">
                    No livestock warnings
                  </p>

                  <p className="text-xs text-green-600 mt-0.5">
                    Your livestock currently have no important warnings.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">

                {livestockWarnings.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3"
                  >

                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <AlertTriangle
                        size={15}
                        className="text-amber-600"
                      />
                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex items-center justify-between gap-3">

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.livestock?.type}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.livestock?.stage}
                            {item.livestock?.headcount
                              ? ` · ${item.livestock.headcount} heads`
                              : ""}
                          </p>
                        </div>

                        <span className="text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700">
                          Warning
                        </span>

                      </div>

                      <div className="mt-2 space-y-2">

                        {item.tips.map((tip, index) => {
                          const body = typeof tip === "string" ? tip : tip.body;
                          const title = typeof tip === "string" ? "Livestock advice" : tip.title;

                          return (
                            <div
                              key={tip?.id || index}
                              className="bg-gray-50 rounded-lg p-3"
                            >
                              <p className="text-sm font-medium text-gray-800">
                                {title}
                              </p>

                              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                {body}
                              </p>
                            </div>
                          );
                        })}

                      </div>

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

