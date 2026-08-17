import { useState, useEffect } from "react";
import { X, Sprout, Loader2 } from "lucide-react";

const HarvestModal = ({ crop, onClose, onHarvest }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("kg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid harvest amount.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await onHarvest({
        amount: Number(amount),
        unit,
      });

      onClose();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to record harvest."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Sprout size={18} className="text-green-600" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Harvest {crop?.name}
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                Record the amount you harvested.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">

          {/* Yield */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Harvest quantity
            </label>

            <p className="text-xs text-gray-400 mt-1">
              Enter the actual amount you harvested.
            </p>

            <div className="flex gap-2 mt-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 120"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
              />

              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-24 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                <option value="kg">kg</option>
                <option value="tons">tons</option>
                <option value="bags">bags</option>
              </select>
            </div>
          </div>

          {/* Information */}
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-green-700 leading-relaxed">
              Once recorded, this crop will be marked as harvested and
              added to your harvest records.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 rounded-lg px-3 py-2 text-xs">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white text-sm py-2.5 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300"
            >
              {loading && (
                <Loader2 size={15} className="animate-spin" />
              )}

              {loading ? "Recording..." : "Record Harvest"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default HarvestModal;