import { useEffect, useState } from "react";
import {
  ArrowRight,
  Sprout,
  Leaf,
  PawPrint,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../helpers";
import { getGreeting } from "../utils";
import { getFarms } from "../api/farm";
import { getCrops } from "../api/crops";
import { getLivestock } from "../api/livestock";

const Hero = ({
  eyebrow = "Built for smallholder farmers",
  title = `${getGreeting()}, ${getUserName() || "Farmer"}!`,
  subtitle = "Here's what's happening on your farms today.",
  primaryCta = { label: "View farms", path: "/farms" },
  imageUrl = "/images/dashboardHero.png",
}) => {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [crops, setCrops] = useState([]);
  const [livestock, setLivestock] = useState([]);

  const [farmLoading, setFarmLoading] = useState(true);
  const [cropLoading, setCropLoading] = useState(true);
  const [livestockLoading, setLivestockLoading] = useState(true);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        setFarmLoading(true);

        const response = await getFarms();
        setFarms(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message || "Failed to fetch farms"
        );
      } finally {
        setFarmLoading(false);
      }
    };

    fetchFarms();
  }, []);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setCropLoading(true);

        const response = await getCrops();
        setCrops(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message || "Failed to fetch crops"
        );
      } finally {
        setCropLoading(false);
      }
    };

    fetchCrops();
  }, []);

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        setLivestockLoading(true);

        const response = await getLivestock();
        setLivestock(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message || "Failed to fetch livestock"
        );
      } finally {
        setLivestockLoading(false);
      }
    };

    fetchLivestock();
  }, []);

  const stats = [
    {
      label: "Farms",
      value: farms.length,
      loading: farmLoading,
      icon: Sprout,
      tint: "bg-green-50 text-green-600",
    },
    {
      label: "Crops",
      value: crops.length,
      loading: cropLoading,
      icon: Leaf,
      tint: "bg-amber-50 text-amber-600",
    },
    {
      label: "Livestock",
      value: livestock.length,
      loading: livestockLoading,
      icon: PawPrint,
      tint: "bg-orange-50 text-orange-600",
    },
    {
      label: "Alerts",
      value: 0,
      loading: false,
      icon: AlertTriangle,
      tint: "bg-red-50 text-red-600",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-b-2xl bg-green-50">

      <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[420px] md:min-h-[380px]">

        {/* Text side */}
        <div className="px-5 py-8 sm:px-8 md:py-10">

          <div className="max-w-xl space-y-4">

            {/* Eyebrow */}
            <span className="inline-flex items-center text-xs font-medium text-green-700 bg-white px-3 py-1.5 rounded-full">
              {eyebrow}
            </span>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
              {title}
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md">
              {subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">

              {stats.map(
                ({ label, value, loading, icon: Icon, tint }) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:border-green-200 transition-colors"
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${tint}`}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0">
                      {loading ? (
                        <div className="flex items-center h-6">
                          <Loader2
                            size={14}
                            className="animate-spin text-gray-400"
                          />
                        </div>
                      ) : (
                        <p className="text-lg font-semibold text-gray-900">
                          {value}
                        </p>
                      )}

                      <p className="text-xs text-gray-500 truncate">
                        {label}
                      </p>
                    </div>
                  </div>
                )
              )}

            </div>

            {/* CTA */}
            <div className="pt-1">
              <button
                onClick={() => navigate(primaryCta.path)}
                className="inline-flex items-center gap-2 bg-green-600 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-green-700 active:scale-[0.98] transition-all"
              >
                {primaryCta.label}
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>

        {/* Image side */}
        <div className="hidden md:flex h-full min-h-[380px] justify-end">
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