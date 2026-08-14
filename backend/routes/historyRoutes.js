const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getFarmHistory } = require("../controllers/farmHistory-controllers");

router.get("/:id/history", protect, getFarmHistory);

module.exports = router;
