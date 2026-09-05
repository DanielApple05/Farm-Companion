const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const explainDiagnosis = async (diseaseName, cropName, confidence) => {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: `A farmer's ${cropName} crop has been diagnosed with "${diseaseName}" at ${confidence}% confidence. In plain, friendly language (2-3 short sentences), explain what this disease is, why it likely happened, and one clear next step the farmer should take. Avoid jargon.`,
      },
    ],
  });

  return completion.choices[0].message.content;
};


const askFarmAssistant = async (userQuestion, farmerContext) => {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `You are a helpful farm assistant. Here is what you know about this farmer's operation:\n${farmerContext}\n\nAnswer their questions using this context where relevant. If their question isn't related to their farm data, just answer normally.`,
      },
      {
        role: "user",
        content: userQuestion,
      },
    ],
  });

  return completion.choices[0].message.content;
};

module.exports = { explainDiagnosis, askFarmAssistant };