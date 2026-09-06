const { buildFarmerContext, formatContextForPrompt } = require("../services/farmerContextService");
const { askFarmAssistant } = require("../services/groqService");

const chatWithAssistant = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "question is required" });
    }

    const rawContext = await buildFarmerContext(req.user.id);
    const promptContext = formatContextForPrompt(rawContext);

    const answer = await askFarmAssistant(question, promptContext);

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Assistant failed to respond" });
  }
};

module.exports = { chatWithAssistant };