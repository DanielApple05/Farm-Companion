const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createFarm } = require("../controllers/farm-controllers")

 
router.post("/", protect, createFarm);
 
module.exports = router;