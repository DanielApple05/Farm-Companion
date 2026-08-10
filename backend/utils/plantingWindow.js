const { plantingData } = require("../knowledge/planting/plantingData");

const getPlantingRecommendation = (cropName, weatherCondition) => {
  const crop = plantingData.find(
    (item) => item.crop.toLowerCase() === cropName.toLowerCase()
  );

  if (!crop) {
    return {
      status: "No data",
      message: `No planting information is available for ${cropName}.`,
    };
  }

  const currentMonth = new Date().getMonth() + 1;

  const { startMonth, endMonth } = crop.plantingWindow;

  const isInPlantingWindow =
    currentMonth >= startMonth &&
    currentMonth <= endMonth;

  if (!isInPlantingWindow) {
    return {
      crop: crop.crop,
      status: crop.recommendations.outOfSeason.status,
      message: crop.recommendations.outOfSeason.message,
    };
  }

  if (
    crop.preferredConditions.avoidHeavyRain &&
    weatherCondition === "heavyRain"
  ) {
    return {
      crop: crop.crop,
      status: crop.recommendations.heavyRain.status,
      message: crop.recommendations.heavyRain.message,
    };
  }

  return {
    crop: crop.crop,
    status: crop.recommendations.inSeason.status,
    message: crop.recommendations.inSeason.message,
  };
};

module.exports = { getPlantingRecommendation };
