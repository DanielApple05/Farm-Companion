const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createFarm, getFarms } = require("../controllers/farm-controllers")

 
router.post("/", protect, createFarm);
router.get("/", protect, getFarms);
 
module.exports = router;