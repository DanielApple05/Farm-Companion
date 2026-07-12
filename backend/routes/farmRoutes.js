const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createFarm, getFarms, addEquipment, deleteEquipment, getFarmById } = require("../controllers/farm-controllers")

 
router.post("/", protect, createFarm);
router.get("/", protect, getFarms);
router.get("/:farmId", protect, getFarmById);
router.post("/:farmId/equipment", protect, addEquipment);
router.delete("/:farmId/equipment/:equipmentId", protect, deleteEquipment);
 
module.exports = router;