import { Leaf, MapPin, Calendar, PlusCircle, ChevronRight, AlertTriangle } from "lucide-react";
import Sidebar from "../components/navs/sidebar";
import Header from "../components/header";
import AddCropModal from "../components/modalComponent/addCropModal";
import { useEffect, useState } from "react";
import { getCrops } from "../api/crops";
import CropsLoading from "../components/cropComponent/cropLoadingGrid";
import { Link } from "react-router-dom";
import MobileNav from "../components/navs/mobileNav";

const statusStyles = {
  Healthy: "bg-green-50 text-green-700",
  Flagged: "bg-amber-50 text-amber-700",
};

const Crops = () => {

  const [addCropModal, setAddCropModal] = useState(false);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <div className="w-full p-6 space-y-6 xl:mt-20 mt-28 xl:mb-0 mb-20 bg-gray-50">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Crops</h1>
              <p className="text-gray-500 text-sm mt-1">{crops.length || 0} crops across all farms</p>
            </div>
            <button
              onClick={() => setAddCropModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <PlusCircle size={16} />
              Add Crop
            </button>
          </div>
          {
            addCropModal && <AddCropModal onClose={() => setAddCropModal(false)} onAdded={(newItem) =>
              setCrops([...crops, newItem])
            } />
          }

          {/* Crops list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <CropsLoading />
            ) : (
              crops.map((crop) => (
                <div
                  key={crop._id}
                  className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex flex-col gap-4 hover:border-green-300 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                        <Leaf size={16} className="text-green-600" />
                      </div>

                      <h2 className="font-medium text-gray-900 truncate">
                        {crop.name}
                      </h2>
                    </div>

                    {crop.isSold && (
                      <span className="text-gray-400 bg-green-700 p-1 text-sm rounded-full ">Sold</span>
                    )}
                  </div>

                  {/* Farm */}
                  <p className="text-xs text-gray-500 flex items-center gap-1 min-w-0">
                    <MapPin size={12} className="shrink-0" />

                    <span className="truncate">
                      {crop.farm?.name || crop.farm}
                    </span>
                  </p>

                  {/* Crop information */}
                  <div className="grid grid-cols-2 gap-3 text-xs">

                    {/* Planted */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-400 mb-1">
                        Planted
                      </p>

                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Calendar size={13} className="text-gray-400 shrink-0" />

                        <span>
                          {new Date(crop.plantedOn).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Growth / Harvest */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-400 mb-1">
                        {crop.harvestedOn ? "Harvested" : "Stage"}
                      </p>

                      {crop.harvestedOn ? (
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Calendar size={13} className="text-gray-400 shrink-0" />
                          <span>{new Date(crop.harvestedOn).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="font-medium text-gray-700">
                          {crop.stage === "Harvested" ? "Ready for harvest" : crop.stage || "Not specified"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1 mt-auto">

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${statusStyles[crop.status] ||
                          "bg-gray-50 text-gray-600"
                          }`}
                      >
                        {crop.status}
                      </span>
                      {crop.status === "Flagged" && (
                        <AlertTriangle
                          size={16}
                          className="text-amber-500 shrink-0"
                        />
                      )}
                    </div>

                    <Link
                      to={`/crops/${crop._id}`}
                      className="text-sm text-green-600 flex items-center gap-1 hover:text-green-700 transition-colors"
                    >
                      View
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Crops;
