import {
  Sprout,
  Leaf,
  AlertTriangle,
  PlusCircle,
  Camera,
  MessageCircle,
  ChevronRight,
  Bug
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import Hero from "../components/Hero";


// ---- Dummy data (swap for real API/DB data later) ----
// const stats = [
//   { label: "Farms", value: 3, icon: Sprout, tint: "bg-green-50 text-green-600" },
//   { label: "Crops", value: 12, icon: Leaf, tint: "bg-amber-50 text-amber-600" },
//   { label: "Alerts", value: 2, icon: AlertTriangle, tint: "bg-red-50 text-red-600" },
// ];

const quickActions = [
  { label: "Add Farm", icon: PlusCircle, href: "/farms/new" },
  { label: "Diagnose Crop", icon: Camera, href: "/diagnose" },
  { label: "Ask AI Assistant", icon: MessageCircle, href: "/chat" },
];

const recentDiagnoses = [
  { crop: "Maize", issue: "Northern Leaf Blight", risk: "Medium", farm: "Rumuokoro Farm", date: "May 10" },
  { crop: "Tomato", issue: "Early Blight", risk: "Low", farm: "Omuahia Farm", date: "May 8" },
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
      <div className="flex ">
        <Sidebar />
        <div className=" w-full space-y-8 bg-gray-200 overflow-y-auto mt-20">       
          {/* Hero section */}
          <Hero />
          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-4 p-6">
            {quickActions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-green-300 transition-colors"
              >
                <Icon size={20} className="text-green-600" />
                <span className="text-sm text-gray-700">{label}</span>
              </button>
            ))}
          </div>

          {/* Recent diagnosis preview */}
          <div className="bg-white rounded-xl border border-gray-100 mx-6 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Recent Diagnosis</h2>
              <a href="/diagnosis" className="text-sm text-green-600 flex items-center gap-1">
                View all <ChevronRight size={14} />
              </a>
            </div>
            <div className="space-y-3">
              {recentDiagnoses.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <Bug size={16} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{d.crop} — {d.issue}</p>
                    <p className="text-xs text-gray-500">{d.farm} · {d.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-md ${riskStyles[d.risk]}`}>{d.risk} Risk</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
