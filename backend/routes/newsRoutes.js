const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getAgricultureNews } = require("../controllers/news-controllers");
 
// Not user-specific data, but kept behind `protect` so only logged-in users
// (and your own quota) can trigger calls to your NewsData.io key.
router.get("/agriculture", protect, getAgricultureNews);
 
module.exports = router;