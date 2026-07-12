import { MapPin, Sprout, PawPrint, Wrench, PlusCircle, ChevronRight, AlertTriangle, Ruler } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// ---- Dummy data (swap for real API/DB data later) ----
const farm = {
  name: "Rumuokoro Farm",
  location: "Rumuokoro, Port Harcourt",
  size: { value: 2.5, unit: "hectares" },
  type: "mixed",
};

const crops = [
  { id: 1, name: "Maize", plantedOn: "Apr 12", stage: "Vegetative", status: "Flagged" },
  { id: 2, name: "Cassava", plantedOn: "Feb 20", stage: "Maturing", status: "Healthy" },
];

const livestock = [
  { id: 1, type: "Goats", headcount: 10, breed: "West African Dwarf", status: "Due for vaccination" },
  { id: 2, type: "Poultry", headcount: 28, breed: "Broiler", status: "Healthy" },
];

const equipment = [
  { id: 1, name: "Knapsack Sprayer", quantity: 2, condition: "Good" },
  { id: 2, name: "Wheelbarrow", quantity: 1, condition: "Needs repair" },
  { id: 3, name: "Irrigation Pump", quantity: 1, condition: "Good" },
];

const statusStyles = {
  Healthy: "bg-green-50 text-green-700",
  Flagged: "bg-amber-50 text-amber-700",
  "Due for vaccination": "bg-red-50 text-red-700",
};

const conditionStyles = {
  Good: "bg-green-50 text-green-700",
  "Needs repair": "bg-amber-50 text-amber-700",
  Broken: "bg-red-50 text-red-700",
};

const FarmDetail = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Farm header */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{farm.name}</h1>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={14} />
                  {farm.location}
                </p>
              </div>
              <button className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                Edit Farm
              </button>
            </div>

            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Ruler size={14} className="text-gray-400" />
                {farm.size.value} {farm.size.unit}
              </span>
              <span className="capitalize">{farm.type} farm</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Sprout size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{crops.length}</p>
                <p className="text-xs text-gray-500">Crops</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <PawPrint size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {livestock.reduce((sum, l) => sum + l.headcount, 0)}
                </p>
                <p className="text-xs text-gray-500">Animals</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Wrench size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{equipment.length}</p>
                <p className="text-xs text-gray-500">Equipment</p>
              </div>
            </div>
          </div>

          {/* Crops section */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <Sprout size={16} className="text-green-600" />
                Crops
              </h2>
              <button className="flex items-center gap-1 text-sm text-green-600">
                <PlusCircle size={14} />
                Add Crop
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crops.map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      {c.name}
                      {c.status === "Flagged" && <AlertTriangle size={12} className="text-amber-500" />}
                    </p>
                    <p className="text-xs text-gray-500">{c.plantedOn} · {c.stage}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-md ${statusStyles[c.status]}`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Livestock section */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <PawPrint size={16} className="text-amber-600" />
                Livestock
              </h2>
              <button className="flex items-center gap-1 text-sm text-green-600">
                <PlusCircle size={14} />
                Add Livestock
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {livestock.map((l) => (
                <div key={l.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{l.type}</p>
                    <p className="text-xs text-gray-500">{l.headcount} heads · {l.breed}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-md ${statusStyles[l.status]}`}>{l.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment / tools section */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <Wrench size={16} className="text-gray-600" />
                Equipment & Tools
              </h2>
              <button className="flex items-center gap-1 text-sm text-green-600">
                <PlusCircle size={14} />
                Add Equipment
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {equipment.map((e) => (
                <div key={e.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{e.name}</p>
                    <p className="text-xs text-gray-500">Qty: {e.quantity}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-md ${conditionStyles[e.condition]}`}>
                    {e.condition}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmDetail;