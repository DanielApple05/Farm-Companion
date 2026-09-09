const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");


const {
  getFarmKnowledge,
} = require("../controllers/aiFarmKnowlege-controller");

router.get("/", protect, getFarmKnowledge);

module.exports = router;