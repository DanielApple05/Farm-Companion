const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateFarmKnowledge = async (farmerContext) => {
  const prompt = `
You are Farm Companion, an AI assistant helping farmers manage their farms.

Generate FOUR short educational farm knowledge tip based on the farmer's current farm data.

The tip should:
- Be practical and useful to the farmer.
- Be relevant to the crops, livestock, or farm situation in the context.
- Be educational rather than an urgent warning.
- Be easy for a farmer to understand.
- Not invent facts about the farmer's farm.
- Not claim that something is happening unless the context supports it.
- Avoid diagnosing diseases.
- Avoid giving highly specific treatment instructions.
- Be no more than 2 sentences.

Farmer's current farm context:
${JSON.stringify(farmerContext, null, 2)}

Return ONLY valid JSON in this format:

{
  "title": "Short tip title",
  "tip": "The educational farm knowledge tip.",
  "category": "Crop Management"
}
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You generate concise, practical farm knowledge based only on the farmer context provided.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI did not return farm knowledge");
  }

  return JSON.parse(content);
};

module.exports = {
  generateFarmKnowledge,
};
