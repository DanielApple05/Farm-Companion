import { useState, useEffect } from "react";
import { X, Leaf, Calendar, Camera } from "lucide-react";
import { createCrop } from "../api/crops";
import { getFarms } from "../api/farm";


const AddCropModal = ({ onClose }) => {
  const [cropName, setCropName] = useState("");
  const [farmId, setFarmId] = useState("");
  const [plantedOn, setPlantedOn] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [farmOptions, setFarmOptions] = useState([]);

  // Placeholder — wire up real submit logic later
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await createCrop({ cropName, plantedOn, farmId })
      setIsSuccess(true);
      setMessage("Crop added successfully!");
      // auto-close the modal after a moment so the user sees the confirmation
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Can't add crop");

    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add Crop</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Crop name */}
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
            <label className="text-sm text-gray-700 font-medium">Crop name</label>
            <div className="relative mt-1">
              <Leaf size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g. Maize"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Farm select */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Farm</label>

            <select
              value={farmId}
              onChange={(e) => setFarmId(e.target.value)}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              <option value="">Select a farm</option>

              {farmOptions.map((farm) => (
                <option key={farm._id} value={farm._id}>
                  {farm.name}
                </option>
              ))}
            </select>
          </div>

          {/* Planting date */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Planting date</label>
            <div className="relative mt-1">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={plantedOn}
                onChange={(e) => setPlantedOn(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Optional photo */}
          <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 border-2 border-dashed border-gray-200 rounded-lg py-3 hover:border-green-300 hover:text-green-600 transition-colors">
            <Camera size={16} />
            Add a photo (optional)
          </button>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <div
              onClick={onClose}
              className="flex-1 text-sm py-2.5 rounded-lg border text-center border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </div>
            <button
              onSubmit={handleSubmit}
              disabled={!cropName || !farmId || loading}
              className="flex-1 text-sm py-2.5 rounded-lg bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white hover:bg-green-700 transition-colors"
            >
              {loading ? "adding..." : "Add Crop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCropModal;
