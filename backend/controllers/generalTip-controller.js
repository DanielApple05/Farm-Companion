const { generalFarmTips }  = require("../services/tipEngine.js");

const getGeneralTips = (req, res) => {
  try {
    const tips = getGeneralFarmManagementTips();

    res.status(200).json(tips);
  } catch (error) {
    console.error("Failed to get general farm tips:", error);

    res.status(500).json({
      message: "Failed to load farm knowledge",
    });
  }
};

module.exports = {
  getGeneralTips,
};