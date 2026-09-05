const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const explainDiagnosis = async (diseaseName, cropName, confidence) => {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `A farmer's ${cropName} crop has been diagnosed with "${diseaseName}" at ${confidence}% confidence. In plain, friendly language (2-3 short sentences), explain what this disease is, why it likely happened, and one clear next step the farmer should take. Avoid jargon.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

module.exports = { explainDiagnosis };