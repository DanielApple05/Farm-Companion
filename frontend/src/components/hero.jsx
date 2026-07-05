import {
  ArrowRight, Link, Sprout,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Reusable hero — pass different props to reuse across homepage,
// or trimmed down (no image) for section banners elsewhere.
const Hero = ({
  eyebrow = "Built for smallholder farmers",
  title = "Good morning, Daniel",
  subtitle = "Here's what's happening on your farms today.",
  primaryCta = { label: "view farm", path: "/farms" },
  // secondaryCta = { label: "See how it works", path: "#features" },
  stats = [
    { label: "Farms", value: 3, icon: Sprout, tint: "bg-green-50 text-green-600" },
    { label: "Crops", value: 12, icon: Leaf, tint: "bg-amber-50 text-amber-600" },
    { label: "Alerts", value: 2, icon: AlertTriangle, tint: "bg-red-50 text-red-600" },
  ],
  imageUrl = "/images/dashboardHero.png", 
}) => {

  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-b-2xl bg-green-50 h-96">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 pl-8 h-full">
        {/* Text side */}
        <div className="max-w-lg h-full flex flex-col justify-center space-y-4">
          <span className="inline-block text-xs font-medium text-green-700 w-52 bg-white px-3 py-1 rounded-full ">
            {eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map(({ label, value, icon: Icon, tint }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tint}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 ">
            <button
              onClick={() => navigate(primaryCta.path)}
              className="flex items-center gap-2 bg-green-600 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
            >
              {primaryCta.label}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Image side */}
        <div className="hidden md:flex justify-end h-full">
          <img
            src={imageUrl}
            alt="Farmer using Farm Companion"
            className="w-full h-full object-cover rounded-br-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
