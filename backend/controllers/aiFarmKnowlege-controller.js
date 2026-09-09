const { generateFarmKnowledge } = require("../services/aiFarmKnowledgeServices");

const getFarmKnowledge = async (req, res) => {
  try {
    const farmerContext = {
      farms: req.user.farms,
      crops: req.user.crops,
      livestock: req.user.livestock,
    };

    const knowledge = await generateFarmKnowledge(farmerContext);

    res.status(200).json({
      success: true,
      data: knowledge,
    });
  } catch (error) {
    console.error("Farm knowledge error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate farm knowledge",
    });
  }
};

module.exports = {
  getFarmKnowledge,
};