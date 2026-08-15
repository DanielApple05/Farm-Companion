import { useState, useEffect } from "react";
import { X, MapPin, Camera, Loader2 } from "lucide-react";
import { addFarm } from "../api/farm";

// Temporary default.
// Later this can come from the user's profile/location service.
const detectedLocation = "Port Harcourt, Rivers State";

const AddFarmModal = ({ onClose, onAdded }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [name, setName] = useState("");
  const [location, setLocation] = useState(detectedLocation);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim()) {
      setMessage("Farm name and location are required.");
      setIsSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setIsSuccess(false);

      const response = await addFarm({
        name: name.trim(),
        location: location.trim(),
      });

      setIsSuccess(true);
      setMessage("Farm created successfully!");

      onAdded?.(response.data);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setIsSuccess(false);
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to create farm"
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
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Add Farm
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Create your farm and add crops or livestock afterwards.
            </p>
          </div>

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
              className={`w-full border text-sm rounded-xl px-4 py-3 ${
                isSuccess
                  ? "bg-green-50 border-green-200 text-green-600"
                  : "bg-red-50 border-red-200 text-red-500"
              }`}
            >
              {message}
            </div>
          )}

          {/* Farm name */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Farm name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AgriFarm"
              disabled={loading}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-200 disabled:bg-gray-50"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Location
            </label>

            <div className="relative mt-1">
              <MapPin
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={loading}
                className="w-full pl-9 pr-3 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 disabled:bg-gray-50"
              />
            </div>

            <p className="text-xs text-gray-400 mt-1">
              You can change this if the farm is located elsewhere.
            </p>
          </div>

          {/* What happens next */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
            <p className="text-sm font-medium text-gray-800">
              What's next?
            </p>

            <div className="mt-3 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-medium">
                  1
                </span>
                Create your farm
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-medium">
                  2
                </span>
                Add supported crops
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-medium">
                  3
                </span>
                Add livestock and select their stage
              </div>
            </div>
          </div>

          {/* Optional photo */}
          <button
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 border-2 border-dashed border-gray-200 rounded-lg py-3 hover:border-green-300 hover:text-green-600 transition-colors disabled:opacity-50"
          >
            <Camera size={16} />
            Add a photo (optional)
          </button>

          {/* Actions */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 text-sm py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim() || !location.trim() || loading}
              className="flex-1 flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white hover:bg-green-700 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Farm"
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFarmModal;
