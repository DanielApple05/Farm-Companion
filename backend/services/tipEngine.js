const { generalFarmTips } = require("../knowledge/general/farm-management.js");

const { maizeTips } = require("../knowledge/crops/maize.js");
const { cassavaTips } = require("../knowledge/crops/cassava.js");

const { poultryTips } = require("../knowledge/livestock/poultryTips.js");
const { goatTips } = require("../knowledge/livestock/goatTips.js");
const { sheepTips } = require("../knowledge/livestock/sheepTips.js");
const { cattleTips } = require("../knowledge/livestock/cattleTips.js");

const { calculateCropStage } = require("../utils/cropMaturity.js");
const { getWeatherCondition } = require("../utils/weatherCondition.js");

const getTipsForCrop = (crop, weatherData) => {
  const cropName = crop.name.toLowerCase();

  const growth = calculateCropStage(
    crop.name,
    crop.plantedOn
  );

  const weatherCondition = getWeatherCondition(weatherData);

  let recommendations = [];

  if (cropName === "maize") {
    recommendations = maizeTips;
  }

  if (cropName === "cassava") {
    recommendations = cassavaTips;
  }

  const matchingTips = recommendations.filter((tip) => {
    const cropMatches =
      tip.crops?.includes(cropName) ||
      tip.crop?.toLowerCase() === cropName;

    const stageMatches = tip.stage === growth.stage;

    return cropMatches && stageMatches;
  });

  const cropTips = matchingTips.filter(
    (tip) => tip.trigger?.type !== "weather"
  );

  const weatherTips = matchingTips.filter((tip) => {
    if (tip.trigger?.type !== "weather") {
      return false;
    }

    return tip.trigger.value === weatherCondition;
  });

  return {
    growth,
    weatherCondition,
    cropTips,
    weatherTips,
  };
};


// LIVESTOCK TIPS

const getTipsForLivestock = (livestock) => {
  const livestockType = livestock.type.toLowerCase();

  let recommendations = [];

  if (livestockType === "poultry") {
    recommendations = poultryTips;
  }

  if (livestockType === "goats") {
    recommendations = goatTips;
  }

  if (livestockType === "sheep") {
    recommendations = sheepTips;
  }

  if (livestockType === "cattle") {
    recommendations = cattleTips;
  }

  const matchingTips = recommendations.filter((tip) => {
    return (
      tip.type?.toLowerCase() === livestockType &&
      tip.stage?.toLowerCase() === livestock.stage?.toLowerCase()
    );
  });

  return {
    type: livestock.type,
    stage: livestock.stage,
    livestockTips: matchingTips.flatMap(
      (tip) => tip.tips || []
    ),
  };
};

// General Farm Management Tips

const getGeneralFarmManagementTips = () => {
  return generalFarmTips;
};


module.exports = {
  getTipsForCrop,
  getTipsForLivestock,
  getGeneralFarmManagementTips,
};


