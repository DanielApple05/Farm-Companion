
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

import Sidebar from "../components/sidebar";
import MobileNav from "../components/mobileNav";
import Header from "../components/header";
import Hero from "../components/hero";
import FarmKnowledgeDaily from "../components/farmKnowledge";

import { Link } from "react-router-dom";

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

const recentDiagnoses = [
  {
    crop: "Maize",
    issue: "Northern Leaf Blight",
    risk: "Medium",
    farm: "Rumuokoro Farm",
    date: "May 10",
  },
  {
    crop: "Tomato",
    issue: "Early Blight",
    risk: "Low",
    farm: "Omuahia Farm",
    date: "May 8",
  },
];

const riskStyles = {
  Low: "bg-green-50 text-green-700",
  Medium: "bg-amber-50 text-amber-700",
  High: "bg-red-50 text-red-700",
};

const Dashboard = () => {
  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <main className="w-full xl:mt-20 mt-28 xl:mb-0 mb-20 bg-gray-50 overflow-y-auto">
          <div className="space-y-6 pb-10">

            {/* Hero */}
            <Hero />

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


                <div className="grid grid-cols-2 gap-3 mt-4">

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
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Today's Tips
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    A few things worth knowing today.
                  </p>
                </div>
              </div>

              <FarmKnowledgeDaily />
            </section>

            {/* Recent Diagnosis */}
            <section className="px-6">
              <div className="bg-white rounded-xl border border-gray-100 p-5">

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Recent Diagnosis
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Your latest crop health checks.
                    </p>
                  </div>

                  <Link
                    to="/diagnosis"
                    className="text-sm text-green-600 flex items-center gap-1 hover:text-green-700"
                  >
                    View all
                    <ChevronRight size={14} />
                  </Link>
                </div>

                {recentDiagnoses.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-10 h-10 mx-auto rounded-lg bg-gray-50 flex items-center justify-center">
                      <Bug
                        size={18}
                        className="text-gray-400"
                      />
                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      No diagnoses yet.
                    </p>

                    <Link
                      to="/diagnose"
                      className="inline-flex items-center gap-1 text-xs text-green-600 mt-2"
                    >
                      Diagnose a crop
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentDiagnoses.map((diagnosis, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                          <Bug
                            size={16}
                            className="text-amber-600"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {diagnosis.crop} — {diagnosis.issue}
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            {diagnosis.farm} · {diagnosis.date}
                          </p>
                        </div>

                        <span
                          className={`text-xs px-2 py-1 rounded-md shrink-0 ${riskStyles[diagnosis.risk]
                            }`}
                        >
                          {diagnosis.risk} Risk
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
