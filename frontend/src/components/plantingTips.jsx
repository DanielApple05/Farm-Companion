// ---- Planting & farm care tips ----
// Tagged by month (1 = January ... 12 = December), based on general
// growing patterns for southern Nigeria (rainy season ~April–October,
// dry season ~November–March). Adjust freely as you refine this —
// these are reasonable defaults, not hyper-local agronomic guarantees.

export const plantingTips = [
  {
    title: "Okra planting window is open",
    body: "March through May is a good stretch for okra — soil moisture and warmth are both favorable. Space plants about 45cm apart for healthy pod development.",
    months: [3, 4, 5],
  },
  {
    title: "Maize: get ahead of fall armyworm",
    body: "Young maize is most vulnerable to fall armyworm in its first 3–4 weeks. Check the whorl of each plant every few days for small holes or frass (droppings).",
    months: [4, 5, 6, 7],
  },
  {
    title: "Heavy rains ahead — hold off on fertilizing",
    body: "During peak rainy months, applying fertilizer right before a downpour often washes nutrients away before roots can absorb them. Wait for a drier stretch if you can.",
    months: [6, 7, 8, 9],
  },
  {
    title: "Cassava: this is prime planting season",
    body: "Cassava cuttings planted at the start of the rains establish roots faster and tolerate the coming dry season better. Aim for healthy, disease-free stem cuttings.",
    months: [3, 4, 5, 6],
  },
  {
    title: "Watch tomato and pepper for early blight",
    body: "Warm, humid weather is ideal for fungal disease on tomato and pepper leaves. Remove and destroy any spotted lower leaves promptly to slow the spread.",
    months: [5, 6, 7, 8],
  },
  {
    title: "Dry season: prioritize watering schedule",
    body: "With little to no rainfall, consistent watering matters more than volume. Water early morning or evening to reduce evaporation loss.",
    months: [11, 12, 1, 2],
  },
  {
    title: "Good time to prepare land for the new season",
    body: "Late dry season is ideal for clearing, tilling, and adding organic matter to your soil — giving it time to settle before the rains return.",
    months: [1, 2, 3],
  },
  {
    title: "Harvest window for early-planted maize",
    body: "Maize planted in April is typically ready for harvest around this time. Check for dry, brown husks and hard kernels before harvesting.",
    months: [7, 8],
  },
  {
    title: "Groundnut: watch soil moisture at pod stage",
    body: "Groundnuts need consistent moisture while pods are forming underground. Inconsistent watering here often leads to poor pod fill.",
    months: [6, 7, 8],
  },
  {
    title: "Post-harvest storage matters as much as the harvest",
    body: "Store grains like maize and cowpea in a dry, well-ventilated space — damp storage conditions are one of the biggest causes of post-harvest loss.",
    months: [8, 9, 10, 11],
  },
];

// Deterministic weekly pick — same tip shows all week, rotates the following week.
// Falls back to the full list if nothing matches the current month.
export const getWeeklyTip = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JS months are 0-indexed

  const relevantTips = plantingTips.filter((tip) => tip.months.includes(currentMonth));
  const pool = relevantTips.length > 0 ? relevantTips : plantingTips;

  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));

  return pool[weekNumber % pool.length];
};