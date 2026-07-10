import { Leaf, MapPin, Calendar, PlusCircle, ChevronRight, AlertTriangle, Link } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddCropModal from "../components/AddCropModal";
import { useEffect, useState } from "react";
import { getCrops } from "../api/crops";

// ---- Dummy data (swap for real API/DB data later) ----
// const crops = [
//   {
//     id: 1,
//     name: "Maize",
//     farm: "Rumuokoro Farm",
//     plantedOn: "Apr 12",
//     stage: "Vegetative",
//     status: "Flagged",
//   },
//   {
//     id: 2,
//     name: "Cassava",
//     farm: "Rumuokoro Farm",
//     plantedOn: "Feb 20",
//     stage: "Maturing",
//     status: "Healthy",
//   },
//   {
//     id: 3,
//     name: "Tomato",
//     farm: "Omuahia Farm",
//     plantedOn: "May 1",
//     stage: "Flowering",
//     status: "Healthy",
//   },
//   {
//     id: 4,
//     name: "Pepper",
//     farm: "Elele Farm",
//     plantedOn: "May 8",
//     stage: "Seedling",
//     status: "Healthy",
//   },
// ];

const statusStyles = {
  Healthy: "bg-green-50 text-green-700",
  Flagged: "bg-amber-50 text-amber-700",
};

const Crops = () => {

  const [crops, setCrops] = useState([]);
  const [ loading, setLoading] = useState(false);
  const [ message, setMessage] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true)
        const response = await getCrops();
        setCrops(response.data);
      } catch (error) {
        setMessage(error.response.data || " failed to fetch crops")
      } finally {
        setLoading(false)
      }
    }
    fetchCrops();
  }, [])

  const [addCropModal, setAddCropModal] = useState(false);
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Crops</h1>
              <p className="text-gray-500 text-sm mt-1">{crops.length} crops across all farms</p>
            </div>
            <button
              onClick={() => setAddCropModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <PlusCircle size={16} />
              Add Crop
            </button>
          </div>
          {
            addCropModal && <AddCropModal onClose={() => setAddCropModal(false)} />
          }

          {/* Crops list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4 hover:border-green-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                      <Leaf size={16} className="text-green-600" />
                    </div>
                    <h2 className="font-medium text-gray-900">{crop.name}</h2>
                  </div>
                  {crop.status === "Flagged" && (
                    <AlertTriangle size={16} className="text-amber-500" />
                  )}
                </div>

                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin size={12} />
                  {crop.farm}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {crop.plantedOn}
                  </span>
                  <span>{crop.stage}</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-xs px-2 py-1 rounded-md ${statusStyles[crop.status]}`}>
                    {crop.status}
                  </span>
                  <Link to={`/crops/${crop.id}`} className="text-sm text-green-600 flex items-center gap-1">
                    View <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Crops;
