const Expense = require("../models/Expense");
const Farm = require("../models/Farm");

// POST /api/expenses
const addExpense = async (req, res) => {
  const { description, amount, date, category, farmId, cropId, livestockId } = req.body;

  try {
    if (!description || !amount || !farmId) {
      return res.status(400).json({ message: "description, amount, and farmId are required" });
    }

    // Confirm the farm exists AND belongs to the logged-in user
    const farm = await Farm.findOne({ _id: farmId, owner: req.user.id });
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    const expense = await Expense.create({
      description,
      amount,
      date,
      category,
      farm: farmId,
      crop: cropId || null,
      livestock: livestockId || null,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/expenses?farmId=...
// Scoped to one farm at a time, per your "per-farm first" decision
const getExpenses = async (req, res) => {
  const { farmId } = req.query;

  try {
    if (!farmId) {
      return res.status(400).json({ message: "farmId query param is required" });
    }

    // Confirm the farm belongs to the logged-in user before returning its expenses
    const farm = await Farm.findOne({ _id: farmId, owner: req.user.id });
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    const expenses = await Expense.find({ farm: farmId })
      .populate("crop", "name")
      .populate("livestock", "type")
      .sort({ date: -1 });

    // Handy for the "how much did I spend this season" summary card
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.json({ expenses, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate("farm", "owner");

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if (expense.farm.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this expense" });
    }

    const { description, amount, date, category } = req.body;
    if (description) expense.description = description;
    if (amount) expense.amount = amount;
    if (date) expense.date = date;
    if (category) expense.category = category;

    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate("farm", "owner");

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if (expense.farm.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this expense" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };