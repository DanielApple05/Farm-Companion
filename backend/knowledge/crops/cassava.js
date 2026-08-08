export const cassavaTips = [
  {
    id: "cassava-001",

    title: "Plant healthy stem cuttings only",

    body: "Select mature, disease-free stem cuttings from healthy cassava plants. Avoid stems with signs of rot, insect damage, or disease, as unhealthy planting material can reduce germination and spread infections throughout the field.",

    crop: "cassava",

    category: "Planting",

    stage: "Pre-Planting",

    trigger: {
      type: "daysBeforePlanting",
      min: 30,
      max: 1,
    },

    priority: 10,

    severity: "important",
  },

  {
    id: "cassava-002",

    title: "Prepare the land before planting",

    body: "Clear weeds, remove large stones, and loosen the soil before planting. Well-prepared land encourages stronger root development and makes harvesting easier.",

    crop: "cassava",

    category: "Planting",

    stage: "Pre-Planting",

    trigger: {
      type: "daysBeforePlanting",
      min: 30,
      max: 1,
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-003",

    title: "Plant at the beginning of the rainy season",

    body: "Cassava establishes best when planted at the start of the rainy season. Adequate soil moisture helps stem cuttings develop roots quickly and improves early plant survival.",

    crop: "cassava",

    category: "Weather",

    stage: "Planting",

    trigger: {
      type: "weather",
      value: "rainySeasonStart",
    },

    priority: 10,

    severity: "important",
  },

  {
    id: "cassava-004",

    title: "Use the correct planting spacing",

    body: "Leave adequate spacing between cassava plants to reduce competition for sunlight, nutrients, and water. Proper spacing also improves air circulation and makes field maintenance easier.",

    crop: "cassava",

    category: "Planting",

    stage: "Planting",

    trigger: {
      type: "daysAfterPlanting",
      min: 0,
      max: 7,
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-005",

    title: "Plant cuttings firmly in the soil",

    body: "Ensure stem cuttings are planted securely with sufficient contact between the cutting and moist soil. Loose planting may reduce root formation and lower establishment rates.",

    crop: "cassava",

    category: "Planting",

    stage: "Planting",

    trigger: {
      type: "daysAfterPlanting",
      min: 0,
      max: 5,
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-006",

    title: "Inspect for successful sprouting",

    body: "Within the first few weeks after planting, check that cuttings are producing healthy shoots. Replace cuttings that fail to sprout to maintain a uniform plant population.",

    crop: "cassava",

    category: "Crop Monitoring",

    stage: "Seedling",

    trigger: {
      type: "daysAfterPlanting",
      min: 14,
      max: 30,
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-007",

    title: "Control weeds early",

    body: "Young cassava plants grow slowly during the first few weeks and compete poorly with weeds. Early weed control helps reduce competition for nutrients, moisture, and sunlight.",

    crop: "cassava",

    category: "Weed Control",

    stage: "Seedling",

    trigger: {
      type: "daysAfterPlanting",
      min: 14,
      max: 45,
    },

    priority: 10,

    severity: "important",
  },

  {
    id: "cassava-008",

    title: "Inspect for insect damage on young leaves",

    body: "Young cassava leaves may attract insects that feed on tender growth. Regular inspections help identify problems early before significant damage affects plant establishment.",

    crop: "cassava",

    category: "Pest Management",

    stage: "Seedling",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-009",

    title: "Avoid waterlogged planting sites",

    body: "Cassava grows best in well-drained soils. Standing water around young plants can reduce root development and increase the risk of root diseases.",

    crop: "cassava",

    category: "Weather",

    stage: "Seedling",

    trigger: {
      type: "weather",
      value: "heavyRain",
    },

    priority: 9,

    severity: "warning",
  },

  {
    id: "cassava-010",

    title: "Monitor plant establishment during the first month",

    body: "The first month after planting is critical for cassava establishment. Walk through the field regularly to identify missing plants, poor growth, pest damage, or drainage problems while they can still be corrected.",

    crop: "cassava",

    category: "Crop Monitoring",

    stage: "Seedling",

    trigger: {
      type: "daysAfterPlanting",
      min: 7,
      max: 30,
    },

    priority: 9,

    severity: "important",
  },
  {
    id: "cassava-011",

    title: "Complete your first major weeding",

    body: "The first 6–8 weeks after planting are critical for cassava. Remove weeds early before they compete with young plants for sunlight, nutrients, and moisture. Effective early weed control supports stronger root development.",

    crop: "cassava",

    category: "Weed Control",

    stage: "Vegetative",

    trigger: {
      type: "daysAfterPlanting",
      min: 30,
      max: 60,
    },

    priority: 10,

    severity: "important",
  },

  {
    id: "cassava-012",

    title: "Inspect leaves for cassava mosaic disease",

    body: "Look for yellow patches, distorted leaves, or unusual leaf patterns. Cassava mosaic disease reduces plant growth and root yield. Early detection helps prevent the disease from spreading across the field.",

    crop: "cassava",

    category: "Disease Management",

    stage: "Vegetative",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 10,

    severity: "warning",
  },

  {
    id: "cassava-013",

    title: "Remove severely diseased plants",

    body: "If a cassava plant is heavily infected with disease and unlikely to recover, remove it carefully to reduce the risk of spreading infection to nearby healthy plants.",

    crop: "cassava",

    category: "Disease Management",

    stage: "Vegetative",

    trigger: {
      type: "always",
    },

    priority: 9,

    severity: "warning",
  },

  {
    id: "cassava-014",

    title: "Monitor for cassava mealybugs",

    body: "Inspect the growing tips and undersides of leaves for clusters of white, cotton-like insects. Heavy mealybug infestations weaken plants by feeding on sap and reducing healthy growth.",

    crop: "cassava",

    category: "Pest Management",

    stage: "Vegetative",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-015",

    title: "Inspect plants after heavy rainfall",

    body: "Heavy rain can expose roots, wash away soil around young plants, or create standing water. Walk through the farm after major rainfall and correct any drainage problems quickly.",

    crop: "cassava",

    category: "Weather",

    stage: "Vegetative",

    trigger: {
      type: "weather",
      value: "afterHeavyRain",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-016",

    title: "Watch for poor plant growth",

    body: "Plants that remain much smaller than others may be affected by poor soil fertility, pests, diseases, or damaged planting material. Investigate weak plants early to prevent further losses.",

    crop: "cassava",

    category: "Crop Monitoring",

    stage: "Vegetative",

    trigger: {
      type: "monthlyReminder",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-017",

    title: "Maintain good field sanitation",

    body: "Remove weeds, diseased plant material, and unnecessary debris from the field. A clean farm reduces places where pests and diseases can survive and spread.",

    crop: "cassava",

    category: "Farm Management",

    stage: "Vegetative",

    trigger: {
      type: "always",
    },

    priority: 8,

    severity: "info",
  },

  {
    id: "cassava-018",

    title: "Delay fertilizer application before heavy rain",

    body: "If heavy rainfall is expected, postpone fertilizer application until conditions improve. Rain can wash nutrients away before cassava roots absorb them, reducing fertilizer efficiency.",

    crop: "cassava",

    category: "Weather",

    stage: "Vegetative",

    trigger: {
      type: "weather",
      value: "heavyRain",
    },

    priority: 9,

    severity: "warning",
  },

  {
    id: "cassava-019",

    title: "Monitor soil moisture during dry periods",

    body: "Young cassava tolerates some drought, but extended dry periods may slow growth. Watch for prolonged dry weather and inspect plants for signs of moisture stress if rainfall remains low.",

    crop: "cassava",

    category: "Weather",

    stage: "Vegetative",

    trigger: {
      type: "weather",
      value: "drySpell",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-020",

    title: "Walk through your cassava field every week",

    body: "Regular farm inspections help you identify weeds, pests, diseases, drainage issues, and poor plant growth before they become major problems. Consistent monitoring is one of the most effective ways to maintain a healthy cassava crop.",

    crop: "cassava",

    category: "Crop Monitoring",

    stage: "Vegetative",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 10,

    severity: "important",
  },
  {
    id: "cassava-021",

    title: "Keep weeds under control",

    body: "Although mature cassava competes better with weeds than young plants, excessive weed growth still reduces access to sunlight, nutrients, and moisture. Inspect the field regularly and remove weeds before they spread.",

    crop: "cassava",

    category: "Weed Control",

    stage: "Maturing",

    trigger: {
      type: "monthlyReminder",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-022",

    title: "Inspect roots after prolonged rainfall",

    body: "Extended periods of heavy rainfall may leave soils waterlogged, increasing the risk of root rot. Check low-lying areas of the farm and improve drainage where water remains for several days.",

    crop: "cassava",

    category: "Weather",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "heavyRain",
    },

    priority: 10,

    severity: "warning",
  },

  {
    id: "cassava-023",

    title: "Watch for yellowing leaves",

    body: "Yellow leaves during the growing season may indicate nutrient deficiencies, disease, or poor drainage. Inspect affected plants carefully and compare them with healthy plants nearby before deciding on corrective measures.",

    crop: "cassava",

    category: "Crop Monitoring",

    stage: "Maturing",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-024",

    title: "Monitor for cassava green mite damage",

    body: "Cassava green mites feed on young leaves and are more common during hot, dry weather. Look for curled leaves, yellow speckling, or reduced plant growth, especially during extended dry periods.",

    crop: "cassava",

    category: "Pest Management",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "drySpell",
    },

    priority: 9,

    severity: "warning",
  },

  {
    id: "cassava-025",

    title: "Protect soil around the base of plants",

    body: "Heavy rain can wash soil away from cassava roots. Replace eroded soil around exposed roots to help maintain plant stability and encourage healthy root development.",

    crop: "cassava",

    category: "Soil Management",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "afterHeavyRain",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-026",

    title: "Inspect plants after strong winds",

    body: "Strong winds may bend or break cassava stems, especially on exposed farms. Walk through the field after storms and remove severely damaged stems to reduce disease risk.",

    crop: "cassava",

    category: "Weather",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "strongWind",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-027",

    title: "Maintain healthy leaf growth",

    body: "Healthy green leaves produce the energy needed for root development. Continue monitoring the crop for pests, diseases, and nutrient problems that may reduce leaf area or damage foliage.",

    crop: "cassava",

    category: "Crop Monitoring",

    stage: "Maturing",

    trigger: {
      type: "monthlyReminder",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-028",

    title: "Monitor for signs of root rot",

    body: "Poor drainage and prolonged waterlogging increase the risk of root rot. If plants begin wilting despite wet soil, inspect affected areas and improve drainage where possible.",

    crop: "cassava",

    category: "Disease Management",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "rainySeason",
    },

    priority: 10,

    severity: "warning",
  },

  {
    id: "cassava-029",

    title: "Continue monitoring for mealybugs and mites",

    body: "Even during the middle of the growing season, pest populations can increase rapidly. Inspect leaves and growing points regularly so infestations can be managed before they reduce plant vigor.",

    crop: "cassava",

    category: "Pest Management",

    stage: "Maturing",

    trigger: {
      type: "biWeeklyReminder",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-030",

    title: "Assess overall crop performance",

    body: "Compare plant height, leaf color, and overall vigor across the field. Areas with noticeably weaker growth may indicate soil fertility problems, poor drainage, pest pressure, or disease that should be investigated before harvest.",

    crop: "cassava",

    category: "Crop Monitoring",

    stage: "Maturing",

    trigger: {
      type: "monthlyReminder",
    },

    priority: 8,

    severity: "info",
  },
  {
    id: "cassava-031",

    title: "Avoid harvesting too early",

    body: "Cassava roots continue increasing in size and starch content as the crop matures. Harvesting too early may reduce both yield and quality. Unless necessary, allow the crop to reach its recommended maturity period.",

    crop: "cassava",

    category: "Harvest",

    stage: "Maturing",

    trigger: {
      type: "daysAfterPlanting",
      min: 210,
      max: 300,
    },

    priority: 10,

    severity: "important",
  },

  {
    id: "cassava-032",

    title: "Inspect fields after prolonged rainfall",

    body: "Extended rainfall may soften the soil, expose roots, or create waterlogged areas. Walk through your field after heavy rain to identify drainage problems and prevent root damage.",

    crop: "cassava",

    category: "Weather",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "afterHeavyRain",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-033",

    title: "Continue monitoring for cassava mosaic disease",

    body: "Even late in the season, cassava mosaic disease can affect plant health and reduce root development. Inspect leaves regularly and remove severely affected plants where appropriate.",

    crop: "cassava",

    category: "Disease Management",

    stage: "Maturing",

    trigger: {
      type: "monthlyReminder",
    },

    priority: 9,

    severity: "warning",
  },

  {
    id: "cassava-034",

    title: "Look for exposed roots",

    body: "Heavy rainfall or soil erosion may expose cassava roots to sunlight. Cover exposed roots with loose soil to help maintain healthy development and reduce quality loss.",

    crop: "cassava",

    category: "Soil Management",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "heavyRain",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-035",

    title: "Watch for stem damage",

    body: "Broken or damaged stems reduce the plant's ability to produce food for developing roots. Inspect your field after storms or strong winds and remove severely damaged stems if necessary.",

    crop: "cassava",

    category: "Crop Monitoring",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "strongWind",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-036",

    title: "Avoid unnecessary root disturbance",

    body: "Do not dig around cassava plants to check root size frequently. Disturbing the roots can damage developing tubers and reduce the final harvest.",

    crop: "cassava",

    category: "Farm Management",

    stage: "Maturing",

    trigger: {
      type: "always",
    },

    priority: 8,

    severity: "info",
  },

  {
    id: "cassava-037",

    title: "Monitor weather before harvest",

    body: "Harvesting during dry weather makes lifting cassava roots easier and reduces soil sticking to the roots. Check the weather forecast and plan harvesting operations when possible.",

    crop: "cassava",

    category: "Weather",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "clearWeather",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-038",

    title: "Inspect for signs of root rot",

    body: "If plants wilt unexpectedly or roots develop a foul smell, investigate for root rot. Remove affected plants where necessary and improve drainage to reduce further spread.",

    crop: "cassava",

    category: "Disease Management",

    stage: "Maturing",

    trigger: {
      type: "weather",
      value: "rainySeason",
    },

    priority: 10,

    severity: "warning",
  },

  {
    id: "cassava-039",

    title: "Continue routine farm inspections",

    body: "Even as harvest approaches, continue checking your field for pests, diseases, damaged plants, and drainage issues. Small problems identified early can still prevent unnecessary yield losses.",

    crop: "cassava",

    category: "Crop Monitoring",

    stage: "Maturing",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-040",

    title: "Plan your harvest schedule",

    body: "Before harvest begins, arrange labor, transportation, tools, and buyers if applicable. Proper planning helps reduce delays and minimizes losses once roots are removed from the soil.",

    crop: "cassava",

    category: "Harvest",

    stage: "Maturing",

    trigger: {
      type: "daysAfterPlanting",
      min: 240,
      max: 300,
    },

    priority: 9,

    severity: "important",
  },
  {
    id: "cassava-041",

    title: "Harvest cassava at the right maturity",

    body: "Harvest cassava when it reaches the recommended maturity period for your variety. Harvesting too early reduces root size and starch content, while leaving roots in the ground for too long may reduce quality in some varieties.",

    crop: "cassava",

    category: "Harvest",

    stage: "Harvested",

    trigger: {
      type: "daysAfterPlanting",
      min: 270,
      max: 360,
    },

    priority: 10,

    severity: "important",
  },

  {
    id: "cassava-042",

    title: "Harvest during dry weather when possible",

    body: "Dry weather makes harvesting easier by reducing the amount of soil that sticks to the roots. It also lowers the chance of damaging roots during harvesting and transport.",

    crop: "cassava",

    category: "Weather",

    stage: "Harvested",

    trigger: {
      type: "weather",
      value: "clearWeather",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-043",

    title: "Handle harvested roots carefully",

    body: "Avoid throwing or dropping harvested cassava roots. Cuts, bruises, and broken roots spoil faster and lose quality more quickly after harvest.",

    crop: "cassava",

    category: "Post-Harvest",

    stage: "Harvested",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-044",

    title: "Process cassava soon after harvest",

    body: "Fresh cassava roots deteriorate quickly after harvesting. Process, sell, or consume harvested roots as soon as possible to maintain quality and reduce post-harvest losses.",

    crop: "cassava",

    category: "Post-Harvest",

    stage: "Harvested",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 10,

    severity: "warning",
  },

  {
    id: "cassava-045",

    title: "Separate damaged roots from healthy ones",

    body: "Inspect harvested cassava and separate damaged, rotten, or insect-infested roots from healthy roots. This helps maintain quality and reduces spoilage during handling and transportation.",

    crop: "cassava",

    category: "Post-Harvest",

    stage: "Harvested",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-046",

    title: "Inspect harvested roots before transport",

    body: "Before transporting cassava, check for damaged roots, excess soil, and signs of disease. Removing poor-quality roots helps improve the overall value of your harvest.",

    crop: "cassava",

    category: "Post-Harvest",

    stage: "Harvested",

    trigger: {
      type: "always",
    },

    priority: 8,

    severity: "info",
  },

  {
    id: "cassava-047",

    title: "Clean harvesting tools after use",

    body: "Wash and clean harvesting tools before storing them. Clean tools last longer and help reduce the spread of pests and diseases to future crops.",

    crop: "cassava",

    category: "Farm Management",

    stage: "Harvested",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 7,

    severity: "info",
  },

  {
    id: "cassava-048",

    title: "Record your harvest results",

    body: "Keep records of harvest dates, estimated yield, pest problems, weather conditions, and any lessons learned during the season. These records help improve planning for future planting seasons.",

    crop: "cassava",

    category: "Farm Management",

    stage: "Harvested",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "cassava-049",

    title: "Select healthy stems for the next planting season",

    body: "Before clearing the field, identify vigorous, disease-free cassava plants that can provide quality stem cuttings for your next crop. Selecting healthy planting material improves future yields.",

    crop: "cassava",

    category: "Planting",

    stage: "Harvested",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "cassava-050",

    title: "Review your cassava season",

    body: "After harvest, review the entire season—from planting and weed management to weather conditions, pest outbreaks, and final yield. Identifying what worked well and what needs improvement will help you achieve better results in the next growing season.",

    crop: "cassava",

    category: "Farm Management",

    stage: "Harvested",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 8,

    severity: "info",
  },
];
