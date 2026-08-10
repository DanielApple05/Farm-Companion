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
  Scale,
  CloudRain,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import MobileNav from "../components/mobileNav";
import Header from "../components/header";
import { getCropById, deleteCrop } from "../api/crops";
import DeleteButton from "../components/deleteButton";

const statusStyles = {
  Healthy: "bg-green-50 text-green-700",
  Flagged: "bg-amber-50 text-amber-700",
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
        const apiMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load crop";

        setMessage(apiMessage);
        setCropData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCrop();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />

        <div className="flex min-h-screen">
          <Sidebar />

          <main className="w-full px-4 sm:px-6 py-6 mt-20 bg-gray-50 flex items-center gap-2 text-gray-500">
            <Loader2 size={16} className="animate-spin" />
            Loading crop...
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
            {message ? (
              <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                {message}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                No crop data found.
              </div>
            )}
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

  const diagnosisLogs = [...(crop.diagnosisLogs || [])].sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <main className="w-full min-w-0 px-4 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6 xl:mt-20 mt-28 bg-gray-50">

          {/* Back */}
          <Link
            to={
              crop.farm?._id
                ? `/farms/${crop.farm._id}`
                : "/crops"
            }
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={14} />

            <span className="truncate max-w-[250px]">
              {crop.farm?.name
                ? `Back to ${crop.farm.name}`
                : "Back to crops"}
            </span>
          </Link>

          {/* Crop Header */}
          <section className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">

            <div className="flex flex-col gap-4">

              {/* Identity */}
              <div className="flex items-start justify-between gap-3">

                <div className="xl:flex grid items-start gap-3 min-w-0">

                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <Leaf
                      size={20}
                      className="text-green-600"
                    />
                  </div>

                  <div className="min-w-0">

                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-xl font-semibold text-gray-900">
                        {crop.name}
                      </h1>

                      {crop.status === "Flagged" && (
                        <AlertTriangle
                          size={16}
                          className="text-amber-500"
                        />
                      )}
                    </div>

                    <p className="text-sm text-gray-500 flex items-start gap-1 mt-1">
                      <MapPin
                        size={12}
                        className="mt-0.5 shrink-0"
                      />

                      <span className="truncate">
                        {crop.farm?.name}

                        {crop.farm?.location &&
                          ` · ${crop.farm.location}`}
                      </span>
                    </p>

                  </div>
                </div>

                {/* Status */}
                <span
                  className={`shrink-0 text-xs px-2 py-1 rounded-md ${
                    statusStyles[crop.status] ||
                    "bg-gray-50 text-gray-600"
                  }`}
                >
                  {crop.status}
                </span>

              </div>

              {/* Actions */}
              <div className="flex justify-end sm:hidden">
                <DeleteButton
                  onDelete={handleDelete}
                  label="Delete Crop"
                />
              </div>

              <div className="hidden sm:flex justify-end">
                <DeleteButton
                  onDelete={handleDelete}
                  label="Delete Crop"
                />
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-600">

                <span className="flex items-center gap-1.5">
                  <Calendar
                    size={14}
                    className="text-gray-400"
                  />

                  Planted{" "}
                  {new Date(
                    crop.plantedOn
                  ).toLocaleDateString()}
                </span>

                {crop.yield?.amount && (
                  <span className="flex items-center gap-1.5">
                    <Scale
                      size={14}
                      className="text-gray-400"
                    />

                    Yield: {crop.yield.amount}{" "}
                    {crop.yield.unit}
                  </span>
                )}

              </div>

            </div>
          </section>

          {/* Growth Stage */}
          <section className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">

            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900">
                Growth Stage
              </h2>

              <span className="text-xs text-green-600 font-medium">
                {growth?.percentComplete || 0}% complete
              </span>
            </div>

            {/* Horizontal scroll on mobile */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[500px] flex items-center">

                {stageOrder.map((stage, i) => (

                  <div
                    key={stage}
                    className="flex items-center flex-1 last:flex-none"
                  >

                    <div className="flex flex-col items-center gap-1.5">

                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 ${
                          i <= stageIndex
                            ? "bg-green-600 border-green-600"
                            : "bg-white border-gray-200"
                        }`}
                      />

                      <span
                        className={`text-[11px] whitespace-nowrap ${
                          i === stageIndex
                            ? "text-gray-900 font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {stage}
                      </span>

                    </div>

                    {i < stageOrder.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 ${
                          i < stageIndex
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
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">

              <span>
                {growth?.daysElapsed || 0} days elapsed
              </span>

              <span>
                {growth?.percentComplete || 0}% complete
              </span>

              {growth?.isOverdue && (
                <span className="text-red-500 font-medium">
                  Crop is overdue
                </span>
              )}

            </div>
          </section>

          {/* Crop Tips */}
          {cropTips.length > 0 && (
            <section className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">

              <div className="flex items-center justify-between gap-3 mb-4">

                <div className="flex items-center gap-2">
                  <Leaf
                    size={16}
                    className="text-green-600"
                  />

                  <h2 className="font-medium text-gray-900">
                    Crop Tips
                  </h2>
                </div>

                <span className="text-xs text-gray-400">
                  {cropTips.length} tip
                  {cropTips.length !== 1 ? "s" : ""}
                </span>

              </div>

              <div className="space-y-3">

                {cropTips.map((tip) => (

                  <div
                    key={tip.id}
                    className="bg-green-50 rounded-xl p-3.5 sm:p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <h3 className="text-sm font-medium text-gray-900">
                        {tip.title}
                      </h3>

                      {tip.severity && (
                        <span className="shrink-0 text-[11px] text-green-700 capitalize">
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
            <section className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">

              <div className="flex items-center justify-between gap-3 mb-4">

                <div className="flex items-center gap-2">

                  <CloudRain
                    size={16}
                    className="text-blue-500"
                  />

                  <h2 className="font-medium text-gray-900">
                    Weather Tips
                  </h2>

                </div>

                <span className="text-xs text-gray-400">
                  Weather-based
                </span>

              </div>

              <div className="space-y-3">

                {weatherTips.map((tip) => (

                  <div
                    key={tip.id}
                    className="bg-blue-50 rounded-xl p-3.5 sm:p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <h3 className="text-sm font-medium text-gray-900">
                        {tip.title}
                      </h3>

                      {tip.severity && (
                        <span className="shrink-0 text-[11px] text-blue-700 capitalize">
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
              <section className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
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
                      We'll show relevant advice as your crop develops.
                    </p>
                  </div>

                </div>
              </section>
            )}

          {/* Diagnosis History */}
          <section className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">

            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900">
                Diagnosis History
              </h2>

              {diagnosisLogs.length > 0 && (
                <span className="text-xs text-gray-400">
                  {diagnosisLogs.length} record
                  {diagnosisLogs.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {diagnosisLogs.length === 0 ? (
              <div className="py-4 text-center">
                <Bug
                  size={20}
                  className="mx-auto text-gray-300"
                />

                <p className="text-xs text-gray-400 mt-2">
                  No diagnoses yet for this crop.
                </p>
              </div>
            ) : (
              <div className="space-y-3">

                {diagnosisLogs.map((log) => (

                  <div
                    key={log._id}
                    className="bg-gray-50 rounded-xl p-3.5 sm:p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex items-start gap-2 min-w-0">

                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                          <Bug
                            size={14}
                            className="text-amber-600"
                          />
                        </div>

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

                      </div>

                      <span className="shrink-0 text-[11px] bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                        {log.confidence}% match
                      </span>

                    </div>

                    {log.explanation && (
                      <p className="text-xs text-gray-600 leading-relaxed mt-3">
                        {log.explanation}
                      </p>
                    )}

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