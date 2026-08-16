
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Leaf,
  AlertTriangle,
  Loader2,
  Bug,
  CloudRain,
  Sprout,
  CheckCircle2,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import MobileNav from "../components/mobileNav";
import Header from "../components/header";
import { getCropById, deleteCrop, harvestCrop } from "../api/crops";
import DeleteButton from "../components/deleteButton";
import HarvestModal from "../components/harvestModal";

const statusStyles = {
  Healthy: "bg-green-50 text-green-700 border border-green-100",
  Flagged: "bg-amber-50 text-amber-700 border border-amber-100",
};

const stageOrder = [
  "Seedling",
  "Vegetative",
  "Flowering",
  "Maturing",
  "Harvested",
];

const CropDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cropData, setCropData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showHarvestModal, setShowHarvestModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCrop(id);

      navigate(
        cropData?.crop?.farm?._id
          ? `/farms/${cropData.crop.farm._id}`
          : "/crops"
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to delete crop"
      );
    }
  };

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        setLoading(true);
        setMessage("");

        const response = await getCropById(id);

        setCropData(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load crop"
        );

        setCropData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCrop();
  }, [id]);

  const handleHarvest = async (harvestData) => {
    try {
      const response = await harvestCrop(id, harvestData);

      setCropData((prev) => ({
        ...prev,
        crop: response.data.crop,
        growth: response.data.growth || prev.growth,
      }));

      setShowHarvestModal(false);
      setMessage("");
    } catch (error) {
      console.error("Failed to harvest crop:", error);

      setMessage(
        error.response?.data?.message ||
        "Failed to harvest crop"
      );
    }
  };

  if (loading) {
    return (
      <>
        <Header />

        <div className="flex min-h-screen">
          <Sidebar />

          <main className="w-full px-4 sm:px-6 py-6 mt-20 bg-gray-50 flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader2
                size={16}
                className="animate-spin"
              />
              Loading crop...
            </div>
          </main>
        </div>
      </>
    );
  }

  if (!cropData) {
    return (
      <>
        <Header />

        <div className="flex min-h-screen">
          <Sidebar />

          <main className="w-full px-4 sm:px-6 py-6 mt-20 bg-gray-50">
            <div className="max-w-2xl mx-auto">
              {message ? (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                  {message}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  No crop data found.
                </div>
              )}
            </div>
          </main>
        </div>
      </>
    );
  }

  const crop = cropData.crop;
  const growth = cropData.growth;

  const cropTips = cropData.cropTips || [];
  const weatherTips = cropData.weatherTips || [];

  const stageIndex = stageOrder.indexOf(growth?.stage);

  const diagnosisLogs = [
    ...(crop.diagnosisLogs || []),
  ].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  const isHarvestReady =
    growth?.stage === "Harvested" &&
    !crop.harvestedOn;

  const isHarvested = Boolean(crop.harvestedOn);

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />

        <main className="w-full min-w-0 bg-gray-50 px-4 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6 xl:mt-20 mt-28 mb-20 xl:mb-0">

          {/* Page top */}
          <div className="flex items-center justify-between gap-3">
            <Link
              to={
                crop.farm?._id
                  ? `/farms/${crop.farm._id}`
                  : "/crops"
              }
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors min-w-0"
            >
              <ArrowLeft
                size={15}
                className="shrink-0"
              />

              <span className="truncate max-w-[220px] sm:max-w-none">
                {crop.farm?.name
                  ? `Back to ${crop.farm.name}`
                  : "Back to crops"}
              </span>
            </Link>

            <DeleteButton
              onDelete={handleDelete}
              label="Delete Crop"
            />
          </div>

          {/* Error / success message */}
          {message && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {message}
            </div>
          )}

          {/* Crop Header */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

            <div className="flex items-start justify-between gap-3">

              {/* Identity */}
              <div className=" grid items-start gap-3 min-w-0">

                <div className="w-24 h-11 sm:h-12 p-1 rounded-xl bg-green-50 flex items-center justify-between shrink-0">
                  <Leaf
                    size={20}
                    className="text-green-600"
                  />
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 capitalize">
                    {crop.name}
                  </h1>
                </div>

                <div className="min-w-0">

                  <div className="flex items-center gap-2 flex-wrap">
                    {crop.status === "Flagged" && (
                      <AlertTriangle
                        size={16}
                        className="text-amber-500 shrink-0"
                      />
                    )}
                  </div>

                  <div className="flex items-start gap-1.5 mt-1.5 text-sm text-gray-500">
                    <MapPin
                      size={13}
                      className="mt-0.5 shrink-0"
                    />

                    <span className="break-words">
                      {crop.farm?.name || "Unknown farm"}

                      {crop.farm?.location &&
                        ` · ${crop.farm.location}`}
                    </span>
                  </div>

                </div>
              </div>

              {/* Status */}
              <span
                className={`shrink-0 text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[crop.status] ||
                  "bg-gray-50 text-gray-600 border border-gray-100"
                  }`}
              >
                {crop.status}
              </span>

            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-gray-100">

              {/* Planted */}
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  Planted
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Calendar
                    size={14}
                    className="text-gray-400"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {new Date(
                      crop.plantedOn
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Harvest */}
              {isHarvested ? (
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-[11px] uppercase tracking-wide text-green-600">
                    Harvest
                  </p>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                    <span className="text-sm font-medium text-green-700">
                      {crop.yield?.amount}{" "}
                      {crop.yield?.unit}
                    </span>

                    <span className="text-xs text-green-600">
                      ·{" "}
                      {new Date(
                        crop.harvestedOn
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">
                    Current Stage
                  </p>

                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {growth?.stage || "Not specified"}
                  </p>
                </div>
              )}

            </div>

          </section>

          {/* Harvest Modal */}
          {showHarvestModal && (
            <HarvestModal
              crop={crop}
              onClose={() =>
                setShowHarvestModal(false)
              }
              onHarvest={handleHarvest}
            />
          )}

          {/* Growth Stage */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <h2 className="font-medium text-gray-900">
                  Growth Stage
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Track your crop's progress.
                </p>
              </div>

              <span className="shrink-0 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                {growth?.percentComplete || 0}%
              </span>
            </div>

            {/* Stage tracker */}
            <div className="overflow-x-auto -mx-1 px-1 pb-2 scrollbar-thin">
              <div className="min-w-[520px] flex items-start">

                {stageOrder.map((stage, i) => (
                  <div
                    key={stage}
                    className="flex items-start flex-1 last:flex-none"
                  >

                    <div className="flex flex-col items-center min-w-[72px]">

                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-colors ${i <= stageIndex
                          ? "bg-green-600 border-green-600"
                          : "bg-white border-gray-200"
                          }`}
                      />

                      <span
                        className={`text-[11px] mt-2 whitespace-nowrap ${i === stageIndex
                          ? "text-gray-900 font-medium"
                          : "text-gray-400"
                          }`}
                      >
                        {stage}
                      </span>

                    </div>

                    {i <
                      stageOrder.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 mt-[7px] ${i < stageIndex
                            ? "bg-green-600"
                            : "bg-gray-200"
                            }`}
                        />
                      )}

                  </div>
                ))}

              </div>
            </div>

            {/* Growth information */}
            <div className="mt-5 pt-4 border-t border-gray-100">

              <div className="flex gap-3 justify-between">

                <div>
                  <p className="text-xs text-gray-400">
                    Days elapsed
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {growth?.daysElapsed || 0} days
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Progress
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {growth?.percentComplete || 0}%
                  </p>
                </div>

              </div>

              {/* Status / Harvest action */}
              <div className="mt-4">

                {isHarvested ? (
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-xl px-3.5 py-3 text-sm">
                    <CheckCircle2
                      size={17}
                      className="shrink-0"
                    />

                    <div>
                      <p className="font-medium">
                        Crop harvested
                      </p>

                      <p className="text-xs text-green-600 mt-0.5">
                        This crop has been added to your harvest records.
                      </p>
                    </div>
                  </div>
                ) : isHarvestReady ? (
                  <button
                    type="button"
                    onClick={() =>
                      setShowHarvestModal(true)
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Sprout size={16} />
                    Harvest Crop
                  </button>
                ) : growth?.isOverdue ? (
                  <div className="flex items-center gap-2 text-xs text-red-500 font-medium">
                    <AlertTriangle size={14} />
                    Crop is overdue
                  </div>
                ) : null}

              </div>

            </div>
          </section>

          {/* Crop Tips */}
          {cropTips.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

              <div className="flex items-center justify-between gap-3 mb-4">

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <Leaf
                      size={15}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-medium text-gray-900">
                      Crop Tips
                    </h2>

                    <p className="text-[11px] text-gray-400">
                      Advice for this crop
                    </p>
                  </div>
                </div>

                <span className="text-xs text-gray-400 shrink-0">
                  {cropTips.length}{" "}
                  {cropTips.length === 1
                    ? "tip"
                    : "tips"}
                </span>

              </div>

              <div className="space-y-3">

                {cropTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="bg-green-50/70 border border-green-100 rounded-xl p-3.5"
                  >
                    <div className="flex items-start justify-between gap-3">

                      <h3 className="text-sm font-medium text-gray-900">
                        {tip.title}
                      </h3>

                      {tip.severity && (
                        <span className="shrink-0 text-[10px] font-medium text-green-700 capitalize">
                          {tip.severity}
                        </span>
                      )}

                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mt-1.5">
                      {tip.body}
                    </p>
                  </div>
                ))}

              </div>
            </section>
          )}

          {/* Weather Tips */}
          {weatherTips.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

              <div className="flex items-center justify-between gap-3 mb-4">

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <CloudRain
                      size={15}
                      className="text-blue-500"
                    />
                  </div>

                  <div>
                    <h2 className="font-medium text-gray-900">
                      Weather Tips
                    </h2>

                    <p className="text-[11px] text-gray-400">
                      Based on current conditions
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-gray-400">
                  Weather-based
                </span>

              </div>

              <div className="space-y-3">

                {weatherTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <h3 className="text-sm font-medium text-gray-900">
                        {tip.title}
                      </h3>

                      {tip.severity && (
                        <span className="shrink-0 text-[10px] font-medium text-blue-700 capitalize">
                          {tip.severity}
                        </span>
                      )}

                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mt-1.5">
                      {tip.body}
                    </p>

                  </div>
                ))}

              </div>
            </section>
          )}

          {/* No tips */}
          {cropTips.length === 0 &&
            weatherTips.length === 0 && (
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    <Leaf
                      size={16}
                      className="text-gray-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">
                      No tips available right now.
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      Relevant advice will appear as your crop develops.
                    </p>
                  </div>

                </div>
              </section>
            )}

          {/* Diagnosis History */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

            <div className="flex items-center justify-between gap-3 mb-4">

              <div>
                <h2 className="font-medium text-gray-900">
                  Diagnosis History
                </h2>

                <p className="text-[11px] text-gray-400 mt-1">
                  Previous crop health checks
                </p>
              </div>

              {diagnosisLogs.length > 0 && (
                <span className="shrink-0 text-xs text-gray-400">
                  {diagnosisLogs.length}{" "}
                  {diagnosisLogs.length === 1
                    ? "record"
                    : "records"}
                </span>
              )}

            </div>

            {diagnosisLogs.length === 0 ? (
              <div className="py-6 text-center">

                <div className="w-10 h-10 mx-auto rounded-full bg-gray-50 flex items-center justify-center">
                  <Bug
                    size={19}
                    className="text-gray-300"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  No diagnoses yet for this crop.
                </p>

              </div>
            ) : (
              <div className="space-y-3">

                {diagnosisLogs.map((log) => (
                  <div
                    key={log._id}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 sm:p-4"
                  >

                    <div className="flex items-start gap-3">

                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                        <Bug
                          size={14}
                          className="text-amber-600"
                        />
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 break-words">
                              {log.disease}
                            </p>

                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(
                                log.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <span className="shrink-0 text-[10px] sm:text-[11px] bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                            {log.confidence}% match
                          </span>

                        </div>

                        {log.explanation && (
                          <p className="text-xs text-gray-600 leading-relaxed mt-3">
                            {log.explanation}
                          </p>
                        )}

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

export default CropDetail;