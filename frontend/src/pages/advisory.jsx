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
import MobileNav from "../components/mobileNav";

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

        // -------------------------
        // CROP WARNINGS
        // -------------------------

        const cropsResponse = await getCrops();
        const crops = cropsResponse.data || [];

        const cropDetails = await Promise.all(
          crops.map((crop) => getCropById(crop._id))
        );

        const warnings = cropDetails
          .map((response) => {
            const data = response.data;

            const allTips = [
              ...(Array.isArray(data.cropTips) ? data.cropTips : []),
              ...(Array.isArray(data.weatherTips) ? data.weatherTips : []),
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

        // -------------------------
        // LIVESTOCK WARNINGS
        // -------------------------

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
            const livestockPayload =
              payload.livestock || payload;

            const tipsPayload =
              payload.livestockTips || {};

            const allTips = Array.isArray(
              tipsPayload.livestockTips
            )
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

          <main className="w-full mt-20 bg-gray-50 p-4 lg:p-6">
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
              Failed to load weather information.
            </div>
          </main>
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
        <MobileNav />
        <main
          className="
            w-full
            mt-26
            bg-gray-50
            p-4
            lg:p-6
            space-y-5
            lg:space-y-6
            pb-28
            lg:pb-6
            xl:mt-20
          "
        >
          {/* Page Header */}
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Advisory
            </h1>

            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Farm conditions, weather insights and important alerts.
            </p>
          </div>

          {/* Weather */}
          <section className="w-full">
            <WeatherCard weatherData={weatherData} />
          </section>

          {/* Farm Overview */}
          <section className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-medium text-gray-900">
                  Farm Overview
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Based on your current crops and livestock.
                </p>
              </div>

              <div
                className={`
                  shrink-0
                  w-9 h-9
                  sm:w-10 sm:h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  ${
                    totalWarnings > 0
                      ? "bg-amber-50"
                      : "bg-green-50"
                  }
                `}
              >
                {totalWarnings > 0 ? (
                  <AlertTriangle
                    size={17}
                    className="text-amber-600"
                  />
                ) : (
                  <CheckCircle2
                    size={17}
                    className="text-green-600"
                  />
                )}
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                    <Sprout
                      size={14}
                      className="text-green-600"
                    />
                  </div>

                  <span className="text-xs text-gray-500">
                    Crop alerts
                  </span>
                </div>

                <p className="text-lg sm:text-xl font-semibold text-gray-900 mt-2">
                  {cropWarnings.length}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                    <PawPrint
                      size={14}
                      className="text-amber-600"
                    />
                  </div>

                  <span className="text-xs text-gray-500">
                    Livestock alerts
                  </span>
                </div>

                <p className="text-lg sm:text-xl font-semibold text-gray-900 mt-2">
                  {livestockWarnings.length}
                </p>
              </div>
            </div>
          </section>

          {/* Crop Warnings */}
          <section className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Sprout
                  size={16}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="font-medium text-gray-900">
                  Crop Warnings
                </h2>

                <p className="text-xs text-gray-400">
                  Things that may need your attention.
                </p>
              </div>
            </div>

            {cropWarnings.length === 0 ? (
              <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                <CheckCircle2
                  size={18}
                  className="text-green-600 shrink-0 mt-0.5"
                />

                <div>
                  <p className="text-sm font-medium text-green-700">
                    No crop warnings
                  </p>

                  <p className="text-xs text-green-600 mt-1 leading-relaxed">
                    Your crops currently have no important warnings.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cropWarnings.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-100 overflow-hidden"
                  >
                    {/* Crop header */}
                    <div className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                          <AlertTriangle
                            size={15}
                            className="text-amber-600"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.crop?.name}
                              </p>

                              <p className="text-xs text-gray-400 mt-0.5">
                                {item.growth?.stage ||
                                  "Current growth stage"}
                              </p>
                            </div>

                            <span className="shrink-0 text-[10px] sm:text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700">
                              Warning
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="mt-3 space-y-2">
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
          </section>

          {/* Livestock Warnings */}
          <section className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <PawPrint
                  size={16}
                  className="text-amber-600"
                />
              </div>

              <div>
                <h2 className="font-medium text-gray-900">
                  Livestock Warnings
                </h2>

                <p className="text-xs text-gray-400">
                  Health and care information for your animals.
                </p>
              </div>
            </div>

            {livestockWarnings.length === 0 ? (
              <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                <CheckCircle2
                  size={18}
                  className="text-green-600 shrink-0 mt-0.5"
                />

                <div>
                  <p className="text-sm font-medium text-green-700">
                    No livestock warnings
                  </p>

                  <p className="text-xs text-green-600 mt-1 leading-relaxed">
                    Your livestock currently have no important warnings.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {livestockWarnings.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-3 sm:p-4">
                      {/* Livestock header */}
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                          <AlertTriangle
                            size={15}
                            className="text-amber-600"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.livestock?.type}
                              </p>

                              <p className="text-xs text-gray-400 mt-0.5">
                                {item.livestock?.stage ||
                                  "Current stage"}

                                {item.livestock?.headcount
                                  ? ` · ${item.livestock.headcount} heads`
                                  : ""}
                              </p>
                            </div>

                            <span className="shrink-0 text-[10px] sm:text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700">
                              Warning
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Advice */}
                      <div className="mt-3 space-y-2">
                        {item.tips.map((tip, index) => {
                          const body =
                            typeof tip === "string"
                              ? tip
                              : tip.body;

                          const title =
                            typeof tip === "string"
                              ? "Livestock advice"
                              : tip.title;

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
          </section>
        </main>
      </div>
    </>
  );
};

export default Advisory;

