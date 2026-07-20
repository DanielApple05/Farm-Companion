import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

// Generic delete button with a two-step confirm — first click asks "are you sure?",
// second click (within a few seconds) actually deletes. Avoids a full modal for
// something this small, while still preventing accidental single-click deletes.
const DeleteButton = ({ onDelete, label = "Delete", confirmLabel = "Confirm delete?" }) => {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!confirming) {
      setConfirming(true);
      // auto-reset the confirm state after 3 seconds if they don't follow through
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    try {
      setLoading(true);
      await onDelete();
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition-colors ${
        confirming
          ? "border-red-400 bg-red-50 text-red-700 font-medium"
          : "border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600"
      }`}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
      {loading ? "Deleting..." : confirming ? confirmLabel : label}
    </button>
  );
};

export default DeleteButton;