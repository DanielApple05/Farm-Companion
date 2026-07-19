export const generalFarmTips = [
  {
    id: "general-001",

    title: "Walk through your farm every week",

    body: "Inspect your farm at least once every week. Look for changes in leaf color, pest damage, disease symptoms, poor plant growth, standing water, or weed pressure. Early detection allows problems to be corrected before they become widespread and expensive.",

    crop: "all",

    category: "Crop Monitoring",

    stage: "Any",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-002",

    title: "Keep simple farm records",

    body: "Record planting dates, fertilizer applications, pesticide use, rainfall observations, harvest quantities, and production costs. Good records help you understand what worked, improve future decisions, and track farm profitability over time.",

    crop: "all",

    category: "Farm Management",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 7,

    severity: "info",
  },

  {
    id: "general-003",

    title: "Use clean planting materials",

    body: "Always begin the season with healthy seeds, seedlings, or stem cuttings obtained from reliable sources. Clean planting materials reduce the chance of introducing pests and diseases into your field.",

    crop: "all",

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
    id: "general-004",

    title: "Clean your farm tools regularly",

    body: "Wash and disinfect tools such as hoes, pruning shears, and knives after working on diseased plants. Clean tools reduce the spread of fungal, bacterial, and viral diseases between different parts of the farm.",

    crop: "all",

    category: "Farm Hygiene",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 7,

    severity: "info",
  },

  {
    id: "general-005",

    title: "Remove diseased plants promptly",

    body: "Plants showing severe disease symptoms should be removed and disposed of properly if they cannot be treated. Leaving infected plants in the field often allows diseases to spread to healthy crops.",

    crop: "all",

    category: "Disease Management",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 10,

    severity: "warning",
  },

  {
    id: "general-006",

    title: "Avoid working in wet fields",

    body: "Walking through wet fields can compact the soil and increase the spread of certain plant diseases. Wait until the soil has drained sufficiently before carrying out routine farm operations whenever possible.",

    crop: "all",

    category: "Farm Management",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "afterHeavyRain",
    },

    priority: 6,

    severity: "info",
  },

  {
    id: "general-007",

    title: "Watch weather forecasts before major farm activities",

    body: "Before fertilizing, spraying pesticides, or planting, check the weather forecast. Heavy rainfall, strong winds, or extreme heat can reduce the effectiveness of many farm operations and increase production costs.",

    crop: "all",

    category: "Weather",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "general-008",

    title: "Maintain good field drainage",

    body: "Blocked drainage channels can lead to waterlogging, root damage, nutrient loss, and increased disease pressure. Regularly inspect and clear drainage paths, especially during the rainy season.",

    crop: "all",

    category: "Water Management",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "heavyRain",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-009",

    title: "Wear protective equipment when spraying",

    body: "Always wear gloves, boots, long sleeves, and appropriate face protection when handling pesticides or other agricultural chemicals. Follow the product label carefully and avoid spraying on windy days to reduce exposure.",

    crop: "all",

    category: "Safety",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 10,

    severity: "warning",
  },

  {
    id: "general-010",

    title: "Keep children and animals away from chemical storage",

    body: "Store pesticides, fertilizers, and other agricultural chemicals in their original containers, in a locked, dry, and well-ventilated area. Proper storage reduces the risk of accidental poisoning and preserves product quality.",

    crop: "all",

    category: "Safety",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 10,

    severity: "warning",
  },
  {
    id: "general-011",

    title: "Inspect crops early in the morning",

    body: "Early morning is one of the best times to inspect your farm. Cooler temperatures make it easier to spot insects, leaf damage, disease symptoms, and signs of animal activity before the day's heat causes plants to wilt naturally.",

    crop: "all",

    category: "Crop Monitoring",

    stage: "Any",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 7,

    severity: "info",
  },

  {
    id: "general-012",

    title: "Keep your farm free from unnecessary weeds",

    body: "Weeds compete with crops for water, nutrients, sunlight, and space. Some weeds also host pests and diseases that later attack your crops. Regular weed control improves crop growth and makes farm inspections easier.",

    crop: "all",

    category: "Weed Control",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-013",

    title: "Avoid overwatering your crops",

    body: "Too much water can be just as harmful as too little. Waterlogged soil reduces oxygen around roots, encourages root rot, and limits nutrient uptake. Always consider recent rainfall before irrigating.",

    crop: "all",

    category: "Water Management",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "rainySeason",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-014",

    title: "Apply mulch where appropriate",

    body: "Organic mulch helps conserve soil moisture, suppress weeds, reduce soil erosion, and regulate soil temperature. As it decomposes, it also contributes organic matter that improves soil health.",

    crop: "all",

    category: "Soil Management",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 7,

    severity: "info",
  },

  {
    id: "general-015",

    title: "Do not burn crop residues unnecessarily",

    body: "Burning destroys valuable organic matter, beneficial soil organisms, and nutrients that could improve future harvests. Whenever possible, compost suitable crop residues or incorporate them into the soil.",

    crop: "all",

    category: "Soil Management",

    stage: "Post-Harvest",

    trigger: {
      type: "always",
    },

    priority: 7,

    severity: "important",
  },

  {
    id: "general-016",

    title: "Watch for unusual insect activity",

    body: "An increase in insects does not always mean a pest outbreak, but sudden population changes should never be ignored. Monitor affected plants closely and identify the insect before deciding on a control method. Many insects are beneficial pollinators or natural predators.",

    crop: "all",

    category: "Pest Management",

    stage: "Any",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-017",

    title: "Inspect both sides of leaves",

    body: "Many insects, eggs, fungal growth, and early disease symptoms develop on the underside of leaves. During routine inspections, check both the upper and lower leaf surfaces to improve early detection.",

    crop: "all",

    category: "Crop Monitoring",

    stage: "Any",

    trigger: {
      type: "weeklyReminder",
    },

    priority: 7,

    severity: "info",
  },

  {
    id: "general-018",

    title: "Replace damaged farm tools promptly",

    body: "Sharp, well-maintained tools reduce plant damage and improve work efficiency. Broken or blunt tools require more effort and may injure plants or spread diseases through rough cuts.",

    crop: "all",

    category: "Equipment",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 5,

    severity: "info",
  },

  {
    id: "general-019",

    title: "Learn to identify beneficial insects",

    body: "Not every insect found on your farm is harmful. Ladybirds, lacewings, spiders, praying mantises, and many wasps naturally feed on crop pests. Protecting these beneficial organisms can reduce the need for chemical pesticides.",

    crop: "all",

    category: "Pest Management",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 6,

    severity: "info",
  },

  {
    id: "general-020",

    title: "Review your farm records every month",

    body: "Set aside time each month to review your planting dates, expenses, rainfall observations, fertilizer use, pest outbreaks, and crop performance. Regular reviews help identify patterns and improve future farming decisions.",

    crop: "all",

    category: "Farm Management",

    stage: "Any",

    trigger: {
      type: "monthlyReminder",
    },

    priority: 8,

    severity: "important",
  },
  {
    id: "general-021",

    title: "Healthy soil grows healthier crops",

    body: "Healthy soil is alive with beneficial organisms such as bacteria, fungi, and earthworms that help break down organic matter and release nutrients. Avoid practices that damage soil structure, such as excessive tillage or burning crop residues. Improving soil health increases water retention, root growth, and long-term productivity.",

    crop: "all",

    category: "Soil Management",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-022",

    title: "Avoid compacting wet soil",

    body: "Walking, driving machinery, or repeatedly working on waterlogged soil compresses soil particles together. Compacted soil reduces air spaces, limits root growth, slows water infiltration, and makes it harder for crops to absorb nutrients.",

    crop: "all",

    category: "Soil Management",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "afterHeavyRain",
    },

    priority: 7,

    severity: "important",
  },

  {
    id: "general-023",

    title: "Rotate crops whenever possible",

    body: "Growing the same crop repeatedly on the same land encourages pests, diseases, and nutrient depletion. Rotating crops—especially alternating cereals with legumes—helps improve soil fertility, interrupts pest life cycles, and can reduce the need for pesticides.",

    crop: "all",

    category: "Crop Rotation",

    stage: "Post-Harvest",

    trigger: {
      type: "always",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "general-024",

    title: "Water deeply instead of frequently",

    body: "Deep watering encourages roots to grow further into the soil where moisture lasts longer. Frequent shallow watering often results in weak, shallow root systems that are more vulnerable during dry periods.",

    crop: "all",

    category: "Water Management",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "drySpell",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-025",

    title: "Keep livestock away from young crops",

    body: "Young seedlings are especially vulnerable to trampling and grazing. Repair damaged fences regularly and inspect your farm boundaries to prevent livestock from entering cultivated areas.",

    crop: "all",

    category: "Farm Management",

    stage: "Seedling",

    trigger: {
      type: "daysAfterPlanting",
      min: 0,
      max: 30,
    },

    priority: 7,

    severity: "important",
  },

  {
    id: "general-026",

    title: "Never guess when applying pesticides",

    body: "Always identify the pest correctly before applying any pesticide. Using the wrong product wastes money, may harm beneficial insects, and can contribute to pesticide resistance. Follow label instructions carefully for dosage, timing, and safety precautions.",

    crop: "all",

    category: "Pest Management",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 10,

    severity: "warning",
  },

  {
    id: "general-027",

    title: "Harvest at the proper maturity",

    body: "Harvesting too early often reduces quality, taste, storage life, and market value. Harvesting too late may increase losses from pests, diseases, theft, or adverse weather. Learn the maturity signs for each crop you grow.",

    crop: "all",

    category: "Harvest",

    stage: "Maturing",

    trigger: {
      type: "stage",
      value: "Maturing",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "general-028",

    title: "Keep harvested produce out of direct sunlight",

    body: "After harvest, excessive heat speeds up moisture loss and reduces freshness. Move harvested produce into a shaded, cool, and well-ventilated area as soon as possible to preserve quality and extend shelf life.",

    crop: "all",

    category: "Post-Harvest",

    stage: "Harvest",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-029",

    title: "Inspect irrigation equipment regularly",

    body: "Leaks, clogged emitters, broken hoses, and damaged pipes reduce irrigation efficiency and waste water. Regular inspections help ensure crops receive adequate moisture while lowering water and maintenance costs.",

    crop: "all",

    category: "Equipment",

    stage: "Any",

    trigger: {
      type: "monthlyReminder",
    },

    priority: 6,

    severity: "info",
  },

  {
    id: "general-030",

    title: "Plan next season before this one ends",

    body: "Successful farmers begin preparing for the next planting season before the current harvest is complete. Review your records, estimate seed and fertilizer requirements, identify problems from the current season, and make improvements while they are still fresh in your mind.",

    crop: "all",

    category: "Farm Management",

    stage: "Post-Harvest",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 8,

    severity: "important",
  },
  {
    id: "general-031",

    title: "Apply fertilizer to moist soil",

    body: "Fertilizer works best when the soil has adequate moisture. Applying fertilizer to extremely dry soil reduces nutrient uptake, while applying it before heavy rainfall increases the risk of nutrients being washed away. Aim to fertilize when the soil is moist but not waterlogged.",

    crop: "all",

    category: "Fertilizer",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "general-032",

    title: "Do not overapply fertilizer",

    body: "Applying more fertilizer than recommended does not always produce higher yields. Excess fertilizer can damage plant roots, waste money, pollute nearby water sources, and reduce soil health over time. Follow recommended application rates whenever possible.",

    crop: "all",

    category: "Fertilizer",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 9,

    severity: "warning",
  },

  {
    id: "general-033",

    title: "Check fields after strong winds",

    body: "Strong winds can break stems, damage leaves, flatten crops, or expose roots. Walk through your farm after storms to identify damaged plants early and support or remove them where necessary.",

    crop: "all",

    category: "Weather",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "strongWind",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-034",

    title: "Watch for standing water",

    body: "Standing water around crops limits oxygen in the root zone and encourages root diseases. After heavy rainfall, inspect your field and improve drainage where water remains for long periods.",

    crop: "all",

    category: "Water Management",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "heavyRain",
    },

    priority: 9,

    severity: "warning",
  },

  {
    id: "general-035",

    title: "Keep farm boundaries clearly marked",

    body: "Clearly defined farm boundaries help prevent disputes, accidental encroachment, and livestock entering cultivated areas. Regularly inspect fences, boundary markers, and access paths.",

    crop: "all",

    category: "Farm Management",

    stage: "Any",

    trigger: {
      type: "monthlyReminder",
    },

    priority: 6,

    severity: "info",
  },

  {
    id: "general-036",

    title: "Encourage beneficial insects",

    body: "Many insects naturally control harmful pests. Avoid unnecessary pesticide spraying, especially when pest populations are low. Protecting beneficial insects helps maintain a healthier farm ecosystem and reduces reliance on chemicals.",

    crop: "all",

    category: "Pest Management",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 7,

    severity: "important",
  },

  {
    id: "general-037",

    title: "Keep compost away from water sources",

    body: "Store compost piles where runoff will not enter streams, wells, or ponds. This helps protect water quality while allowing nutrients to remain available for future use on the farm.",

    crop: "all",

    category: "Environmental Management",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 6,

    severity: "info",
  },

  {
    id: "general-038",

    title: "Inspect stored seeds before planting",

    body: "Before planting, examine stored seeds for mold, insect damage, discoloration, or poor storage conditions. Using damaged seeds often results in poor germination and uneven crop establishment.",

    crop: "all",

    category: "Seed Management",

    stage: "Pre-Planting",

    trigger: {
      type: "daysBeforePlanting",
      min: 30,
      max: 1,
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-039",

    title: "Reduce soil erosion",

    body: "Heavy rainfall can wash away fertile topsoil. Maintaining ground cover, planting along contours where appropriate, and minimizing bare soil helps reduce erosion and preserves valuable nutrients for future crops.",

    crop: "all",

    category: "Soil Management",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "rainySeason",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-040",

    title: "Review this season's successes and challenges",

    body: "After each growing season, evaluate what worked well and what could be improved. Review yields, pest outbreaks, fertilizer use, rainfall patterns, and production costs. Learning from each season helps you make better decisions and continuously improve your farm's performance.",

    crop: "all",

    category: "Farm Management",

    stage: "Post-Harvest",

    trigger: {
      type: "stage",
      value: "Harvested",
    },

    priority: 8,

    severity: "important",
  },
  {
    id: "general-041",

    title: "Delay field work during heavy rainfall",

    body: "Avoid planting, fertilizing, spraying pesticides, or cultivating the soil during heavy rainfall. Wet conditions reduce the effectiveness of many farm operations, increase soil compaction, and may wash away fertilizers or pesticides before they can work.",

    crop: "all",

    category: "Weather",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "heavyRain",
    },

    priority: 10,

    severity: "warning",
  },

  {
    id: "general-042",

    title: "Prepare for extended dry weather",

    body: "When several days of little or no rainfall are expected, conserve available soil moisture by reducing unnecessary cultivation, applying mulch where appropriate, and planning irrigation early in the morning or late in the evening.",

    crop: "all",

    category: "Weather",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "drySpell",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "general-043",

    title: "High humidity increases disease risk",

    body: "Extended periods of high humidity create favorable conditions for fungal diseases such as blight, mildew, and leaf spots. Inspect crops regularly, improve air circulation where possible, and remove infected plant material promptly.",

    crop: "all",

    category: "Disease Management",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "highHumidity",
    },

    priority: 9,

    severity: "warning",
  },

  {
    id: "general-044",

    title: "Secure lightweight farm equipment before storms",

    body: "Strong winds can damage irrigation pipes, shade nets, seed trays, and lightweight structures. Before storms arrive, secure loose equipment and move valuable tools to a protected location.",

    crop: "all",

    category: "Weather",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "strongWind",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-045",

    title: "Inspect your farm after every major storm",

    body: "Once conditions are safe, inspect your farm for flooded areas, broken stems, fallen plants, damaged irrigation systems, blocked drainage channels, and signs of erosion. Early repairs reduce long-term crop losses.",

    crop: "all",

    category: "Weather",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "afterStorm",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "general-046",

    title: "Monitor heat stress during very hot weather",

    body: "Periods of unusually high temperatures increase water demand and may slow crop growth. Monitor crops closely for wilting, leaf scorch, or flower drop, and irrigate during the cooler hours of the day whenever possible.",

    crop: "all",

    category: "Weather",

    stage: "Any",

    trigger: {
      type: "weather",
      value: "heatWave",
    },

    priority: 9,

    severity: "warning",
  },

  {
    id: "general-047",

    title: "Protect harvested produce from unexpected rainfall",

    body: "If rain is expected during harvest, move harvested produce under shelter immediately. Wet harvested crops are more likely to develop mold, lose quality, and spoil during storage.",

    crop: "all",

    category: "Post-Harvest",

    stage: "Harvested",

    trigger: {
      type: "weather",
      value: "rainExpected",
    },

    priority: 8,

    severity: "important",
  },

  {
    id: "general-048",

    title: "Use weather forecasts to plan farm activities",

    body: "Checking the weather forecast before planting, spraying, irrigating, or harvesting helps improve efficiency and reduce unnecessary costs. Planning around expected weather conditions often leads to better farming decisions.",

    crop: "all",

    category: "Weather",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 8,

    severity: "info",
  },

  {
    id: "general-049",

    title: "Report unusual pest outbreaks early",

    body: "If you notice a sudden increase in unfamiliar pests or widespread crop damage, document it with photos and seek advice from local agricultural extension officers or trusted agronomists. Early reporting can help reduce losses and prevent outbreaks from spreading.",

    crop: "all",

    category: "Pest Management",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 9,

    severity: "important",
  },

  {
    id: "general-050",

    title: "Make weather part of every farming decision",

    body: "Weather influences nearly every aspect of farming—from planting and fertilizing to irrigation, pest pressure, disease development, and harvesting. Develop the habit of checking weather conditions before carrying out important farm activities. Small adjustments based on reliable weather information can significantly improve productivity and reduce avoidable losses.",

    crop: "all",

    category: "Weather",

    stage: "Any",

    trigger: {
      type: "always",
    },

    priority: 10,

    severity: "important",
  },
];
