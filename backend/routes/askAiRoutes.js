const express = require("express");
const router = express.Router();
const { chatWithAssistant } = require("../controllers/aiAssistant-controllers");


router.post("/chat", chatWithAssistant);

module.exports = router;