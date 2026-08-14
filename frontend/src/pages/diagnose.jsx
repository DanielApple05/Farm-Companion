import { useState, useEffect, useMemo } from "react";
import {
  Camera,
  Upload,
  ChevronDown,
  Bug,
  MessageCircle,
  Send,
  X,
  Loader2,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { diagnoseCrop } from "../api/diagnose";
import { getCrops } from "../api/crops";
import MobileNav from "../components/mobileNav";

const riskStyles = {
  Low: "bg-green-50 text-green-700",
  Medium: "bg-amber-50 text-amber-700",
  High: "bg-red-50 text-red-700",
};

const confidenceToRisk = (confidence) => {
  if (confidence >= 80) return "High";
  if (confidence >= 50) return "Medium";
  return "Low";
};

const DiagnoseCrop = () => {
  const [cropOptions, setCropOptions] = useState([]);
  const [cropLoading, setCropLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  const [diagnosing, setDiagnosing] = useState(false);
  const [diagnoseError, setDiagnoseError] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setCropLoading(true);

        const response = await getCrops();
        setCropOptions(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message ||
          "Failed to fetch crops"
        );
      } finally {
        setCropLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const handleDiagnose = async (e) => {
    e.preventDefault();

    if (!selectedCrop || !selectedImage) return;

    const formData = new FormData();

    formData.append("cropId", selectedCrop);
    formData.append("image", selectedImage);

    try {
      setDiagnosing(true);
      setDiagnoseError("");
      setDiagnosisResult(null);

      const response = await diagnoseCrop(formData);

      setDiagnosisResult(response.data);

      const refreshed = await getCrops();
      setCropOptions(refreshed.data);
    } catch (error) {
      setDiagnoseError(
        error.response?.data?.message ||
        "Diagnosis failed. Try again."
      );
    } finally {
      setDiagnosing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
    setDiagnosisResult(null);
    setDiagnoseError("");
  };

  const imagePreview = useMemo(() => {
    if (!selectedImage) return null;

    return URL.createObjectURL(selectedImage);
  }, [selectedImage]);

  const recentDiagnoses = useMemo(() => {
    return cropOptions
      .flatMap((crop) =>
        (crop.diagnosisLogs || []).map((log) => ({
          crop: crop.name,
          issue: log.disease,
          risk: confidenceToRisk(log.confidence),
          date: new Date(log.createdAt).toLocaleDateString(),
          createdAt: log.createdAt,
        }))
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);
  }, [cropOptions]);

  return (
    <>
      <Header />

      <div className="flex min-h-screen bg-gray-50">

        <Sidebar />
        <MobileNav />
        <main className="w-full min-w-0 pt-20 xl:ml-0 xl:mt-0 mt-10 mb-20">

          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

            {/* Page header */}
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Diagnose Crop
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Upload a photo to check for pests or disease.
              </p>
            </div>

            {/* Global error */}
            {message && (
              <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                {message}
              </div>
            )}

            {/* Main layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

              {/* Diagnosis form */}
              <div className="lg:col-span-2 space-y-5">

                <form
                  onSubmit={handleDiagnose}
                  className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-5"
                >

                  {/* Crop selector */}
                  <div>
                    <label className="text-sm text-gray-700 font-medium">
                      Which crop is this?
                    </label>

                    <div className="relative mt-1.5">
                      <select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        disabled={cropLoading}
                        className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-3 pr-10 text-sm text-gray-700 bg-white transition focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-50 disabled:text-gray-400"
                      >
                        <option value="">
                          {cropLoading ? "Loading your crops..." : "Select a crop"}
                        </option>

                        {cropOptions.map((crop) => (
                          <option key={crop._id} value={crop._id}>
                            {crop.name} — {crop.farm?.name || "Unknown farm"} —{" "}
                            {crop.plantedOn
                              ? new Date(crop.plantedOn).toLocaleDateString()
                              : "Date unavailable"}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Image upload */}
                  <div>
                    <label className="text-sm text-gray-700 font-medium">
                      Crop photo
                    </label>

                    <div className="relative mt-1.5">

                      {selectedImage && imagePreview ? (
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200">

                          <img
                            src={imagePreview}
                            alt="Selected crop"
                            className="w-full h-56 sm:h-72 object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedImage(null)
                            }
                            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/70 transition-colors"
                          >
                            <X
                              size={18}
                              className="text-white"
                            />
                          </button>

                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-48 sm:h-56 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-green-300 hover:bg-green-50/30 transition-colors">

                          <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleFileChange}
                            className="hidden"
                          />

                          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-3">
                            <Camera
                              size={24}
                              className="text-green-600"
                            />
                          </div>

                          <p className="text-sm font-medium text-gray-700">
                            Take or upload a photo
                          </p>

                          <p className="text-xs text-gray-400 mt-1 text-center px-4">
                            JPG or PNG · up to 10MB
                          </p>

                        </label>
                      )}

                    </div>
                  </div>

                  {/* Diagnose button */}
                  <button
                    type="submit"
                    disabled={
                      !selectedCrop ||
                      !selectedImage ||
                      diagnosing
                    }
                    className="w-full min-h-11 flex items-center justify-center gap-2 bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors"
                  >
                    {diagnosing ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Analyzing photo...
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        Diagnose Crop
                      </>
                    )}
                  </button>

                </form>

                {/* Diagnosis loading */}
                {diagnosing && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3 text-gray-500">
                    <Loader2
                      size={18}
                      className="animate-spin text-green-600"
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Analyzing your crop...
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        This may take a few seconds.
                      </p>
                    </div>
                  </div>
                )}

                {/* Diagnosis error */}
                {diagnoseError && (
                  <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                    {diagnoseError}
                  </div>
                )}

                {/* Diagnosis result */}
                {diagnosisResult && !diagnosing && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-4">

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-50 flex items-center justify-center">
                          <Bug
                            size={18}
                            className="text-amber-600"
                          />
                        </div>

                        <div className="min-w-0">
                          <h2 className="font-medium text-gray-900 truncate">
                            {diagnosisResult.disease}
                          </h2>

                          <p className="text-xs text-gray-500 mt-0.5">
                            {diagnosisResult.selectedCrop}
                          </p>
                        </div>

                      </div>

                      <span className="shrink-0 text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                        {diagnosisResult.confidence}% match
                      </span>

                    </div>

                    {diagnosisResult.detectedCrop &&
                      diagnosisResult.detectedCrop.toLowerCase() !==
                      diagnosisResult.selectedCrop?.toLowerCase() && (
                        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl px-3 py-3">
                          You selected{" "}
                          <strong>
                            {diagnosisResult.selectedCrop}
                          </strong>
                          , but this photo looks like it might be{" "}
                          <strong>
                            {diagnosisResult.detectedCrop}
                          </strong>
                          .
                        </div>
                      )}

                    {diagnosisResult.explanation && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {diagnosisResult.explanation}
                      </p>
                    )}

                    {/* Follow-up */}
                    <div className="pt-3 border-t border-gray-100">

                      <label className="text-xs text-gray-500 mb-1.5 block">
                        Have a question about this result?
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Ask a follow-up question..."
                          className="w-full pl-3 pr-11 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                        />

                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-50"
                        >
                          <Send size={16} />
                        </button>
                      </div>

                    </div>

                  </div>
                )}

                {/* Recent diagnoses on mobile */}
                <div className="lg:hidden bg-white rounded-2xl border border-gray-100 p-4">

                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-medium text-gray-900">
                      Recent Diagnoses
                    </h2>

                    <span className="text-xs text-gray-400">
                      Latest 5
                    </span>
                  </div>

                  {cropLoading && (
                    <p className="text-xs text-gray-400">
                      Loading...
                    </p>
                  )}

                  {!cropLoading &&
                    recentDiagnoses.length === 0 && (
                      <div className="py-5 text-center">
                        <Bug
                          size={20}
                          className="mx-auto text-gray-300"
                        />

                        <p className="text-xs text-gray-400 mt-2">
                          No diagnoses yet.
                        </p>
                      </div>
                    )}

                  <div className="space-y-2">

                    {recentDiagnoses.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >

                        <div className="w-9 h-9 shrink-0 rounded-lg bg-white flex items-center justify-center">
                          <Bug
                            size={15}
                            className="text-amber-600"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">
                            {d.issue}
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            {d.crop} · {d.date}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 text-xs px-2 py-1 rounded-md ${riskStyles[d.risk]}`}
                        >
                          {d.risk}
                        </span>

                      </div>
                    ))}

                  </div>

                  <button
                    type="button"
                    className="w-full mt-3 flex items-center justify-center gap-2 text-sm text-green-600 py-2"
                  >
                    <MessageCircle size={14} />
                    Ask AI Assistant
                  </button>

                </div>

              </div>

              {/* Desktop recent diagnoses */}
              <aside className="hidden lg:block bg-white rounded-2xl border border-gray-100 p-5 h-fit">

                <h2 className="font-medium text-gray-900 mb-3">
                  Recent Diagnoses
                </h2>

                {cropLoading && (
                  <p className="text-xs text-gray-400">
                    Loading...
                  </p>
                )}

                {!cropLoading &&
                  recentDiagnoses.length === 0 && (
                    <p className="text-xs text-gray-400">
                      No diagnoses yet — your results will show up here.
                    </p>
                  )}

                <div className="space-y-3">

                  {recentDiagnoses.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 text-sm py-2 border-b border-gray-50 last:border-0"
                    >

                      <div className="min-w-0">
                        <p className="text-gray-900 truncate">
                          {d.crop} — {d.issue}
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                          {d.date}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 text-xs px-2 py-1 rounded-md ${riskStyles[d.risk]}`}
                      >
                        {d.risk}
                      </span>

                    </div>
                  ))}

                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 text-sm text-green-600 pt-4"
                >
                  <MessageCircle size={14} />
                  Ask AI Assistant instead
                </button>

              </aside>

            </div>

          </div>

        </main>
      </div>
    </>
  );
};

export default DiagnoseCrop;
