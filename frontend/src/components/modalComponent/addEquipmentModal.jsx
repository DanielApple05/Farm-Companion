import { useState, useEffect } from "react";
import { X, Wrench, Hash } from "lucide-react";
import { addEquipment } from "../../api/equipment";

const conditionOptions = ["Good", "Needs repair", "Broken"];

const AddEquipmentModal = ({ farmId, onClose, onAdded }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("Good");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await addEquipment(farmId, { name, quantity, condition });

      setIsSuccess(true);
      setMessage("Equipment added successfully!");
      onAdded?.(response.data); // let the parent (FarmDetail) update its list without a full refetch

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || error.message || "Failed to add equipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add Equipment</h2>
          <button onClick={ onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
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

          {/* Equipment name */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Equipment name</label>
            <div className="relative mt-1">
              <Wrench size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Knapsack Sprayer"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Quantity</label>
            <div className="relative mt-1">
              <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 2"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Condition</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {conditionOptions.map((option) => (
                <button
                  key={option._id}
                  type="button"
                  onClick={() => setCondition(option)}
                  className={`text-xs py-2 rounded-lg border transition-colors ${
                    condition === option
                      ? "border-green-400 bg-green-50 text-green-700 font-medium"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

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
              disabled={!name || !quantity || loading}
              className="flex-1 text-sm py-2.5 rounded-lg bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white hover:bg-green-700 transition-colors"
            >
              {loading ? "Adding..." : "Add Equipment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEquipmentModal;