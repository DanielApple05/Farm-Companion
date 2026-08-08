import { PawPrint, MapPin, PlusCircle, ChevronRight, Syringe } from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddLivestockModal from "../components/addLivestockModal";
import { useEffect, useState } from "react";
import { getLivestock } from "../api/livestock";
import LivestockLoading from "../components/livestockLoadingGrid";
import { Link } from "react-router-dom";

const statusStyles = {
  Healthy: "bg-green-50 text-green-700",
  "Due for vaccination": "bg-red-50 text-red-700",
};

const Livestock = () => {

  const [livestockModal, setLivestockModal] = useState(false);
  const [livestock, setLivestock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        setLoading(true);
        const response = await getLivestock();
        setLivestock(response.data);
      } catch (error) {
        setMessage(error.response.data.message)
      } finally {
        setLoading(false)
      }
    }
    fetchLivestock();
  }, [])

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Livestock</h1>
              <p className="text-gray-500 text-sm mt-1">
                {livestock.reduce((sum, l) => sum + l.headcount, 0)} animals across all farms
              </p>
            </div>
            <button className="flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors" onClick={() => setLivestockModal(true)}>
              <PlusCircle size={16} />
              Add Livestock
            </button>
          </div>
          {
            livestockModal && <AddLivestockModal onClose={() => setLivestockModal(false)} />
          }

          {/* Livestock list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <LivestockLoading />
            ) :
              (livestock.map((group) => (
                <div
                  key={group._id}
                  className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4 hover:border-green-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                        <PawPrint size={16} className="text-amber-600" />
                      </div>
                      <h2 className="font-medium text-gray-900">{group.type}</h2>
                    </div>
                    {group.status === "Due for vaccination" && (
                      <Syringe size={16} className="text-red-500" />
                    )}
                  </div>

                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} />
                    {group.farm.name }
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{group.headcount} heads</span>
                    <span>{group.breed}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-xs px-2 py-1 rounded-md ${statusStyles[group.status]}`}>
                      {group.status}
                    </span>
                    <Link to={`/livestock/${group._id}`} className="text-sm text-green-600 flex items-center gap-1">
                      View <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>)
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Livestock;
