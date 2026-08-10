import {
  PawPrint,
  MapPin,
  PlusCircle,
  ChevronRight,
  Syringe,
  AlertCircle,
} from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import AddLivestockModal from "../components/addLivestockModal";
import { useEffect, useState } from "react";
import { getLivestock } from "../api/livestock";
import LivestockLoading from "../components/livestockLoadingGrid";
import { Link } from "react-router-dom";
import MobileNav from "../components/mobileNav";

const statusStyles = {
  Healthy: "bg-green-50 text-green-700",
  "Due for vaccination": "bg-red-50 text-red-700",
  Flagged: "bg-amber-50 text-amber-700",
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
        setMessage("");

        const response = await getLivestock();
        setLivestock(response.data);
      } catch (error) {
        setMessage(
          error?.response?.data?.message ||
            "Failed to load livestock"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLivestock();
  }, []);

  const totalAnimals = livestock.reduce(
    (sum, animal) => sum + Number(animal.headcount || 0),
    0
  );

  const vaccinationDue = livestock.filter(
    (animal) => animal.status === "Due for vaccination"
  ).length;

  const handleLivestockAdded = (newLivestock) => {
    setLivestock((prev) => [...prev, newLivestock]);
  };

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <main className="w-full min-w-0 px-4 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6 xl:mt-20 mt-24 bg-gray-50">

          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Livestock
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                {loading
                  ? "Loading your livestock..."
                  : `${totalAnimals} ${
                      totalAnimals === 1 ? "animal" : "animals"
                    } across ${livestock.length} ${
                      livestock.length === 1
                        ? "group"
                        : "groups"
                    }`}
              </p>
            </div>

            <button
              onClick={() => setLivestockModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white text-sm px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusCircle size={16} />
              Add Livestock
            </button>

          </div>

          {/* Modal */}
          {livestockModal && (
            <AddLivestockModal
              onClose={() => setLivestockModal(false)}
              onAdded={handleLivestockAdded}
            />
          )}

          {/* Error */}
          {message && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              <AlertCircle
                size={16}
                className="mt-0.5 shrink-0"
              />
              <span>{message}</span>
            </div>
          )}

          {/* Quick stats */}
          {!loading && livestock.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              <div className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <PawPrint
                    size={16}
                    className="text-amber-600"
                  />
                  <span className="text-xs text-gray-500">
                    Total animals
                  </span>
                </div>

                <p className="text-xl font-semibold text-gray-900 mt-2">
                  {totalAnimals}
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <PawPrint
                    size={16}
                    className="text-green-600"
                  />
                  <span className="text-xs text-gray-500">
                    Groups
                  </span>
                </div>

                <p className="text-xl font-semibold text-gray-900 mt-2">
                  {livestock.length}
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Syringe
                    size={16}
                    className={
                      vaccinationDue > 0
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  />

                  <span className="text-xs text-gray-500">
                    Care due
                  </span>
                </div>

                <p className="text-xl font-semibold text-gray-900 mt-2">
                  {vaccinationDue}
                </p>
              </div>

            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <LivestockLoading />
            </div>
          )}

          {/* Empty state */}
          {!loading && livestock.length === 0 && !message && (
            <div className="bg-white border border-gray-100 rounded-xl p-8 sm:p-10 text-center">

              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-50 flex items-center justify-center">
                <PawPrint
                  size={22}
                  className="text-amber-600"
                />
              </div>

              <h2 className="mt-4 font-medium text-gray-900">
                No livestock yet
              </h2>

              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                Add your first livestock group to start
                tracking growth, health, vaccinations, and
                care.
              </p>

              <button
                onClick={() => setLivestockModal(true)}
                className="mt-5 inline-flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusCircle size={16} />
                Add livestock
              </button>

            </div>
          )}

          {/* Livestock list */}
          {!loading && livestock.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

              {livestock.map((group) => {

                const statusClass =
                  statusStyles[group.status] ||
                  "bg-gray-50 text-gray-600";

                return (
                  <Link
                    key={group._id}
                    to={`/livestock/${group._id}`}
                    className="group bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex flex-col gap-4 hover:border-green-300 hover:shadow-sm transition-all"
                  >

                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                          <PawPrint
                            size={17}
                            className="text-amber-600"
                          />
                        </div>

                        <div className="min-w-0">
                          <h2 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                            {group.type}
                          </h2>

                          <p className="text-xs text-gray-400 mt-0.5">
                            {group.stage || "Stage not set"}
                          </p>
                        </div>

                      </div>

                      <ChevronRight
                        size={16}
                        className="text-gray-300 group-hover:text-green-600 transition-colors shrink-0"
                      />

                    </div>

                    {/* Farm */}
                    <p className="text-xs text-gray-500 flex items-start gap-1">
                      <MapPin
                        size={12}
                        className="mt-0.5 shrink-0"
                      />

                      <span className="truncate">
                        {group.farm?.name || "Farm not assigned"}

                        {group.farm?.location &&
                          ` · ${group.farm.location}`}
                      </span>
                    </p>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 text-sm">

                      <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                        <p className="text-[11px] text-gray-400">
                          Animals
                        </p>

                        <p className="font-medium text-gray-900 mt-0.5">
                          {group.headcount || 0}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                        <p className="text-[11px] text-gray-400">
                          Breed
                        </p>

                        <p className="font-medium text-gray-900 mt-0.5 truncate">
                          {group.breed || "Not specified"}
                        </p>
                      </div>

                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 mt-auto">

                      <div className="flex items-center gap-2">

                        <span
                          className={`text-xs px-2 py-1 rounded-md ${statusClass}`}
                        >
                          {group.status || "Healthy"}
                        </span>

                        {group.status ===
                          "Due for vaccination" && (
                          <Syringe
                            size={14}
                            className="text-red-500"
                          />
                        )}

                      </div>

                      <span className="text-sm text-green-600 flex items-center gap-1">
                        View
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

export default Livestock;
