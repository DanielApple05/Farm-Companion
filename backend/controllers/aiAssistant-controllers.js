const { buildFarmerContext } = require("../services/farmerContextService");
const { askFarmAssistant } = require("../services/groqService");

const chatWithAssistant = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "question is required" });

    // Critical: only ever build context from the LOGGED-IN user's own data
    const farmerContext = await buildFarmerContext(req.user.id);

    const answer = await askFarmAssistant(question, farmerContext);

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Assistant failed to respond" });
  }
};

module.exports = { chatWithAssistant };