import {
  MapPin,
  Sprout,
  PawPrint,
  PlusCircle,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import AddFarmModal from "../components/addFarmModal";
import { useState, useEffect } from "react";
import { getFarms } from "../api/farm";
import FarmCardSkeleton from "../components/farmSkeleton";
import { Link } from "react-router-dom";

const MyFarms = () => {
  const [farmModalOpen, setFarmModalOpen] = useState(false);
  const [farms, setFarms] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        setLoading(true);

        const response = await getFarms();

        setFarms(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message || "Failed to fetch farms"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  const handleFarmAdded = (newFarm) => {
    setFarms((prev) => [...prev, newFarm]);
  };

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />

        <main className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                My Farms
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                {loading
                  ? "Loading your farms..."
                  : `${farms.length} ${
                      farms.length === 1 ? "farm" : "farms"
                    } registered`}
              </p>
            </div>

            <button
              onClick={() => setFarmModalOpen(true)}
              className="flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusCircle size={16} />
              Add Farm
            </button>
          </div>

          {/* Error */}
          {message && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {message}
            </div>
          )}

          {/* Add farm modal */}
          {farmModalOpen && (
            <AddFarmModal
              onAdded={handleFarmAdded}
              onClose={() => setFarmModalOpen(false)}
            />
          )}

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <FarmCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && farms.length === 0 && (
            <div className="bg-white border border-gray-100 rounded-xl p-10 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-green-50 flex items-center justify-center">
                <Sprout size={22} className="text-green-600" />
              </div>

              <h2 className="mt-4 font-medium text-gray-900">
                No farms yet
              </h2>

              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                Add your first farm to start tracking crops, livestock,
                weather, and farm insights.
              </p>

              <button
                onClick={() => setFarmModalOpen(true)}
                className="mt-5 inline-flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusCircle size={16} />
                Add your first farm
              </button>
            </div>
          )}

          {/* Farms */}
          {!loading && farms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {farms.map((farm) => {
                const cropCount = farm.crops?.length || 0;
                const livestockCount = farm.livestock?.length || 0;

                // Keep this simple for now.
                // Later, this can be calculated from crop/livestock statuses.
                const needsAttention = false;

                return (
                  <Link
                    key={farm._id}
                    to={`/farms/${farm._id}`}
                    className="group bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4 hover:border-green-300 hover:shadow-sm transition-all"
                  >
                    {/* Farm heading */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                          {farm.name}
                        </h2>

                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin size={12} />
                          {farm.location}
                        </p>
                      </div>

                      <ChevronRight
                        size={16}
                        className="text-gray-300 group-hover:text-green-600 transition-colors"
                      />
                    </div>

                    {/* Farm resources */}
                    <div className="flex items-center gap-5 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Sprout
                          size={15}
                          className="text-green-600"
                        />
                        {cropCount}{" "}
                        {cropCount === 1 ? "crop" : "crops"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <PawPrint
                          size={15}
                          className="text-amber-600"
                        />
                        {livestockCount}{" "}
                        {livestockCount === 1
                          ? "livestock"
                          : "livestock"}
                      </span>
                    </div>

                    {/* Farm status */}
                    <div className="pt-3 border-t border-gray-100">
                      {needsAttention ? (
                        <div className="flex items-center gap-1.5 text-xs text-amber-600">
                          <AlertTriangle size={14} />
                          Something needs your attention
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-green-600">
                          <CheckCircle2 size={14} />
                          Farm looks good
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm mt-auto">
                      <span className="text-gray-400">
                        Manage farm
                      </span>

                      <span className="text-green-600 flex items-center gap-1">
                        View details
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default MyFarms;