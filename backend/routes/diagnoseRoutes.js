// routes/diagnoseRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { diagnoseCrop } = require("../controllers/diagnose-controllers");

router.post("/", protect, upload.single("image"), diagnoseCrop);

module.exports = router;
