import { useState, useEffect, useMemo } from "react";
import {
  PlusCircle,
  Camera,
  MessageCircle,
  ChevronRight,
  Bug,
  Sprout,
  PawPrint,
  Lightbulb,
} from "lucide-react";

import Sidebar from "../components/navs/sidebar";
import MobileNav from "../components/navs/mobileNav";
import Header from "../components/header";
import Hero from "../components/hero";
import FarmKnowledgeDaily from "../components/farmComponent/farmKnowledge";
import { getFarms } from "../api/farm";
import { getCrops } from "../api/crops";
import { getLivestock } from "../api/livestock";
import { Link } from "react-router-dom";
import { capitalizeFirst } from "../helpers";
import DiagnosisCard from "../components/cards/diagnosisCard";

const quickActions = [
  {
    label: "Add Farm",
    icon: PlusCircle,
    path: "/farms",
    description: "Set up another farm",
  },
  {
    label: "Diagnose Crop",
    icon: Camera,
    path: "/diagnose",
    description: "Check a crop",
  },
  {
    label: "Ask AI",
    icon: MessageCircle,
    path: "/askAIAssistant",
    description: "Get farming help",
  },
];

const riskStyles = {
  Low: "bg-green-50 text-green-700",
  Medium: "bg-amber-50 text-amber-700",
  High: "bg-red-50 text-red-700",
};

const Dashboard = () => {

  const [farms, setFarms] = useState([]);
  const [crops, setCrops] = useState([]);
  const [livestock, setLivestock] = useState([]);

  const [farmLoading, setFarmLoading] = useState(true);
  const [cropLoading, setCropLoading] = useState(true);
  const [livestockLoading, setLivestockLoading] = useState(true);
  const [cropError, setCropError] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        setFarmLoading(true);
        const response = await getFarms();
        setFarms(response.data);
      } catch (error) {
        // setMessage(
        //   error?.response?.data?.message || "Failed to fetch farms"
        // );

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
        setCropError(null)
        const response = await getCrops();
        setCrops(response.data);
      } catch (error) {
        setCropError(
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
        // setMessage(
        //   error?.response?.data?.message || "Failed to fetch livestock"
        // );
      } finally {
        setLivestockLoading(false);
      }
    };
    fetchLivestock();
  }, []);

  const recentDiagnoses = useMemo(() => {
    return crops
      .flatMap((crop) =>
        (crop.diagnosisLogs || []).map((diagnosis) => ({
          ...diagnosis,
          cropName: crop.name,
          cropId: crop._id,
        }))
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )
      .slice(0, 3);
  }, [crops]);

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <main className="w-full xl:mt-20 mt-28 xl:mb-0 mb-20 bg-gray-50 overflow-y-auto">
          <div className="space-y-6 pb-10">

            {/* Hero */}
            <Hero farms={farms} crops={crops} livestock={livestock} cropLoading={cropLoading} farmLoading={farmLoading} livestockLoading={livestockLoading} />

            {/* Quick Actions */}
            <section className="px-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Quick Actions
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Manage your farms and get help quickly.
                  </p>
                </div>
              </div>

              <div className="grid xl:grid-cols-3 grid-cols-2 gap-4">
                {quickActions.map(
                  ({ label, icon: Icon, path, description }) => (
                    <Link
                      to={path}
                      reloadDocument
                      key={label}
                      className="group bg-white border border-gray-100 rounded-xl p-4 hover:border-green-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                          <Icon
                            size={18}
                            className="text-green-600"
                          />
                        </div>

                        <ChevronRight
                          size={15}
                          className="text-gray-300 group-hover:text-green-500 transition-colors"
                        />
                      </div>

                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-900">
                          {label}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {description}
                        </p>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </section>

            {/* Advisory preview */}
            <section className="px-6">
              <div className="bg-white border border-gray-100 rounded-xl p-5">

                <div className="xl:grid flex justify-between items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                    <Lightbulb
                      size={18}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Farm Advisory
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Recommendations based on your crops,
                      livestock and current farm conditions.
                    </p>
                  </div>
                </div>


                <div className="grid xl:grid-cols-2 grid-cols-1 gap-3 mt-4">

                  {/* Crops */}
                  <Link
                    to="/advisory"
                    className="group border border-gray-100 rounded-lg p-3 hover:border-green-200 hover:bg-green-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Sprout
                        size={15}
                        className="text-green-600"
                      />

                      <span className="text-xs font-medium text-gray-700">
                        Crop advice
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                      Stage-based recommendations for your crops.
                    </p>

                    <span className="text-xs text-green-600 mt-2 inline-flex items-center gap-1">
                      Explore
                      <ChevronRight size={12} />
                    </span>
                  </Link>

                  {/* Livestock */}
                  <Link
                    to="/advisory"
                    className="group border border-gray-100 rounded-lg p-3 hover:border-amber-200 hover:bg-amber-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <PawPrint
                        size={15}
                        className="text-amber-600"
                      />

                      <span className="text-xs font-medium text-gray-700">
                        Livestock advice
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                      Advice based on species and livestock stage.
                    </p>

                    <span className="text-xs text-amber-600 mt-2 inline-flex items-center gap-1">
                      Explore
                      <ChevronRight size={12} />
                    </span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Today's Tips */}
            <section className="px-6">

              <FarmKnowledgeDaily />
            </section>

            {/* Recent Diagnosis */}
            <section className="px-6">

              <DiagnosisCard recentDiagnoses={recentDiagnoses} cropError={cropError} cropLoading={cropLoading} />

            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;