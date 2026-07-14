const Sale = require("../models/Sale");
const Farm = require("../models/Farm");

// POST /api/sales
const addSale = async (req, res) => {
  const { description, buyer, amount, amountPaid, date, farmId, cropId, livestockId } = req.body;

  try {
    if (!description || !buyer || !amount || !farmId) {
      return res.status(400).json({ message: "description, buyer, amount, and farmId are required" });
    }

    const farm = await Farm.findOne({ _id: farmId, owner: req.user.id });
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    const sale = await Sale.create({
      description,
      buyer,
      amount,
      amountPaid: amountPaid || 0,
      date,
      farm: farmId,
      crop: cropId || null,
      livestock: livestockId || null,
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/sales?farmId=...
const getSales = async (req, res) => {
  const { farmId } = req.query;

  try {
    if (!farmId) {
      return res.status(400).json({ message: "farmId query param is required" });
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
      return res.status(403).json({ message: "Not authorized to update this sale" });
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
      return res.status(403).json({ message: "Not authorized to delete this sale" });
    }

    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}; 

module.exports = { addSale, getSales, updateSale, deleteSale };