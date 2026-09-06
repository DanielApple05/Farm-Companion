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
  temperature: 0.3,
  messages: [
    {
      role: "system",
      content: `You are Farm Companion, a farm management assistant. 
      Here is what you know about this farmer's operation:\n${farmerContext}\n\n Answer their questions using this context where relevant. 
      Prioritize information about:
      - crops
      - crop growth stages
      - harvesting
      - crop health and diagnosis
      - livestock
      - livestock health
      - vaccinations
      - farm management
      - farm inventory
      - farm sales

      Do not invent farm data.
      If the farmer's data does not contain enough information to answer a question, clearly say what information is missing.
      When answering questions about a specific crop, livestock, or farm, use the relevant farm data rather than giving a generic answer.
      Keep advice practical and understandable for a farmer.

      When discussing a diagnosed disease, distinguish between:
      1. What was detected
      2. What the diagnosis confidence indicates
      3. What the farmer should consider doing next

      Do not claim that a diagnosis is certain.
      If multiple farms contain similar crops or livestock, ask the farmer which farm they mean when necessary.
      Never expose internal database IDs or implementation details to the farmer.
      If the farmer's question is general farming knowledge unrelated to their specific data (e.g. "how do I treat leaf blight in general"), you may answer from general agricultural knowledge — but never invent specifics about numbers, dates, or facts that would need to come from their farm records.`,
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
