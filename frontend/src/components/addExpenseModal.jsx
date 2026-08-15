import { useState, useEffect } from "react";
import { X, Wallet, Calendar } from "lucide-react";
import { addExpense } from "../api/finances";

const categoryOptions = ["Seeds", "Fertilizer", "Labor", "Equipment", "Veterinary", "Other"];

const AddExpenseModal = ({ farmId, onClose, onAdded }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Other");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await addExpense({ description, amount, date, category, farmId });

      setIsSuccess(true);
      setMessage("Expense added!");
      onAdded?.(response.data);

      setTimeout(() => onClose(), 1000);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add Expense</h2>
          <div onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </div>
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

          <div>
            <label className="text-sm text-gray-700 font-medium">What was it for?</label>
            <div className="relative mt-1">
              <Wallet size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. NPK fertilizer"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Amount (₦)</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 15000"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Date</label>
            <div className="relative mt-1">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">Category</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {categoryOptions.map((option) => (
                <div
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  className={`text-xs py-2 rounded-lg border transition-colors ${
                    category === option
                      ? "border-green-400 bg-green-50 text-green-700 font-medium"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <div
              type="button"
              onClick={onClose}
              className="flex-1 text-sm py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </div>
            <button
              type="submit"
              disabled={!description || !amount || !date || loading}
              className="flex-1 text-sm py-2.5 rounded-lg bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white hover:bg-green-700 transition-colors"
            >
              {loading ? "Adding..." : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;