const { generalFarmTips }  = require("../services/tipEngine.js");

const getGeneralTips = (req, res) => {
  getGeneralFarmManagementTips(res);
};

module.exports = {
  getGeneralTips,
};