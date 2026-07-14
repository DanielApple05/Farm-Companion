const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addSale, getSales, updateSale, deleteSale } = require("../controllers/sale-controllers");

router.post("/", protect, addSale);
router.get("/", protect, getSales); // expects ?farmId=... query param
router.put("/:id", protect, updateSale);
router.delete("/:id", protect, deleteSale);

module.exports = router;