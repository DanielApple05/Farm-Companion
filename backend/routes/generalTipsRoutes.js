const express = require("express");
const { getGeneralTips } = require("../controllers/generalTip-controller.js");
const router = express.Router();


router.get("/general", getGeneralTips);

module.exports = router;
