import { Lightbulb } from "lucide-react";
import { getWeeklyTip } from "../components/plantingTips";

const WeeklyTip = () => {
  const tip = getWeeklyTip();

  return (
    <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
        <Lightbulb size={16} className="text-green-600" />
      </div>
      <div>
        <p className="text-xs text-green-700 font-medium mb-0.5">Tip of the week</p>
        <p className="text-sm font-medium text-gray-900">{tip.title}</p>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{tip.body}</p>
      </div>
    </div>
  );
};

export default WeeklyTip;
