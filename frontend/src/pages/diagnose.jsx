import { useState, useEffect, useMemo } from "react";
import { Camera, Upload, ChevronDown, Bug, MessageCircle, Send, X, Loader2 } from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { diagnoseCrop } from "../api/diagnose";
import { getCrops } from "../api/crops";

const riskStyles = {
  Low: "bg-green-50 text-green-700",
  Medium: "bg-amber-50 text-amber-700",
  High: "bg-red-50 text-red-700",
};

// Kindwise gives a confidence %, not a risk label — map it to something readable
const confidenceToRisk = (confidence) => {
  if (confidence >= 80) return "High";
  if (confidence >= 50) return "Medium";
  return "Low";
};

const DiagnoseCrop = () => {
  // The list of the user's crops, fetched from the backend
  const [cropOptions, setCropOptions] = useState([]);
  const [cropLoading, setCropLoading] = useState(false);
  const [message, setMessage] = useState("");

  // The crop the user actually picks from the dropdown — its _id, not its name
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
        setMessage(error?.response?.data?.message || "Failed to fetch crops");
      } finally {
        setCropLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const handleDiagnose = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cropId", selectedCrop);
    formData.append("image", selectedImage);

    try {
      setDiagnosing(true);
      setDiagnoseError("");
      const response = await diagnoseCrop(formData);
      setDiagnosisResult(response.data);

      // Refresh crops so the new diagnosis shows up in "Recent Diagnoses" right away
      const refreshed = await getCrops();
      setCropOptions(refreshed.data);
    } catch (error) {
      setDiagnoseError(error.response?.data?.message || "Diagnosis failed. Try again.");
    } finally {
      setDiagnosing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // the first (and here, only) selected file
    setSelectedImage(file);
  };

  // Real recent diagnoses — flatten every crop's diagnosisLogs, tag with the crop name,
  // sort newest first, take the top 5. No hardcoded dummy array.
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
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [cropOptions]);

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Page header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Diagnose Crop</h1>
            <p className="text-gray-500 text-sm mt-1">Upload a photo to check for pests or disease.</p>
          </div>

          {message && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: upload + form */}
            <div className="lg:col-span-2 space-y-4">
              <form
                onSubmit={handleDiagnose}
                className="bg-white rounded-xl border border-gray-100 p-5 space-y-4"
              >
                {/* Crop selector */}
                <div>
                  <label className="text-sm text-gray-700 font-medium">Which crop is this?</label>
                  <div className="relative mt-1">
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      disabled={cropLoading}
                      className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
                    >
                      <option value="">
                        {cropLoading ? "Loading your crops..." : "Select a crop"}
                      </option>
                      {cropOptions.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Upload area */}
                <div className="relative">
                  <label className="text-sm text-gray-700 font-medium mb-3">Photo</label>
                  {selectedImage ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected crop"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-5 right-0 p-2 bg-red-400 cursor-pointer rounded-full"
                      >
                        <X size={24} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={handleFileChange}
                      className="p-5 w-full border-2 border-dashed border-gray-200 rounded-xl h-48 gap-2 text-gray-400 hover:border-green-300 hover:text-green-600 transition-colors"
                    />
                  )}
                  {!selectedImage && (
                    <div className="absolute inset-0 top-1/2 flex flex-col items-center">
                      <Camera size={28} />
                      <span className="text-sm">Take or upload a photo</span>
                      <span className="text-xs">JPG or PNG, up to 10MB</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!selectedCrop || !selectedImage || diagnosing}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Upload size={16} />
                  {diagnosing ? "Diagnosing..." : "Diagnose"}
                </button>
              </form>

              {/* Result section */}
              {diagnosing && (
                <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-2 text-gray-500">
                  <Loader2 size={16} className="animate-spin" />
                  Analyzing your photo...
                </div>
              )}

              {diagnoseError && (
                <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                  {diagnoseError}
                </div>
              )}

              {/* Everything below is safely guarded by `diagnosisResult &&` first —
                  nothing here can run while diagnosisResult is still null */}
              {diagnosisResult && !diagnosing && (
                <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Bug size={16} className="text-amber-600" />
                      </div>
                      <div>
                        <h2 className="font-medium text-gray-900">{diagnosisResult.disease}</h2>
                        <p className="text-xs text-gray-500">{diagnosisResult.selectedCrop}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                      {diagnosisResult.confidence}% match
                    </span>
                  </div>

                  {diagnosisResult.detectedCrop &&
                    diagnosisResult.detectedCrop.toLowerCase() !== diagnosisResult.selectedCrop?.toLowerCase() && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-3 py-2">
                        You selected <strong>{diagnosisResult.selectedCrop}</strong>, but this photo looks like it might be{" "}
                        <strong>{diagnosisResult.detectedCrop}</strong>. Double check you uploaded the right photo.
                      </div>
                    )}

                  {diagnosisResult.explanation && (
                    <p className="text-sm text-gray-600 leading-relaxed">{diagnosisResult.explanation}</p>
                  )}

                  <div className="pt-3 border-t border-gray-100">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ask a follow-up question..."
                        className="w-full pl-3 pr-10 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600">
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: recent diagnoses — real data, derived from fetched crops */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 h-fit space-y-3">
              <h2 className="font-medium text-gray-900 mb-2">Recent Diagnoses</h2>

              {cropLoading && <p className="text-xs text-gray-400">Loading...</p>}

              {!cropLoading && recentDiagnoses.length === 0 && (
                <p className="text-xs text-gray-400">No diagnoses yet — your results will show up here.</p>
              )}

              {recentDiagnoses.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-gray-900">{d.crop} — {d.issue}</p>
                    <p className="text-xs text-gray-500">{d.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-md ${riskStyles[d.risk]}`}>{d.risk}</span>
                </div>
              ))}

              <button className="w-full flex items-center justify-center gap-2 text-sm text-green-600 pt-2">
                <MessageCircle size={14} />
                Ask AI Assistant instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagnoseCrop;
