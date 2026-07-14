import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Leaf, AlertTriangle, Loader2, Bug, Scale } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getCropById } from "../api/crops";

const statusStyles = {
  Healthy: "bg-green-50 text-green-700",
  Flagged: "bg-amber-50 text-amber-700",
};

const stageOrder = ["Seedling", "Vegetative", "Flowering", "Maturing", "Harvested"];

const CropDetail = () => {
  const { id } = useParams();

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        setLoading(true);
        const response = await getCropById(id);
        setCrop(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load crop");
        console.error(error);
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
          <div className="w-full p-6 mt-20 bg-gray-50 flex items-center gap-2 text-gray-500">
            <Loader2 size={16} className="animate-spin" />
            Loading crop...
          </div>
        </div>
      </>
    );
  }

  if (!crop) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="w-full p-6 mt-20 bg-gray-50">
            {message && (
              <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                {message}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  const stageIndex = stageOrder.indexOf(crop.stage);
  const diagnosisLogs = [...(crop.diagnosisLogs || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Back link */}
          <Link
            to={crop.farm?._id ? `/farms/${crop.farm._id}` : "/crops"}
            className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700"
          >
            <ArrowLeft size={14} />
            {crop.farm?.name ? `Back to ${crop.farm.name}` : "Back to crops"}
          </Link>

          {/* Crop header */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-green-50 flex items-center justify-center">
                  <Leaf size={20} className="text-green-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {crop.name}
                    {crop.status === "Flagged" && <AlertTriangle size={16} className="text-amber-500" />}
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={12} />
                    {crop.farm?.name} {crop.farm?.location && `· ${crop.farm.location}`}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-md ${statusStyles[crop.status]}`}>
                {crop.status}
              </span>
            </div>

            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-gray-400" />
                Planted {new Date(crop.plantedOn).toLocaleDateString()}
              </span>
              {crop.yield?.amount && (
                <span className="flex items-center gap-1">
                  <Scale size={14} className="text-gray-400" />
                  Yield: {crop.yield.amount} {crop.yield.unit}
                </span>
              )}
            </div>
          </div>

          {/* Growth stage tracker */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-medium text-gray-900 mb-4">Growth Stage</h2>
            <div className="flex items-center">
              {stageOrder.map((stage, i) => (
                <div key={stage} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        i <= stageIndex ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                    <span
                      className={`text-xs whitespace-nowrap ${
                        i === stageIndex ? "text-gray-900 font-medium" : "text-gray-400"
                      }`}
                    >
                      {stage}
                    </span>
                  </div>
                  {i < stageOrder.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-1 ${i < stageIndex ? "bg-green-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Diagnosis history */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-medium text-gray-900 mb-4">Diagnosis History</h2>

            {diagnosisLogs.length === 0 && (
              <p className="text-xs text-gray-400">No diagnoses yet for this crop.</p>
            )}

            <div className="space-y-3">
              {diagnosisLogs.map((log, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Bug size={14} className="text-amber-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">{log.disease}</p>
                    </div>
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                      {log.confidence}% match
                    </span>
                  </div>
                  {log.explanation && (
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{log.explanation}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {new Date(log.createdAt).toLocaleDateString()}
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