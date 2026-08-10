import { useState, useEffect } from "react";
import { X, PawPrint, Hash, Camera } from "lucide-react";
import { createLivestock } from "../api/livestock";
import { getFarms } from "../api/farm";
import { getSupportedLivestock } from "../api/livestock";

const AddLivestockModal = ({ farmId, onClose, onAdded }) => {
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [farmOptions, setFarmOptions] = useState([]);
  const [supportedLivestock, setSupportedLivestock] = useState([]);
  const [loadingLivestock, setLoadingLivestock] = useState(false);

  // Placeholder — wire up real submit logic later
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalFarmId = farmId || selectedFarmId;
    try {
      setLoading(true);
      const response = await createLivestock({ type, breed, headcount, farmId: finalFarmId });
      setIsSuccess(true);
      setMessage("Livestock added successfully!");
      onAdded(response.data);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add livestock");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (farmId) return;
    const fetchFarm = async () => {
      try {
        const response = await getFarms();
        setFarmOptions(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message || "Failed to fetch farms"
        );
      }
    };
    fetchFarm();
  }, [farmId]);

  useEffect(() => {
    const fetchSupportedLivestock = async () => {
      setLoadingLivestock(true);
      try {
        const response = await getSupportedLivestock();
        setSupportedLivestock(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message || "Failed to fetch supported livestock"
        );
      } finally {
        setLoadingLivestock(false);
      }
    };

    fetchSupportedLivestock();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add Livestock</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {message && (
            <div
              className={`w-full border text-sm rounded-xl px-4 py-3 mb-4 ${isSuccess
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-red-50 border-red-200 text-red-500"
                }`}
            >
              {message}
            </div>
          )}
          <div>
            <label className="text-sm text-gray-700 font-medium">Type</label>

            {loadingLivestock ? (
              <div className="xl:flex justify-between grid grid-cols-4 gap-2 mt-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex  flex-col items-center gap-2 py-1 rounded-lg border border-gray-100 animate-pulse"
                  >
                    <div className="w-4 h-2 rounded-full bg-gray-200" />
                    <div className="h-2.5 w-12 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 mt-1">
                {supportedLivestock.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`flex flex-col items-center gap-1 py-2 rounded-lg border text-xs transition-colors ${type === t.id
                        ? "border-amber-400 bg-amber-50 text-amber-700 font-medium"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                  >
                    <PawPrint size={16} />
                    {t.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Breed */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Breed</label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="e.g. West African Dwarf"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Headcount */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Headcount</label>
            <div className="relative mt-1">
              <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                min="1"
                value={headcount}
                onChange={(e) => setHeadcount(e.target.value)}
                placeholder="e.g. 10"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Farm select */}
          {!farmId && (<div>
            <label className="text-sm text-gray-700 font-medium">Farm</label>
            <select
              value={farmId}
              onChange={(e) => setSelectedFarmId(e.target.value)}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              <option value="">Select a farm</option>
              {farmOptions.map((f) => (
                <option key={f._id} value={f._id}>{f.name}</option>
              ))}
            </select>
          </div>
          )}
          {/* Optional photo */}
          <div className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 border-2 border-dashed border-gray-200 rounded-lg py-3 hover:border-green-300 hover:text-green-600 transition-colors">
            <Camera size={16} />
            Add a photo (optional)
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <div
              onClick={onClose}
              className="flex-1 text-sm py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </div>
            <button
              type="submit"
              disabled={!type || !headcount || loading}
              className="flex-1 text-sm py-2.5 rounded-lg bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white hover:bg-green-700 transition-colors"
            >
              Add Livestock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLivestockModal;
