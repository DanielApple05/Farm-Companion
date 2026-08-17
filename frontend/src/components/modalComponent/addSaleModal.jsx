import { useEffect, useMemo, useState } from "react";
import {
  X,
  Sprout,
  User,
  Calendar,
  PawPrint,
} from "lucide-react";
import { addSale } from "../../api/finances";

const AddSaleModal = ({
  farmId,
  crops,
  livestock,
  onClose,
  onAdded,
}) => {
  const [saleType, setSaleType] = useState("crop");
  const [selectedItem, setSelectedItem] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [buyer, setBuyer] = useState("");
  const [amount, setAmount] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /*
   * Only show crops that are actually harvested.
   *
   * Adjust the harvested check if your Crop model uses
   * a different field.
   */
  const harvestedCrops = useMemo(() => {
    return (crops || []).filter((crop) => {
      const isHarvested =
        crop.harvested === true ||
        Boolean(crop.harvestedOn) ||
        crop.status === "Harvested" ||
        crop.growth === "Harvested";

      const availableAmount = Number(
        crop.yield?.amount ??
        crop.quantity ??
        crop.harvest?.quantity ??
        0
      );

      return isHarvested && availableAmount > 0;
    });
  }, [crops]);

  /*
   * Livestock available from the farm.
   * The farm stores livestock counts as headcount, not quantity/availableLivestock.
   */
  const availableLivestock = useMemo(() => {
    return (livestock || []).filter((animal) => {
      const availableCount = Number(
        animal.headcount ??
        animal.quantity ??
        animal.availableQuantity ??
        0
      );

      return availableCount > 0 &&
        (animal.availableForSale !== false);
    });
  }, [livestock]);

  const items =
    saleType === "crop"
      ? harvestedCrops
      : availableLivestock;

  const selectedItemData = items.find(
    (item) => item._id === selectedItem
  );

  const availableQuantity =
    selectedItemData?.availableQuantity ??
    selectedItemData?.quantity ??
    selectedItemData?.yield?.amount ??
    selectedItemData?.headcount ??
    selectedItemData?.harvest?.quantity ??
    0;

  const unit =
    selectedItemData?.unit ??
    (saleType === "crop" ? "kg" : "animals");

  const quantityNumber = Number(quantitySold) || 0;

  const remainingQuantity = Math.max(
    availableQuantity - quantityNumber,
    0
  );

  const handleSaleTypeChange = (type) => {
    setSaleType(type);
    setSelectedItem("");
    setQuantitySold("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItemData) {
      setIsSuccess(false);
      setMessage("Please select an item.");
      return;
    }

    if (quantityNumber <= 0) {
      setIsSuccess(false);
      setMessage("Enter a valid quantity.");
      return;
    }

    if (quantityNumber > availableQuantity) {
      setIsSuccess(false);
      setMessage(
        `Only ${availableQuantity} ${unit} available.`
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await addSale({
        farmId,
        itemType: saleType,
        itemId: selectedItemData._id,
        quantity: quantityNumber,
        unit,
        buyer,
        amount: Number(amount),
        amountPaid: Number(amountPaid) || 0,
        date,
      });

      setIsSuccess(true);
      setMessage("Sale recorded successfully!");

      onAdded?.(response.data);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setIsSuccess(false);

      setMessage(
        error.response?.data?.message ||
        "Failed to record sale"
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    farmId &&
    selectedItem &&
    quantityNumber > 0 &&
    quantityNumber <= availableQuantity &&
    buyer.trim() &&
    amount &&
    date;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Record Sale
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Record something sold from your farm.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-4"
        >
          {/* Message */}
          {message && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${isSuccess
                  ? "bg-green-50 border-green-200 text-green-600"
                  : "bg-red-50 border-red-200 text-red-500"
                }`}
            >
              {message}
            </div>
          )}

          {/* Sale type */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              What are you selling?
            </label>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  handleSaleTypeChange("crop")
                }
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-base ${saleType === "crop"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600"
                  }`}
              >
                <Sprout size={17} />
                Crops
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSaleTypeChange("livestock")
                }
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-base ${saleType === "livestock"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600"
                  }`}
              >
                <PawPrint size={17} />
                Livestock
              </button>
            </div>
          </div>

          {/* Item */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              {saleType === "crop"
                ? "Harvested crop"
                : "Livestock"}
            </label>

            <select
              value={selectedItem}
              onChange={(e) => {
                setSelectedItem(e.target.value);
                setQuantitySold("");
                setMessage("");
              }}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-700 outline-none focus:ring-2 focus:ring-green-200"
            >
              <option value="">
                Select{" "}
                {saleType === "crop"
                  ? "harvested crop"
                  : "livestock"}
              </option>

              {items.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name || item.breed }
                </option>
              ))}
            </select>

            {items.length === 0 && (
              <p className="mt-2 text-sm text-gray-400">
                {saleType === "crop"
                  ? "You don't have any harvested crops available for sale."
                  : "You don't have any livestock available for sale."}
              </p>
            )}
          </div>

          {/* Selected item info */}
          {selectedItemData && (
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-sm font-medium text-gray-900">
                {selectedItemData.name}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Available:{" "}
                <span className="font-medium text-gray-700">
                  {availableQuantity} {unit}
                </span>
              </p>

              {quantityNumber > 0 &&
                quantityNumber <= availableQuantity && (
                  <p className="mt-1 text-sm text-green-600">
                    Remaining after sale:{" "}
                    {remainingQuantity} {unit}
                  </p>
                )}
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Quantity sold
            </label>

            <input
              type="number"
              min="1"
              max={availableQuantity}
              value={quantitySold}
              onChange={(e) =>
                setQuantitySold(e.target.value)
              }
              disabled={!selectedItemData}
              placeholder={
                selectedItemData
                  ? `Maximum ${availableQuantity}`
                  : "Select an item first"
              }
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-green-200 disabled:bg-gray-50"
            />
          </div>

          {/* Buyer */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Buyer
            </label>

            <div className="relative mt-1">
              <User
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={buyer}
                onChange={(e) =>
                  setBuyer(e.target.value)
                }
                placeholder="e.g. Chidi Okafor"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 pl-9 text-base outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Total (₦)
              </label>

              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="50000"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Paid so far (₦)
              </label>

              <input
                type="number"
                min="0"
                value={amountPaid}
                onChange={(e) =>
                  setAmountPaid(e.target.value)
                }
                placeholder="0"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Sale date
            </label>

            <div className="relative mt-1">
              <Calendar
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 pl-9 text-base outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="flex-1 rounded-xl bg-green-600 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400"
            >
              {loading
                ? "Saving..."
                : "Record Sale"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSaleModal;