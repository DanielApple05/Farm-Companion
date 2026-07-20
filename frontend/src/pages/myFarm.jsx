import { MapPin, Sprout, PawPrint, PlusCircle, ChevronRight } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddFarmModal from "../components/AddFarmModal";
import { useState, useEffect } from "react";
import { getFarms } from "../api/farm";
import FarmCardSkeleton from "../components/farmSkeleton";
import { Link } from "react-router-dom";

const MyFarms = () => {

  const [farmModalOpen, setFarmModalOpen] = useState(false);
  const [farms, setFarms] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        setLoading(true)
        const response = await getFarms();
        setFarms(response.data);
        console.log(response.data)
      } catch (error) {
        setMessage(error?.response?.data?.message || "Failed to fetch farms");
        console.log(error?.response?.data?.message)
      } finally {
        setLoading(false)
      }
    };
    fetchFarms();
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">My Farms</h1>
              <p className="text-gray-500 text-sm mt-1">{farms.length} farms registered</p>
            </div>
            <button
              onClick={() => setFarmModalOpen(true)}
              className="flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <PlusCircle size={16} />
              Add Farm
            </button>
          </div>
          {
            farmModalOpen &&
            <AddFarmModal
              onAdded={(newItem) =>
                setFarms([...farms, newItem])}
              onClose={() => setFarmModalOpen(false)} />
          }
          {/* Farms list */}
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {
              loading ? (
                <FarmCardSkeleton />
              ) :
                (farms.map((farm) => (
                  <div
                    key={farm._id}
                    className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4 hover:border-green-300 transition-colors cursor-pointer"
                  >
                    <div>
                      <h2 className="font-medium text-gray-900">{farm.name}</h2>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} />
                        {farm.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Sprout size={14} className="text-green-600" />
                        {farm.crops?.length || 0} crops
                      </span>
                      <span className="flex items-center gap-1">
                        <PawPrint size={14} className="text-amber-600" />
                        {farm.livestock?.length || 0} animals
                      </span>
                    </div>

                    <Link to={`/farms/${farm._id}`} className="text-sm text-green-600 flex items-center gap-1 mt-auto">
                      View details <ChevronRight size={14} />
                    </Link>
                  </div>)
                ))}
          </div>
        </div>
      </div >
    </>
  );
};

export default MyFarms;