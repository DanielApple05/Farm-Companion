import { useEffect, useState } from "react";
import { X, PawPrint, Camera } from "lucide-react";
import { createLivestock, getSupportedLivestock } from "../api/livestock";
import { getFarms } from "../api/farm";

const AddLivestockModal = ({ farmId, onClose, onAdded }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [type, setType] = useState("");
  const [stage, setStage] = useState("");
  const [breed, setBreed] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [selectedFarmId, setSelectedFarmId] = useState("");

  const [farmOptions, setFarmOptions] = useState([]);
  const [supportedLivestock, setSupportedLivestock] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingLivestock, setLoadingLivestock] = useState(true);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Resolve the selected livestock type from the fetched API payload
  const selectedLivestock = supportedLivestock.find(
    (animal) => (animal.type || animal.name || animal.specie) === type
  );

  // Get the stages for the selected livestock type
  const availableStages = selectedLivestock?.stages || [];

  const handleTypeChange = (selectedType) => {
    setType(selectedType);

    // Reset stage when livestock type changes
    setStage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFarmId = farmId || selectedFarmId;

    if (!finalFarmId) {
      setMessage("Please select a farm");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setIsSuccess(false);

      const response = await createLivestock({
        type,
        stage,
        breed,
        headcount: Number(headcount),
        farmId: finalFarmId,
      });

      setIsSuccess(true);
      setMessage("Livestock added successfully!");

      onAdded?.(response.data);

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to add livestock"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch supported livestock
  useEffect(() => {
    const fetchSupportedLivestock = async () => {
      setLoadingLivestock(true);

      try {
        const response = await getSupportedLivestock();

        console.log("Supported livestock fetched:", response.data);

        setSupportedLivestock(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to fetch supported livestock"
        );
      } finally {
        setLoadingLivestock(false);
      }
    };

    fetchSupportedLivestock();
  }, []);

  // Fetch farms when no farm is supplied
  useEffect(() => {
    if (farmId) return;

    const fetchFarms = async () => {
      try {
        const response = await getFarms();
        setFarmOptions(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to fetch farms"
        );
      }
    };

    fetchFarms();
  }, [farmId]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Livestock
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
              className={`border text-sm rounded-xl px-4 py-3 ${
                isSuccess
                  ? "bg-green-50 border-green-200 text-green-600"
                  : "bg-red-50 border-red-200 text-red-500"
              }`}
            >
              {message}
            </div>
          )}

          {/* Type */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Type
            </label>

            {loadingLivestock ? (
              <div className="grid grid-cols-4 gap-2 mt-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 py-3 rounded-lg border border-gray-100 animate-pulse"
                  >
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                    <div className="h-2.5 w-12 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 mt-1">
                {supportedLivestock.map((animal) => {
                  const animalLabel = animal.name || animal.type || animal.specie;

                  return (
                    <button
                      key={animal.id || animal._id || animalLabel}
                      type="button"
                      onClick={() => handleTypeChange(animalLabel)}
                      className={`flex flex-col items-center gap-1 py-2 rounded-lg border text-xs transition-colors ${
                        type === animalLabel
                          ? "border-amber-400 bg-amber-50 text-amber-700 font-medium"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <PawPrint size={16} />
                      {animalLabel}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stage */}
          {type && (
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Stage
              </label>

              {availableStages.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {availableStages.map((availableStage) => (
                    <button
                      key={availableStage}
                      type="button"
                      onClick={() => setStage(availableStage)}
                      className={`py-2 rounded-lg border text-xs transition-colors ${
                        stage === availableStage
                          ? "border-green-400 bg-green-50 text-green-700 font-medium"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {availableStage}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-2">
                  No stages available for this livestock type.
                </p>
              )}
            </div>
          )}

          {/* Breed */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Breed
            </label>

            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="e.g. Broiler, N'Dama, West African Dwarf"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Headcount */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Number of animals
            </label>

            <input
              type="number"
              min="1"
              value={headcount}
              onChange={(e) => setHeadcount(e.target.value)}
              placeholder="e.g. 25"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Farm */}
          {!farmId && (
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Farm
              </label>

              <select
                value={selectedFarmId}
                onChange={(e) =>
                  setSelectedFarmId(e.target.value)
                }
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
          )}

          {/* Photo */}
          <div className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 border-2 border-dashed border-gray-200 rounded-lg py-3 hover:border-green-300 hover:text-green-600 transition-colors cursor-pointer">
            <Camera size={16} />
            Add a photo (optional)
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                !type ||
                !stage ||
                !headcount ||
                (!selectedFarmId && !farmId) ||
                loading
              }
              className="flex-1 text-sm py-2.5 rounded-lg bg-amber-500 disabled:bg-gray-200 disabled:text-gray-400 text-white hover:bg-amber-600"
            >
              {loading ? "Adding..." : "Add Livestock"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddLivestockModal;
