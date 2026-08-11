const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createCrop,
  getCrops,
  getCropById,
  updateCrop,
  deleteCrop,
  getSupportedCrops,
  harvestCrop,
} = require("../controllers/crop-controllers");
 
router.post("/", protect, createCrop);
router.get("/", protect, getCrops);
router.get("/supported", protect, getSupportedCrops);
router.get("/:id", protect, getCropById);
router.put("/:id", protect, updateCrop);
router.delete("/:id", protect, deleteCrop);
router.patch("/:id/harvest", protect, harvestCrop);
 
module.exports = router;
