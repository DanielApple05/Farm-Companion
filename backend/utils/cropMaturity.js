// Typical days-to-maturity for common Nigerian smallholder crops.
// General averages — actual timing varies by variety, climate, and region.
const MATURITY_DAYS = {
  maize: 100,
  cassava: 300,
  tomato: 75,
  pepper: 90,
  okra: 60,
  cowpea: 70,
  yam: 240,
  rice: 120,
  groundnut: 100,
  default: 90,
};

const getStageFromPercent = (percent) => {
  if (percent < 0.15) return "Seedling";
  if (percent < 0.45) return "Vegetative";
  if (percent < 0.7) return "Flowering";
  if (percent < 1.0) return "Maturing";
  return "Harvested";
};

// Pure function — takes a crop name + planting date, returns the calculated stage
// and a few useful derived numbers for display.
const calculateCropStage = (cropName, plantedOn) => {
  if (!plantedOn) {
    return { stage: "Seedling", daysElapsed: 0, percentComplete: 0, isOverdue: false };
  }

  const key = (cropName || "").toLowerCase().trim();
  const totalDays = MATURITY_DAYS[key] || MATURITY_DAYS.default;

  const daysElapsed = Math.floor((new Date() - new Date(plantedOn)) / (1000 * 60 * 60 * 24));
  const percent = Math.min(Math.max(daysElapsed / totalDays, 0), 1.25);

  return {
    stage: getStageFromPercent(percent),
    daysElapsed,
    totalDays,
    percentComplete: Math.round(Math.min(percent, 1) * 100),
    isOverdue: daysElapsed > totalDays,
  };
};

module.exports = { calculateCropStage, MATURITY_DAYS };