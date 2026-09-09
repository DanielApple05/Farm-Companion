const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateFarmKnowledge = async (farmerContext) => {
  const prompt = `
You are Farm Companion, an AI assistant helping farmers manage their farms.

Generate FOUR short educational farm knowledge tips based on the farmer's current farm data.

The four tips should cover DIFFERENT areas of farm management:

1. Crop Management
   - Relevant to crops the farmer currently has.
   - Consider the crop's current growth stage when available.

2. Livestock
   - Provide practical livestock knowledge if the farmer has livestock.
   - If the farmer has no livestock, provide general livestock education instead.
   - Do not pretend the farmer owns livestock if they do not.

3. Farm Management
   - General practical knowledge about managing a farm.
   - Examples include record keeping, soil care, farm planning, equipment maintenance,
     harvesting, storage, or farm hygiene.

4. Weather
   - Give ONE weather-related farming tip.
   - ONLY use weather information provided in the context.
   - Do not invent weather conditions or forecasts.
   - Explain how the provided weather may affect farming activities when appropriate.

Rules:
- Be practical and useful.
- Be educational rather than an urgent warning.
- Be easy for a farmer to understand.
- Do not invent facts about the farmer's farm.
- Do not claim that something is happening unless the context supports it.
- Avoid diagnosing diseases.
- Avoid highly specific treatment instructions.
- Each tip must be no more than 2 sentences.
- Each tip must have a different category.
- Do not repeat the same advice in multiple tips.

Farmer's current farm context:
${JSON.stringify(farmerContext, null, 2)}

Return ONLY valid JSON in this format:

{
  "tips": [
    {
      "title": "Short tip title",
      "tip": "The educational farm knowledge tip.",
      "category": "Crop Management"
    },
    {
      "title": "Short tip title",
      "tip": "The educational farm knowledge tip.",
      "category": "Livestock"
    },
    {
      "title": "Short tip title",
      "tip": "The educational farm knowledge tip.",
      "category": "Farm Management"
    },
    {
      "title": "Short tip title",
      "tip": "The educational farm knowledge tip.",
      "category": "Weather"
    }
  ]
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
