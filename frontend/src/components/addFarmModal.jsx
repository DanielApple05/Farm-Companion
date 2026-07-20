import { useState } from "react";
import { X, MapPin, Sprout, PawPrint, Camera } from "lucide-react";
import { addFarm } from "../api/farm";

// Dummy: pretend this came from the user's profile, captured at signup/login
const detectedLocation = "Port Harcourt, Rivers State";

const AddFarmModal = ({ onClose, onAdded }) => {
  const [type, setType] = useState("crop"); // "crop" | "livestock"
  const [name, setName] = useState("");
  const [location, setLocation] = useState(detectedLocation);
  const [firstEntry, setFirstEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Placeholder — wire up real submit logic later
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await addFarm({ name, location, type });
      setIsSuccess(true);
      setMessage("Farm added successfully!");
      onAdded?.(res.data);
      setTimeout(() => {
        onClose();
      }, 1200);

    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Can't add farm");

    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add Farm</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X
              size={20} />
          </button>
        </div>

        {/* Farm type toggle */}
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
          <div className="grid grid-cols-2 gap-2 bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => setType("crop")}
              className={`flex items-center justify-center gap-2 text-sm py-2 rounded-md transition-colors ${type === "crop" ? "bg-white shadow text-green-700 font-medium" : "text-gray-500"
                }`}
            >
              <Sprout size={16} />
              Crop
            </button>
            <button
              onClick={() => setType("livestock")}
              className={`flex items-center justify-center gap-2 text-sm py-2 rounded-md transition-colors ${type === "livestock" ? "bg-white shadow text-amber-700 font-medium" : "text-gray-500"
                }`}
            >
              <PawPrint size={16} />
              Livestock
            </button>
          </div>

          {/* Farm name */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Farm name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rumuokoro Farm"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Location — auto-filled, still editable */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Location</label>
            <div className="relative mt-1">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Detected from your account — edit if this farm is elsewhere.</p>
          </div>

          {/* First entry — label + placeholder swap based on farmType */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              {type === "crop" ? "First crop to add" : "First livestock group to add"}
            </label>
            <input
              type="text"
              value={firstEntry}
              onChange={(e) => setFirstEntry(e.target.value)}
              placeholder={type === "crop" ? "e.g. Maize" : "e.g. Goats"}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            />
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
              type='Submit'
              disabled={!name || !location || loading}
              className="flex-1 text-sm py-2.5 rounded-lg bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white hover:bg-green-700 transition-colors"
            >
              Create Farm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFarmModal;
