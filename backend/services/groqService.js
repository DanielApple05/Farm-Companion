// services/groqService.js
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const explainDiagnosis = async (diseaseName, cropName, confidence) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `A farmer's ${cropName} crop has been diagnosed with "${diseaseName}" at ${confidence}% confidence. In plain, friendly language (2-3 short sentences), explain what this disease is, why it likely happened, and one clear next step the farmer should take. Avoid jargon.`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

module.exports = { explainDiagnosis };