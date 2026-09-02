const Sale = require("../models/Sale");
const Farm = require("../models/Farm");
const Livestock = require("../models/Livestock");
const Crop = require("../models/Crop");

// POST /api/sales
const addSale = async (req, res) => {
  const {
    farmId,
    itemType,
    itemId,
    quantity,
    unit,
    buyer,
    amount,
    amountPaid,
    date,
  } = req.body;

  try {
    const qty = Number(quantity);
    const totalAmount = Number(amount);
    const paidAmount = Number(amountPaid) || 0;

    if (
      !farmId ||
      !itemType ||
      !itemId ||
      !Number.isFinite(qty) ||
      qty <= 0 ||
      !unit ||
      !buyer?.trim() ||
      !Number.isFinite(totalAmount) ||
      totalAmount < 0
    ) {
      return res.status(400).json({
        message:
          "farmId, itemType, itemId, quantity, unit, buyer, and amount are required",
      });
    }

    if (!["crop", "livestock"].includes(itemType)) {
      return res.status(400).json({
        message: "itemType must be either crop or livestock",
      });
    }

    const farm = await Farm.findOne({
      _id: farmId,
      owner: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({
        message: "Farm not found",
      });
    }

    let item;
    let availableQuantity = 0;
    let itemLabel = "item";

    // =========================
    // CROP SALE
    // =========================

    if (itemType === "crop") {
      item = await Crop.findOne({
        _id: itemId,
        farm: farmId,
      });

      if (!item) {
        return res.status(404).json({
          message: "Crop not found on this farm",
        });
      }

      // Your current Crop schema uses harvestedOn
      if (!item.harvestedOn) {
        return res.status(400).json({
          message: "This crop has not been harvested yet",
        });
      }

      // Use the virtual from the Crop schema
      availableQuantity = Number(item.availableForSale ?? 0);

      itemLabel = item.name;

      // Make sure sale unit matches crop yield unit
      if (unit !== item.yield?.unit) {
        return res.status(400).json({
          message: `This crop is measured in ${item.yield?.unit}`,
        });
      }

      if (qty > availableQuantity) {
        return res.status(400).json({
          message: `Only ${availableQuantity} ${unit} of this crop is available for sale`,
        });
      }

      // Update sold quantity
      item.quantitySold += qty;

      await item.save();
    }

    // =========================
    // LIVESTOCK SALE
    // =========================

    if (itemType === "livestock") {
      item = await Livestock.findOne({
        _id: itemId,
        farm: farmId,
      });

      if (!item) {
        return res.status(404).json({
          message: "Livestock not found on this farm",
        });
      }

      availableQuantity = Number(item.headcount || 0);
      itemLabel = item.type;

      if (qty > availableQuantity) {
        return res.status(400).json({
          message: `Only ${availableQuantity} animals are available`,
        });
      }

      // Reduce the current livestock inventory
      item.headcount -= qty;

      await item.save();
    }

    // =========================
    // CREATE SALE
    // =========================

    const sale = await Sale.create({
      farm: farmId,

      description: `${qty} ${unit} of ${itemLabel} sold to ${buyer.trim()}`,

      buyer: buyer.trim(),

      amount: totalAmount,

      amountPaid: paidAmount,

      date: date || new Date(),

      ...(itemType === "crop" ? { crop: itemId } : { livestock: itemId }),

      quantitySold: qty,

      unit,
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error("Add sale error:", error);

    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

// GET /api/sales?farmId=...
const getSales = async (req, res) => {
  const { farmId } = req.query;

  try {
    if (!farmId) {
      return res
        .status(400)
        .json({ message: "farmId query param is required" });
    }

    const farm = await Farm.findOne({ _id: farmId, owner: req.user.id });
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    const sales = await Sale.find({ farm: farmId })
      .populate("crop", "name")
      .populate("livestock", "type")
      .sort({ date: -1 });

    // Summary figures for the overview card —
    // amountOwed here comes from each sale's virtual, already calculated fresh
    const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);
    const totalPaid = sales.reduce((sum, s) => sum + s.amountPaid, 0);
    const totalOwed = sales.reduce((sum, s) => sum + s.amountOwed, 0);

    res.json({ sales, totalSales, totalPaid, totalOwed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/sales/:id
// Also the endpoint used to record a partial/full payment against amountPaid
const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate("farm", "owner");

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    if (sale.farm.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this sale" });
    }

    const { description, buyer, amount, amountPaid, date } = req.body;
    if (description) sale.description = description;
    if (buyer) sale.buyer = buyer;
    if (amount !== undefined) sale.amount = amount;
    if (amountPaid !== undefined) sale.amountPaid = amountPaid;
    if (date) sale.date = date;

    await sale.save();
    res.json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/sales/:id
const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate("farm", "owner");

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    if (sale.farm.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this sale" });
    }

    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addSale, getSales, updateSale, deleteSale };
