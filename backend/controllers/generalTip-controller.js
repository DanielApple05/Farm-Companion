const { generalFarmTips }  = require("../knowledge/general/farm-management.js");

const getGeneralTips = (req, res) => {
  res.status(200).json(generalFarmTips);
};

module.exports = {
  getGeneralTips,
};