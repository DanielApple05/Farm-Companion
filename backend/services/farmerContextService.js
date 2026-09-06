// services/farmerContextService.js
// services/farmerContextService.js
const Farm = require("../models/Farm");

const buildFarmerContext = async (userId) => {
  const farms = await Farm.find({ owner: userId })
    .populate("crops")
    .populate("livestock");

  if (!farms.length) {
    return {
      farmerHasFarms: false,
      farms: [],
    };
  }

  return {
    farmerHasFarms: true,

    farms: farms.map((farm) => ({
      name: farm.name,
      location: farm.location,
      type: farm.type,

      size: farm.size
        ? {
            value: farm.size.value,
            unit: farm.size.unit,
          }
        : null,

      crops: (farm.crops || []).map((crop) => ({
        name: crop.name,

        plantedOn: crop.plantedOn
          ? new Date(crop.plantedOn).toISOString().split("T")[0]
          : null,

        stage: crop.stage || null,

        percentComplete: crop.percentComplete ?? null,

        isOverdue: crop.isOverdue ?? false,

        harvestedOn: crop.harvestedOn
          ? new Date(crop.harvestedOn).toISOString().split("T")[0]
          : null,

        isHarvested: Boolean(crop.harvestedOn),

        status: crop.status || "Unknown",

        yield: crop.yield?.amount
          ? {
              amount: crop.yield.amount,
              unit: crop.yield.unit || "kg",
            }
          : null,

        quantitySold: crop.quantitySold || 0,

        availableForSale: crop.availableForSale ?? null,

        isSold: crop.isSold ?? false,

        diagnosis: crop.diagnosisLogs?.length
          ? {
              latestDisease:
                crop.diagnosisLogs[crop.diagnosisLogs.length - 1]?.disease || null,
              confidence:
                crop.diagnosisLogs[crop.diagnosisLogs.length - 1]?.confidence || null,
              diagnosedAt:
                crop.diagnosisLogs[crop.diagnosisLogs.length - 1]?.createdAt || null,
            }
          : null,
      })),

      livestock: (farm.livestock || []).map((animal) => ({
        type: animal.type,
        breed: animal.breed || null,
        stage: animal.stage || null,
        headcount: animal.headcount,
        status: animal.status || "Unknown",

        vaccinations: (animal.vaccinations || []).map((vaccination) => ({
          name: vaccination.name,
          dueDate: vaccination.dueDate
            ? new Date(vaccination.dueDate).toISOString().split("T")[0]
            : null,
          completedOn: vaccination.completedOn
            ? new Date(vaccination.completedOn).toISOString().split("T")[0]
            : null,
        })),

        recentHealthLogs: (animal.healthLogs || []).slice(-3).map((log) => ({
          note: log.note,
          createdAt: log.createdAt,
        })),
      })),
    })),
  };
};

// Converts the structured context above into a compact prose summary for the
// LLM prompt — cheaper in tokens than raw JSON, and easier for the model to
// reason about in natural language. The structured object is still returned
// by buildFarmerContext for any other use (e.g. a future dashboard summary).
const formatContextForPrompt = (context) => {
  if (!context.farmerHasFarms) {
    return "This farmer hasn't added any farms yet.";
  }

  return context.farms
    .map((farm) => {
      const cropLines = farm.crops
        .map((c) => {
          const parts = [`${c.name} (${c.stage || "stage unknown"}`];

          if (c.isOverdue) parts.push("overdue for harvest");
          if (c.isHarvested) parts.push(`harvested ${c.harvestedOn}`);
          if (c.yield) parts.push(`yield: ${c.yield.amount} ${c.yield.unit}`);
          if (c.diagnosis) {
            parts.push(
              `diagnosed with ${c.diagnosis.latestDisease} (${c.diagnosis.confidence}% confidence)`
            );
          }

          return parts.join(", ") + ")";
        })
        .join("; ");

      const livestockLines = farm.livestock
        .map((l) => {
          const overdueVaccinations = l.vaccinations.filter(
            (v) => !v.completedOn && v.dueDate && new Date(v.dueDate) < new Date()
          );

          const parts = [`${l.headcount} ${l.type} (${l.status}`];
          if (l.breed) parts.push(l.breed);
          if (overdueVaccinations.length) {
            parts.push(`${overdueVaccinations.length} overdue vaccination(s)`);
          }

          return parts.join(", ") + ")";
        })
        .join("; ");

      return `Farm "${farm.name}" in ${farm.location}: Crops — ${
        cropLines || "none"
      }. Livestock — ${livestockLines || "none"}.`;
    })
    .join("\n");
};

module.exports = { buildFarmerContext, formatContextForPrompt };