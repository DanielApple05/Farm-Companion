import { useState } from "react";
import { Camera, Upload, ChevronDown, Bug, MessageCircle, Send, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { createDiagnoseCrop } from "../api/diagnoseCrop";


// ---- Dummy data (swap for real API/DB data later) ----
const cropOptions = [
  { id: 1, label: "Maize — Rumuokoro Farm" },
  { id: 2, label: "Cassava — Rumuokoro Farm" },
  { id: 3, label: "Tomato — Omuahia Farm" },
];

const recentDiagnoses = [
  { crop: "Maize", issue: "Northern Leaf Blight", risk: "Medium", date: "May 10" },
  { crop: "Tomato", issue: "Early Blight", risk: "Low", date: "May 8" },
];

const riskStyles = {
  Low: "bg-green-50 text-green-700",
  Medium: "bg-amber-50 text-amber-700",
  High: "bg-red-50 text-red-700",
};

// Dummy result — swap for real Pl@ntNet + Claude response later
const dummyResult = {
  disease: "Northern Leaf Blight",
  confidence: 78,
  explanation:
    "This is a fungal disease common in maize during humid weather. It spreads through spores on old leaf debris and worsens with prolonged leaf wetness. Remove and destroy affected leaves, avoid overhead irrigation, and consider a fungicide if it spreads to more than a third of the plant.",
};

const DiagnoseCrop = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

    const handleDiagnose = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("crop", selectedCrop);
      formData.append("image", selectedImage);

      try {
        setLoading(true);
        const response = await createDiagnoseCrop(formData);
        setDiagnosisResult(response.data);
        setShowResult(true);
      } catch (error) {
        setMessage(error.response?.data?.message || "Diagnosis failed");
      } finally {
        setLoading(false);
      }
    };


    const handleFileChange = (e) => {
      const file = e.target.files[0]; // the first (and here, only) selected file
      setSelectedImage(file);
    };

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: upload + form */}
              <div className="lg:col-span-2 space-y-4">
                <form
                  onSubmit={handleDiagnose}
                  className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                  {/* Crop selector */}
                  <div>
                    <label className="text-sm text-gray-700 font-medium">Which crop is this?</label>
                    <div className="relative mt-1">
                      <select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="">Select a crop</option>
                        {cropOptions.map((c) => (
                          <option key={c.id} value={c.label}>{c.label}</option>
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
                        <div
                          onClick={() => setSelectedImage(null)}
                          className="absolute top-5 right-0 p-2 bg-red-400 cursor-pointer rounded-full">
                          <X size={24} className="text-white" />
                        </div>
                      </div>
                    ) :
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                        className=" p-5 w-full border-2 border-dashed border-gray-200 rounded-xl h-48 gap-2 text-gray-400 hover:border-green-300 hover:text-green-600 transition-colors"
                      />}
                    {!selectedImage && <div className="absolute inset-0 top-1/2 flex flex-col items-center ">
                      <Camera size={28} />
                      <span className="text-sm">Take or upload a photo</span>
                      <span className="text-xs">JPG or PNG, up to 10MB</span>
                    </div>}
                  </div>
                  <button
                    type="submit"
                    disabled={!selectedCrop || !selectedImage}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Upload size={16} />
                    Diagnose
                  </button>
                </form>

                {/* Result section */}
                {showResult && (
                  <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                          <Bug size={16} className="text-amber-600" />
                        </div>
                        <h2 className="font-medium text-gray-900">{dummyResult.disease}</h2>
                      </div>
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                        {dummyResult.confidence}% match
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">{dummyResult.explanation}</p>

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

              {/* Right: recent diagnoses */}
              <div className="bg-white rounded-xl border border-gray-100 p-5 h-fit space-y-3">
                <h2 className="font-medium text-gray-900 mb-2">Recent Diagnoses</h2>
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
