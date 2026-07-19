import { useState, useEffect } from "react";
import { Lightbulb, AlertTriangle, Info } from "lucide-react";
import { getCrops } from "../api/crops";
import { useWeather } from "../api/weather";
import { getDailyTips } from "../farm-utils/tipEngine";

const severityStyles = {
  warning: { icon: AlertTriangle, bg: "bg-red-50", text: "text-red-600" },
  important: { icon: Lightbulb, bg: "bg-amber-50", text: "text-amber-600" },
  info: { icon: Info, bg: "bg-blue-50", text: "text-blue-600" },
};

// Maps a raw OpenWeatherMap description into the trigger vocabulary your tips use.
// Extend this as you notice more real weather descriptions coming back.
const normalizeWeatherCondition = (description = "") => {
  const desc = description.toLowerCase();
  if (desc.includes("heavy rain") || desc.includes("thunderstorm")) return "heavyRain";
  if (desc.includes("rain") || desc.includes("drizzle")) return "rainySeason";
  if (desc.includes("clear") && desc.includes("hot")) return "heatWave";
  return null;
};

const DailyTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { weatherData, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather("Port Harcourt", "metric");
  }, [fetchWeather]);

  useEffect(() => {
    const buildContext = async () => {
      try {
        setLoading(true);
        const cropsRes = await getCrops();
        const crops = cropsRes.data.map((c) => ({
          name: c.name,
          plantedOn: c.plantedOn,
          stage: c.stage,
        }));

        const weatherDescription = weatherData?.list?.[0]?.weather?.[0]?.description;
        const weather = normalizeWeatherCondition(weatherDescription);

        setTips(getDailyTips({ weather, crops }, 3));
      } catch (error) {
        console.error(error);
        setTips(getDailyTips({}, 3)); // fall back to general tips if crops fail to load
      } finally {
        setLoading(false);
      }
    };

    buildContext();
  }, [weatherData]);

  if (loading) return null; // keep the dashboard clean while this resolves quietly in the background

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mx-6 space-y-3">
      <h2 className="font-medium text-gray-900">Today's Tips</h2>
      {tips.map((tip) => {
        const style = severityStyles[tip.severity] || severityStyles.info;
        const Icon = style.icon;
        return (
          <div key={tip.id} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
              <Icon size={14} className={style.text} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{tip.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{tip.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyTips;