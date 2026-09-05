// services/farmerContextService.js
const Farm = require("../models/Farm");

const buildFarmerContext = async (userId) => {
  const farms = await Farm.find({ owner: userId }).populate("crops").populate("livestock");

  const summary = farms.map((farm) => {
    const cropSummary = farm.crops.map((c) =>
      `${c.name} (${c.stage}, planted ${new Date(c.plantedOn).toLocaleDateString()}${c.status === "Flagged" ? ", currently flagged for disease" : ""})`
    ).join("; ");

    const livestockSummary = farm.livestock.map((l) =>
      `${l.headcount} ${l.type} (${l.breed || "breed unspecified"}, status: ${l.status})`
    ).join("; ");

    return `Farm "${farm.name}" in ${farm.location}: Crops — ${cropSummary || "none"}. Livestock — ${livestockSummary || "none"}.`;
  }).join("\n");

  return summary || "This farmer hasn't added any farms yet.";
};

module.exports = { buildFarmerContext };