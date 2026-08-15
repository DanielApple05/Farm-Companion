import { useState, useEffect } from "react";
import { X, Calendar, Camera } from "lucide-react";
import { createCrop, getSupportedCrops } from "../api/crops";
import { getFarms } from "../api/farm";

const AddCropModal = ({ farmId, onClose, onAdded }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [cropName, setCropName] = useState("");
  const [selectedFarmId, setSelectedFarmId] = useState(farmId || "");
  const [plantedOn, setPlantedOn] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const [loadingFarms, setLoadingFarms] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [farmOptions, setFarmOptions] = useState([]);
  const [supportedCrops, setSupportedCrops] = useState([]);

  // Keep selected farm synced if farmId is passed from the farm page
  useEffect(() => {
    if (farmId) {
      setSelectedFarmId(farmId);
    }
  }, [farmId]);

  // Fetch farms when no farm was provided
  useEffect(() => {
    if (farmId) return;

    const fetchFarms = async () => {
      try {
        setLoadingFarms(true);

        const response = await getFarms();
        setFarmOptions(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message || "Failed to fetch farms"
        );
      } finally {
        setLoadingFarms(false);
      }
    };

    fetchFarms();
  }, [farmId]);

  // Fetch supported crops
  useEffect(() => {
    const fetchSupportedCrops = async () => {
      try {
        setLoadingCrops(true);

        const response = await getSupportedCrops();

        setSupportedCrops(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message ||
          "Failed to fetch supported crops"
        );
      } finally {
        setLoadingCrops(false);
      }
    };

    fetchSupportedCrops();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFarmId = farmId || selectedFarmId;

    if (!cropName || !finalFarmId || !plantedOn) {
      setMessage("Please complete all required fields.");
      setIsSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setIsSuccess(false);

      const response = await createCrop({
        cropName,
        plantedOn,
        farmId: finalFarmId,
      });

      setIsSuccess(true);
      setMessage("Crop added successfully!");

      onAdded?.(response.data);

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      setIsSuccess(false);
      setMessage(
        error?.response?.data?.message ||
        error?.message ||
        "Can't add crop"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Crop
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Message */}
          {message && (
            <div
              className={`w-full border text-sm rounded-xl px-4 py-3 ${isSuccess
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-red-50 border-red-200 text-red-500"
                }`}
            >
              {message}
            </div>
          )}

          {/* Crop selection */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Crop
            </label>

            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              disabled={loadingCrops}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 disabled:bg-gray-50"
            >
              <option value="">
                {loadingCrops ? "Loading crops..." : "Select a crop"}
              </option>

              {supportedCrops.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.name}
                </option>
              ))}
            </select>
          </div>

          {/* Farm select */}
          {!farmId && (
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Farm
              </label>

              <select
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
                disabled={loadingFarms}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 disabled:bg-gray-50"
              >
                <option value="">
                  {loadingFarms ? "Loading farms..." : "Select a farm"}
                </option>

                {farmOptions.map((farm) => (
                  <option key={farm._id} value={farm._id}>
                    {farm.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Planting date */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Planting date
            </label>

            <div className="relative mt-1">
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                value={plantedOn}
                onChange={(e) => setPlantedOn(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Optional photo */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 border-2 border-dashed border-gray-200 rounded-lg py-3 hover:border-green-300 hover:text-green-600 transition-colors"
          >
            <Camera size={16} />
            Add a photo (optional)
          </button>

          {/* Actions */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                !cropName ||
                !selectedFarmId &&
                !farmId ||
                !plantedOn ||
                loading ||
                loadingCrops
              }
              className="flex-1 text-sm py-2.5 rounded-lg bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white hover:bg-green-700 transition-colors"
            >
              {loading ? "Adding..." : "Add Crop"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCropModal;
