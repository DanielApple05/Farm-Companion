// export const getWeeklyTip = () => {
//   const now = new Date();
//   const currentMonth = now.getMonth() + 1; // JS months are 0-indexed

//   const relevantTips = plantingTips.filter((tip) => tip.months.includes(currentMonth));
//   const pool = relevantTips.length > 0 ? relevantTips : plantingTips;

//   const startOfYear = new Date(now.getFullYear(), 0, 1);
//   const weekNumber = Math.ceil((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));

//   return pool[weekNumber % pool.length];
// };

// export const getMonthlyTip = () => {
//   const now = new Date();
//   const currentMonth = now.getMonth() + 1; // 1–12

//   const relevantTips = plantingTips.filter((tip) => tip.months.includes(currentMonth));
//   return relevantTips.length > 0 ? relevantTips : plantingTips.slice(0, 3);

// };