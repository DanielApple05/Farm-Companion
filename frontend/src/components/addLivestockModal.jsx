import { useState } from "react";
import { X, PawPrint, Hash, Camera } from "lucide-react";

// Dummy — swap for real farms list from API/DB later
const farmOptions = [
  { id: 1, name: "Rumuokoro Farm" },
  { id: 2, name: "Omuahia Farm" },
  { id: 3, name: "Elele Farm" },
];

const livestockTypes = ["Poultry", "Goats", "Cattle", "Sheep"];

const AddLivestockModal = ({ onClose }) => {
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [farmId, setFarmId] = useState("");

  // Placeholder — wire up real submit logic later
  const handleSubmit = () => {
    console.log({ type, breed, headcount, farmId });
    onClose?.();
  };

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

        {/* Livestock type */}
        <div>
          <label className="text-sm text-gray-700 font-medium">Type</label>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {livestockTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex flex-col items-center gap-1 py-2 rounded-lg border text-xs transition-colors ${
                  type === t
                    ? "border-amber-400 bg-amber-50 text-amber-700 font-medium"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <PawPrint size={16} />
                {t}
              </button>
            ))}
          </div>
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
        <div>
          <label className="text-sm text-gray-700 font-medium">Farm</label>
          <select
            value={farmId}
            onChange={(e) => setFarmId(e.target.value)}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select a farm</option>
            {farmOptions.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        {/* Optional photo */}
        <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 border-2 border-dashed border-gray-200 rounded-lg py-3 hover:border-green-300 hover:text-green-600 transition-colors">
          <Camera size={16} />
          Add a photo (optional)
        </button>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 text-sm py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!type || !headcount || !farmId}
            className="flex-1 text-sm py-2.5 rounded-lg bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white hover:bg-green-700 transition-colors"
          >
            Add Livestock
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLivestockModal;
