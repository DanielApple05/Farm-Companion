// const Anthropic = require("@anthropic-ai/sdk");
// const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// const explainDiagnosis = async (diseaseName, cropName, confidence) => {
//   const message = await anthropic.messages.create({
//     model: "claude-sonnet-4-6",
//     max_tokens: 300,
//     messages: [
//       {
//         role: "user",
//         content: `A farmer's ${cropName} crop has been diagnosed with "${diseaseName}" at ${confidence}% confidence. In plain, friendly language (2-3 short sentences), explain what this disease is, why it likely happened, and one clear next step the farmer should take. Avoid jargon.`,
//       },
//     ],
//   });

//   return message.content[0].text;
// };