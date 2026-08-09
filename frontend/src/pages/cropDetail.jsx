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

      console.log(error.response?.data);
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

    if (id) {
      fetchCrop();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />

        <div className="flex min-h-screen">
          <Sidebar />

          <div className="w-full p-6 mt-20 bg-gray-50 flex items-center gap-2 text-gray-500">
            <Loader2 size={16} className="animate-spin" />
            Loading crop...
          </div>
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

          <div className="w-full p-6 mt-20 bg-gray-50">
            {message ? (
              <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                {message}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                No crop data found.
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Backend response structure:
  //
  // {
  //   crop: {...},
  //   growth: {...},
  //   weatherCondition: "...",
  //   cropTips: [...],
  //   weatherTips: [...]
  // }

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

        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">

          {/* Back link */}
          <Link
            to={
              crop.farm?._id
                ? `/farms/${crop.farm._id}`
                : "/crops"
            }
            className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700"
          >
            <ArrowLeft size={14} />

            {crop.farm?.name
              ? `Back to ${crop.farm.name}`
              : "Back to crops"}
          </Link>

          {/* Crop header */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-lg bg-green-50 flex items-center justify-center">
                  <Leaf
                    size={20}
                    className="text-green-600"
                  />
                </div>

                <div>

                  <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {crop.name}

                    {crop.status === "Flagged" && (
                      <AlertTriangle
                        size={16}
                        className="text-amber-500"
                      />
                    )}
                  </h1>

                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={12} />

                    {crop.farm?.name}

                    {crop.farm?.location &&
                      ` · ${crop.farm.location}`}
                  </p>

                </div>
              </div>

              <div className="flex items-center gap-2">

                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    statusStyles[crop.status] ||
                    "bg-gray-50 text-gray-600"
                  }`}
                >
                  {crop.status}
                </span>

                <DeleteButton
                  onDelete={handleDelete}
                  label="Delete Crop"
                />

              </div>
            </div>

            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">

              <span className="flex items-center gap-1">
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
                <span className="flex items-center gap-1">
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

          {/* Growth stage tracker */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <h2 className="font-medium text-gray-900 mb-4">
              Growth Stage
            </h2>

            <div className="flex items-center">

              {stageOrder.map((stage, i) => (

                <div
                  key={stage}
                  className="flex items-center flex-1 last:flex-none"
                >

                  <div className="flex flex-col items-center gap-1">

                    <div
                      className={`w-3 h-3 rounded-full ${
                        i <= stageIndex
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }`}
                    />

                    <span
                      className={`text-xs whitespace-nowrap ${
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
                      className={`h-0.5 flex-1 mx-1 ${
                        i < stageIndex
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                </div>

              ))}

            </div>

            {/* Growth information */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex gap-6 text-xs text-gray-500">

              <span>
                {growth?.daysElapsed} days elapsed
              </span>

              <span>
                {growth?.percentComplete}% complete
              </span>

              {growth?.isOverdue && (
                <span className="text-red-500 font-medium">
                  Crop is overdue
                </span>
              )}

            </div>
          </div>

          {/* Crop Tips */}
          {cropTips.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">

              <div className="flex items-center gap-2 mb-4">
                <Leaf
                  size={16}
                  className="text-green-600"
                />

                <h2 className="font-medium text-gray-900">
                  Crop Tips
                </h2>
              </div>

              <div className="space-y-3">

                {cropTips.map((tip) => (

                  <div
                    key={tip.id}
                    className="bg-green-50 rounded-lg p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <h3 className="text-sm font-medium text-gray-900">
                        {tip.title}
                      </h3>

                      {tip.severity && (
                        <span className="text-xs text-green-700 capitalize">
                          {tip.severity}
                        </span>
                      )}

                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mt-1">
                      {tip.body}
                    </p>

                  </div>

                ))}

              </div>
            </div>
          )}

          {/* Weather Tips */}
          {weatherTips.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">

              <div className="flex items-center gap-2 mb-4">

                <CloudRain
                  size={16}
                  className="text-blue-500"
                />

                <h2 className="font-medium text-gray-900">
                  Weather Tips
                </h2>

              </div>

              <div className="space-y-3">

                {weatherTips.map((tip) => (

                  <div
                    key={tip.id}
                    className="bg-blue-50 rounded-lg p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <h3 className="text-sm font-medium text-gray-900">
                        {tip.title}
                      </h3>

                      {tip.severity && (
                        <span className="text-xs text-blue-700 capitalize">
                          {tip.severity}
                        </span>
                      )}

                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mt-1">
                      {tip.body}
                    </p>

                  </div>

                ))}

              </div>
            </div>
          )}

          {/* No tips message */}
          {cropTips.length === 0 &&
            weatherTips.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-400">
                  No tips available for this crop right now.
                </p>
              </div>
            )}

          {/* Diagnosis history */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <h2 className="font-medium text-gray-900 mb-4">
              Diagnosis History
            </h2>

            {diagnosisLogs.length === 0 && (
              <p className="text-xs text-gray-400">
                No diagnoses yet for this crop.
              </p>
            )}

            <div className="space-y-3">

              {diagnosisLogs.map((log) => (

                <div
                  key={log._id}
                  className="bg-gray-50 rounded-lg p-4"
                >

                  <div className="flex items-center justify-between mb-2">

                    <div className="flex items-center gap-2">

                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">

                        <Bug
                          size={14}
                          className="text-amber-600"
                        />

                      </div>

                      <p className="text-sm font-medium text-gray-900">
                        {log.disease}
                      </p>

                    </div>

                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                      {log.confidence}% match
                    </span>

                  </div>

                  {log.explanation && (
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      {log.explanation}
                    </p>
                  )}

                  <p className="text-xs text-gray-400">
                    {new Date(
                      log.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

              ))}

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CropDetail;