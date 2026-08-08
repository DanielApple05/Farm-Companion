// import { generalFarmTips } from "../knowledge/general";
const { maizeTips } = require("../knowledge/crops/maize.js");
const { calculateCropStage } = require("../utils/cropMaturity.js");

const getTipsForCrop = (crop) => {
  const growth = calculateCropStage(
    crop.name,
    crop.plantedOn
  );

  let recommendations = [];

  if (crop.name.toLowerCase() === "maize") {
    recommendations = maizeTips;
  }
 
const tips = recommendations.filter(
  (tip) => {
    const cropMatches =
      tip.crops?.includes(crop.name.toLowerCase()) ||
      tip.crop?.toLowerCase() === crop.name.toLowerCase();

    return cropMatches && tip.stage === growth.stage;
  }
);

  return {
    growth,
    tips,
  };
};

const daysBetween = (date1, date2) =>
  Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

const severityRank = { warning: 3, important: 2, info: 1 };

// context = { weather: "heavyRain" | "drySpell" | ..., crops: [{ name, plantedOn, stage }] }
// export const getRelevantTips = (context = {}) => {
//   const { weather, crops = [] } = context;
//   const today = new Date();

//   return generalFarmTips.filter((tip) => {
//     const { trigger } = tip;

//     switch (trigger.type) {
//       case "always":
//         return true;
//       case "weather":
//         return weather === trigger.value;
//       case "daysAfterPlanting":
//         return crops.some((crop) => {
//           if (!crop.plantedOn) return false;
//           const days = daysBetween(new Date(crop.plantedOn), today);
//           return days >= trigger.min && days <= trigger.max;
//         });
//       case "stage":
//         return crops.some((crop) => crop.stage === trigger.value);
//       case "weeklyReminder":
//       case "monthlyReminder":
//         return true;
//       default:
//         return false;
//     }
//   });
// };

// Picks `count` tips for "today" — ranked by severity/priority first,
// then rotated daily so it's not the exact same set every single day.
// export const getDailyTips = (context = {}, count = 3) => {
//   const relevant = getRelevantTips(context);
//   const pool = relevant.length > 0 ? relevant : generalFarmTips;

//   const ranked = [...pool].sort((a, b) => {
//     const severityDiff =
//       (severityRank[b.severity] || 0) - (severityRank[a.severity] || 0);
//     if (severityDiff !== 0) return severityDiff;
//     return (b.priority || 0) - (a.priority || 0);
//   });

//   // Daily rotation offset — same tips all day, shifts the following day,
//   // so returning users see some variety even when the top-ranked set is large.
//   const today = new Date();

//   const startOfYear = new Date(today.getFullYear(), 0, 0);

//   const millisecondsPassed = today - startOfYear;

//   const millisecondsPerDay = 1000 * 60 * 60 * 24;

//   const dayOfYear = Math.floor(millisecondsPassed / millisecondsPerDay);

//   const offset = dayOfYear % ranked.length;
//   const rotated = [...ranked.slice(offset), ...ranked.slice(0, offset)];

//   return rotated.slice(0, count);
// };

module.exports = {
  getTipsForCrop,
  // getRelevantTips,
  // getDailyTips,
};
