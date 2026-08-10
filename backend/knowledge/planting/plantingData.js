// knowledge/planting/plantingData.js

const plantingData = [
  {
    crop: "maize",

    plantingWindow: {
      startMonth: 4,
      endMonth: 7,
    },

    preferredConditions: {
      rainfall: "moderate",
      avoidHeavyRain: true,
    },

    recommendations: {
      inSeason: {
        status: "Good time to plant",
        message:
          "Current conditions are generally suitable for planting maize.",
      },

      heavyRain: {
        status: "Wait — too wet",
        message:
          "Heavy rainfall is expected. Consider waiting until rainfall becomes moderate and the soil is workable.",
      },

      outOfSeason: {
        status: "Outside planting window",
        message:
          "Maize is currently outside its recommended planting window for Port Harcourt.",
      },
    },
  },

  {
    crop: "cassava",

    plantingWindow: {
      startMonth: 4,
      endMonth: 9,
    },

    preferredConditions: {
      rainfall: "moderate",
      avoidHeavyRain: true,
    },

    recommendations: {
      inSeason: {
        status: "Good time to plant",
        message:
          "Rainfall conditions are generally suitable for establishing cassava.",
      },

      heavyRain: {
        status: "Wait — too wet",
        message:
          "Heavy rainfall may make planting difficult. Consider waiting for a suitable planting period.",
      },

      outOfSeason: {
        status: "Outside planting window",
        message:
          "Cassava is currently outside its recommended planting window for Port Harcourt.",
      },
    },
  },

  {
    crop: "okra",

    plantingWindow: {
      startMonth: 3,
      endMonth: 10,
    },

    preferredConditions: {
      rainfall: "moderate",
      avoidHeavyRain: true,
    },

    recommendations: {
      inSeason: {
        status: "Good time to plant",
        message: "The current season is generally suitable for planting okra.",
      },

      heavyRain: {
        status: "Wait — too wet",
        message:
          "Heavy rainfall is expected. Consider waiting until conditions improve.",
      },

      outOfSeason: {
        status: "Outside planting window",
        message:
          "Okra is currently outside its recommended planting window for Port Harcourt.",
      },
    },
  },
];

module.exports = { plantingData };
