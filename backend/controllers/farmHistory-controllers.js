const Farm = require("../models/Farm");
const FarmHistory = require("../models/FarmHistory");
const { isOwnerMatch } = require("../utils/ownership");

const getFarmHistory = async (req, res) => {
  try {
    const { farmId } = req.params;

    // Find the farm first so we can verify ownership
    const farm = await Farm.findById(farmId);

    if (!farm) {
      return res.status(404).json({
        message: "Farm not found",
      });
    }

    // Make sure this history belongs to the logged-in farmer
    if (!isOwnerMatch(farm.owner, req.user.id)) {
      return res.status(403).json({
        message: "Not authorized to view this farm history",
      });
    }

    const history = await FarmHistory.find({
      farm: farmId,
    })
      .populate("crop", "name")
      .populate("livestock", "type")
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error("Failed to fetch farm history:", error);

    res.status(500).json({
      message: "Failed to fetch farm history",
    });
  }
};

module.exports = {
  getFarmHistory,
};