import { useNavigate } from "react-router-dom";

export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export const useLogout = (navigate) => {
  localStorage.clear();
   navigate('/auth');
}

// Typical days-to-maturity ranges for common Nigerian smallholder crops.
// These are general averages — actual timing varies by variety, climate, and region.
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
  default: 90, // fallback for crops not in the list
};

// Maps a percentage of the growth cycle to your existing stage labels
const getStageFromPercent = (percent) => {
  if (percent < 0.15) return "Seedling";
  if (percent < 0.45) return "Vegetative";
  if (percent < 0.7) return "Flowering";
  if (percent < 1.0) return "Maturing";
  return "Harvested"; // past 100% — ready or overdue
};

export const calculateCropStage = (cropName, plantedOn) => {
  const key = cropName.toLowerCase().trim();
  const totalDays = MATURITY_DAYS[key] || MATURITY_DAYS.default;

  const daysElapsed = Math.floor(
    (new Date() - new Date(plantedOn)) / (1000 * 60 * 60 * 24)
  );

  const percent = Math.min(daysElapsed / totalDays, 1.25); // cap at 125% so "overdue" doesn't run away

  return {
    stage: getStageFromPercent(percent),
    daysElapsed,
    totalDays,
    percentComplete: Math.round(Math.min(percent, 1) * 100), // clamp display at 100%
    isOverdue: daysElapsed > totalDays,
  };
};