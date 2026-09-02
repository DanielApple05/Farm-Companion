import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Leaf,
  AlertTriangle,
  Loader2,
  Sprout,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

import Sidebar from "../components/navs/sidebar";
import MobileNav from "../components/navs/mobileNav";
import Header from "../components/header";
import { getCropById, deleteCrop, harvestCrop } from "../api/crops";
import DeleteButton from "../components/buttons/deleteButton";
import HarvestModal from "../components/modalComponent/harvestModal";
import DiagnoseInCropDetails from "../components/cropComponent/diagnoseInCropDetails";
import TipsInCropDetails from "../components/tipsComponent/tipsInCropDetails";

const statusStyles = {
  Healthy: "bg-green-50 text-green-700 border border-green-100",
  Flagged: "bg-amber-50 text-amber-700 border border-amber-100",
};

const stageOrder = ["Seedling", "Vegetative", "Flowering", "Maturing", "Harvested"];

const CropDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cropData, setCropData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showHarvestModal, setShowHarvestModal] = useState(false);

  const fetchCrop = async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await getCropById(id);
      setCropData(response.data);
    } catch (error) {
      setMessage(error?.response?.data?.message || error?.message || "Failed to load crop");
      setCropData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCrop();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteCrop(id);
      navigate(cropData?.crop?.farm?._id ? `/farms/${cropData.crop.farm._id}` : "/crops");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete crop");
    }
  };

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
      setMessage(error.response?.data?.message || "Failed to harvest crop");
    }
  };

  const crop = cropData?.crop;
  const growth = cropData?.growth;
  const cropTips = cropData?.cropTips || [];
  const weatherTips = cropData?.weatherTips || [];
  const stageIndex = growth ? stageOrder.indexOf(growth.stage) : -1;
  const diagnosisLogs = crop
    ? [...(crop.diagnosisLogs || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];
  const isHarvestReady = growth?.stage === "Harvested" && crop && !crop.harvestedOn;
  const isHarvested = Boolean(crop?.harvestedOn);
  const availableForSale = crop?.availableForSale ?? 0;

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />

        <main className="w-full min-w-0 bg-gray-50 px-4 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6 xl:mt-20 mt-28 mb-20 xl:mb-0">
          {loading && (
            <div className="flex items-center justify-center py-10">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                Loading crop...
              </div>
            </div>
          )}

          {!loading && !cropData && (
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle size={24} className="text-gray-300" />
              <p className="text-sm text-gray-600 mt-2">{message || "No crop data found."}</p>
              <button
                type="button"
                onClick={fetchCrop}
                className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-green-600 hover:text-green-700"
              >
                <RefreshCw size={13} />
                Try again
              </button>
            </div>
          )}

          {!loading && cropData && crop && (
            <>
              <div className="flex items-center justify-between gap-3">
                <Link
                  to={crop.farm?._id ? `/farms/${crop.farm._id}` : "/crops"}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors min-w-0"
                >
                  <ArrowLeft size={15} className="shrink-0" />
                  <span className="truncate max-w-[220px] sm:max-w-none">
                    {crop.farm?.name ? `Back to ${crop.farm.name}` : "Back to crops"}
                  </span>
                </Link>

                <DeleteButton onDelete={handleDelete} label="Delete Crop" />
              </div>

              {message && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                  {message}
                </div>
              )}

              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid items-start gap-3 min-w-0">
                    <div className="w-24 h-11 sm:h-12 p-1 rounded-xl bg-green-50 flex items-center justify-between shrink-0">
                      <Leaf size={20} className="text-green-600" />
                      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 capitalize">
                        {crop.name}
                      </h1>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {crop.status === "Flagged" && (
                          <AlertTriangle size={16} className="text-amber-500 shrink-0" />
                        )}
                      </div>

                      <div className="flex items-start gap-1.5 mt-1.5 text-sm text-gray-500">
                        <MapPin size={13} className="mt-0.5 shrink-0" />
                        <span className="break-words">
                          {crop.farm?.name || "Unknown farm"}
                          {crop.farm?.location && ` · ${crop.farm.location}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[crop.status] || "bg-gray-50 text-gray-600 border border-gray-100"
                      }`}
                  >
                    {crop.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[11px] uppercase tracking-wide text-gray-400">Planted</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {new Date(crop.plantedOn).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {isHarvested ? (
                    <div className="bg-green-50 rounded-xl p-3 flex xl:flex-row flex-col justify-between items-center">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-green-600">Harvest</p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                          <span className="text-sm font-medium text-green-700">
                            {crop.yield?.amount} {crop.yield?.unit}
                          </span>
                          <span className="text-xs text-green-600">
                            · {new Date(crop.harvestedOn).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-green-600 mt-2">Available for Sale</p>
                        <p className="text-sm font-medium text-green-700 mt-1">
                          {availableForSale} {crop.yield?.unit}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400">Current Stage</p>
                      <p className="text-sm font-medium text-gray-700 mt-1">
                        {growth?.stage || "Not specified"}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {showHarvestModal && (
                <HarvestModal
                  crop={crop}
                  onClose={() => setShowHarvestModal(false)}
                  onHarvest={handleHarvest}
                />
              )}

              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <h2 className="font-medium text-gray-900">Growth Stage</h2>
                    <p className="text-xs text-gray-400 mt-1">Track your crop's progress.</p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    {growth?.percentComplete || 0}%
                  </span>
                </div>

                <div className="overflow-x-auto -mx-1 px-1 pb-2 scrollbar-thin">
                  <div className="min-w-[520px] flex items-start">
                    {stageOrder.map((stage, i) => (
                      <div key={stage} className="flex items-start flex-1 last:flex-none">
                        <div className="flex flex-col items-center min-w-[72px]">
                          <div
                            className={`w-4 h-4 rounded-full border-2 transition-colors ${i <= stageIndex ? "bg-green-600 border-green-600" : "bg-white border-gray-200"
                              }`}
                          />
                          <span
                            className={`text-[11px] mt-2 whitespace-nowrap ${i === stageIndex ? "text-gray-900 font-medium" : "text-gray-400"
                              }`}
                          >
                            {stage}
                          </span>
                        </div>
                        {i < stageOrder.length - 1 && (
                          <div
                            className={`h-0.5 flex-1 mt-[7px] ${i < stageIndex ? "bg-green-600" : "bg-gray-200"}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="flex gap-3 justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Days elapsed</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">{growth?.daysElapsed || 0} days</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Progress</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">{growth?.percentComplete || 0}%</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    {isHarvested ? (
                      <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-xl px-3.5 py-3 text-sm">
                        <CheckCircle2 size={17} className="shrink-0" />
                        <div>
                          <p className="font-medium">Crop harvested</p>
                          <p className="text-xs text-green-600 mt-0.5">
                            This crop has been added to your harvest records.
                          </p>
                        </div>
                      </div>
                    ) : isHarvestReady ? (
                      <button
                        type="button"
                        onClick={() => setShowHarvestModal(true)}
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

              <TipsInCropDetails weatherTips={weatherTips} cropTips={cropTips} />

              <DiagnoseInCropDetails diagnosisLogs={diagnosisLogs} />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default CropDetail;
