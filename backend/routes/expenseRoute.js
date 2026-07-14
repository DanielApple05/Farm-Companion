const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addExpense, getExpenses, updateExpense, deleteExpense } = require("../controllers/expense-controllers");

router.post("/", protect, addExpense);
router.get("/", protect, getExpenses); // expects ?farmId=... query param
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;