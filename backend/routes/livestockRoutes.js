const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createLivestock,
  getLivestock,
  getLivestockById,
  updateLivestock,
  addVaccination,
  addHealthLog,
  deleteLivestock,
  getSupportedLivestock,
} = require("../controllers/livestock-controllers");

router.post("/", protect, createLivestock);
router.get("/", protect, getLivestock);
router.get("/supported", protect, getSupportedLivestock);
router.get("/:id", protect, getLivestockById);
router.put("/:id", protect, updateLivestock);
router.post("/:id/vaccinations", protect, addVaccination);
router.post("/:id/health-logs", protect, addHealthLog);
router.delete("/:id", protect, deleteLivestock);

module.exports = router;
