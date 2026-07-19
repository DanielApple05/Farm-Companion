import { getMonthlyTip } from "./plantingTips";
import { Lightbulb } from "lucide-react";

const MonthlyTip = () => {

  const tips = getMonthlyTip();

  return (
    <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
        <Lightbulb size={16} className="text-green-600" />
      </div>
      <div className="space-y-3" >
        <p className="text-xs text-green-700 font-medium mb-0.5">Tip of the month</p>
        {tips.map((tip, i) => (
          <div key={i} className="my-3" >
            <p className="font-medium">{tip.title}</p>
            <p className="text-sm text-gray-600">{tip.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyTip;