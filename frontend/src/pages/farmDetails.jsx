import {
  MapPin,
  Sprout,
  PawPrint,
  Wrench,
  PlusCircle,
  AlertTriangle,
  Calendar,
  Activity,
  History
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Header from "../components/header";
import AddEquipmentModal from "../components/addEquipmentModal";
import AddCropModal from "../components/addCropModal";
import AddLivestockModal from "../components/addLivestockModal";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getFarmById, deleteFarm } from "../api/farm";
import { useParams, Link, useNavigate } from "react-router-dom";

import FarmFinances from "../components/farmFinances";
import DeleteButton from "../components/deleteButton";
import MobileNav from "../components/mobileNav";

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
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipModalOpen, setEquipModalOpen] = useState(false);
  const [cropModal, setCropModal] = useState(false);
  const [livestockModal, setLivestockModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [farm, setFarm] = useState({
    name: "",
    location: "",
    crops: [],
    livestock: [],
    equipment: [],
  });


  const handleDelete = async () => {
    try {
      await deleteFarm(id);
      navigate("/farms");
    } catch (error) {
      console.error(
        error?.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    const fetchFarmById = async () => {
      try {
        setLoading(true);

        const response = await getFarmById(id);
        setFarm(response.data);
      } catch (error) {
        console.error(
          error?.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFarmById();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />

        <div className="flex min-h-screen">
          <Sidebar />
          <MobileNav />
          <div className="flex-1 mt-20 p-6 bg-gray-50">
            <div className="animate-pulse space-y-6">

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="h-6 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-56 bg-gray-100 rounded mt-3" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-xl border border-gray-100 p-5"
                  >
                    <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                    <div className="h-5 w-12 bg-gray-200 rounded mt-3" />
                    <div className="h-3 w-16 bg-gray-100 rounded mt-2" />
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="h-5 w-24 bg-gray-200 rounded mb-4" />
                <div className="space-y-3">
                  <div className="h-16 bg-gray-100 rounded-lg" />
                  <div className="h-16 bg-gray-100 rounded-lg" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }

  const crops = farm.crops || [];
  const livestock = farm.livestock || [];
  const equipment = farm.equipment || [];


  const totalLivestock = livestock.reduce(
    (sum, animal) => sum + Number(animal.headcount || 0),
    0
  );

  const flaggedCrops = crops.filter(
    (crop) => crop.status === "Flagged"
  );

  const livestockNeedsAttention = livestock.filter(
    (animal) =>
      animal.status === "Flagged" ||
      animal.status === "Due for vaccination"
  );

  const brokenEquipment = equipment.filter(
    (item) =>
      item.condition === "Broken" ||
      item.condition === "Needs repair"
  );

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <div className="w-full p-6 space-y-6 xl:mt-20 mt-24 xl:mb-0 mb-20 bg-gray-50">

          {/* Farm header */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 ">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="items-start justify-between gap-4 xl:flex grid">

                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {farm.name}
                  </h1>

                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    {farm.location}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">

                  {/* Farm History */}
                  {/* <Link
                    to={`/farms/${farm._id}/*history`}
                    
                    className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    <History size={15} />
                    Farm History
                  </Link> */}

                  <button
                    type="button"
                    onClick={() => toast("Farm History is coming soon!")}
                    className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    <History size={15} />
                    Farm History
                  </button>

                  {/* Edit */}
                  <button
                   onClick={() => toast("coming soon!")}
                    className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"                  
                  >
                    Edit Farm
                  </button>

                  {/* Delete */}
                  <DeleteButton
                    onDelete={handleDelete}
                    label="Delete Farm"
                  />

                </div>
              </div>
            </div>

            {/* Farm attention summary */}
            {(flaggedCrops.length > 0 ||
              livestockNeedsAttention.length > 0 ||
              brokenEquipment.length > 0) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-amber-700">
                    <AlertTriangle size={14} />

                    <span className="font-medium">
                      {flaggedCrops.length +
                        livestockNeedsAttention.length +
                        brokenEquipment.length}{" "}
                      item
                      {flaggedCrops.length +
                        livestockNeedsAttention.length +
                        brokenEquipment.length !==
                        1
                        ? "s"
                        : ""}{" "}
                      need attention
                    </span>
                  </div>
                </div>
              )}
          </div>

          {/* Quick stats */}
          <div className="grid xl:grid-cols-3 grid-cols-2 gap-4">

            {/* Crops */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Sprout
                  size={18}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {crops.length}
                </p>

                <p className="text-xs text-gray-500">
                  Crops
                </p>
              </div>
            </div>

            {/* Livestock */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <PawPrint
                  size={18}
                  className="text-amber-600"
                />
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {totalLivestock}
                </p>

                <p className="text-xs text-gray-500">
                  Animals
                </p>
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Wrench
                  size={18}
                  className="text-gray-600"
                />
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {equipment.length}
                </p>

                <p className="text-xs text-gray-500">
                  Equipment
                </p>
              </div>
            </div>
          </div>

          {/* Crops */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <Sprout
                  size={16}
                  className="text-green-600"
                />

                Crops
              </h2>

              <button
                onClick={() => setCropModal(true)}
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
              >
                <PlusCircle size={14} />
                Add Crop
              </button>
            </div>

            {cropModal && (
              <AddCropModal
                farmId={farm._id}
                onClose={() => setCropModal(false)}
                onAdded={(newItem) =>
                  setFarm({
                    ...farm,
                    crops: [
                      ...(farm.crops || []),
                      newItem,
                    ],
                  })
                }
              />
            )}

            {crops.length === 0 ? (
              <div className="text-center py-8">
                <Sprout
                  size={22}
                  className="mx-auto text-gray-300"
                />

                <p className="text-sm text-gray-500 mt-2">
                  No crops added yet.
                </p>

                <button
                  onClick={() => setCropModal(true)}
                  className="text-xs text-green-600 mt-2"
                >
                  Add your first crop
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {crops.map((crop) => (
                  <Link
                    to={`/crops/${crop._id}`}
                    key={crop._id}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 flex items-center gap-1">

                          {crop.name}

                          {crop.status === "Flagged" && (
                            <AlertTriangle
                              size={12}
                              className="text-amber-500 shrink-0"
                            />
                          )}
                        </p>

                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Calendar size={11} />

                          {crop.plantedOn
                            ? new Date(
                              crop.plantedOn
                            ).toLocaleDateString()
                            : "No planting date"}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-2 py-1 rounded-md shrink-0 ${statusStyles[crop.status] ||
                          "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {crop.status || "Unknown"}
                      </span>
                    </div>

                    {/* Crop stage */}
                    <div className="mt-3 pt-3 border-t border-gray-200">

                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Activity size={11} />
                          {crop.stage || "Stage unavailable"}
                        </span>

                        {typeof crop.percentComplete === "number" && (
                          <span className="text-gray-500">
                            {crop.percentComplete}%
                          </span>
                        )}
                      </div>

                      {typeof crop.percentComplete === "number" && (
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full transition-all"
                            style={{
                              width: `${Math.min(
                                crop.percentComplete,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Livestock */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <div className="flex items-center justify-between mb-4">

              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <PawPrint
                  size={16}
                  className="text-amber-600"
                />

                Livestock
              </h2>

              <button
                onClick={() => setLivestockModal(true)}
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
              >
                <PlusCircle size={14} />
                Add Livestock
              </button>
            </div>

            {livestockModal && (
              <AddLivestockModal
                farmId={farm._id}
                onClose={() => setLivestockModal(false)}
                onAdded={(newStock) =>
                  setFarm({
                    ...farm,
                    livestock: [
                      ...(farm.livestock || []),
                      newStock,
                    ],
                  })
                }
              />
            )}

            {livestock.length === 0 ? (
              <div className="text-center py-8">
                <PawPrint
                  size={22}
                  className="mx-auto text-gray-300"
                />

                <p className="text-sm text-gray-500 mt-2">
                  No livestock added yet.
                </p>

                <button
                  onClick={() => setLivestockModal(true)}
                  className="text-xs text-green-600 mt-2"
                >
                  Add livestock
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {livestock.map((animal) => (
                  <Link
                    to={`/livestock/${animal._id}`}
                    key={animal._id}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {animal.type}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {animal.headcount}{" "}
                          {animal.headcount === 1
                            ? "animal"
                            : "animals"}

                          {animal.breed &&
                            ` · ${animal.breed}`}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-2 py-1 rounded-md shrink-0 ${statusStyles[animal.status] ||
                          "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {animal.status || "Healthy"}
                      </span>
                    </div>

                    {/* Livestock stage */}
                    {animal.stage && (
                      <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Stage
                        </span>

                        <span className="text-xs font-medium text-gray-700">
                          {animal.stage}
                        </span>
                      </div>
                    )}

                    {animal.status === "Due for vaccination" && (
                      <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                        <AlertTriangle size={11} />
                        Vaccination due
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Equipment */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <div className="flex items-center justify-between mb-4">

              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <Wrench
                  size={16}
                  className="text-gray-600"
                />

                Equipment & Tools
              </h2>

              <button
                onClick={() => setEquipModalOpen(true)}
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
              >
                <PlusCircle size={14} />
                Add Equipment
              </button>
            </div>

            {equipModalOpen && (
              <AddEquipmentModal
                farmId={farm._id}
                onClose={() => setEquipModalOpen(false)}
                onAdded={(newItem) =>
                  setFarm({
                    ...farm,
                    equipment: [
                      ...(farm.equipment || []),
                      newItem,
                    ],
                  })
                }
              />
            )}

            {equipment.length === 0 ? (
              <div className="text-center py-8">
                <Wrench
                  size={22}
                  className="mx-auto text-gray-300"
                />

                <p className="text-sm text-gray-500 mt-2">
                  No equipment added yet.
                </p>

                <button
                  onClick={() => setEquipModalOpen(true)}
                  className="text-xs text-green-600 mt-2"
                >
                  Add equipment
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {equipment.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-2 py-1 rounded-md ${conditionStyles[item.condition] ||
                        "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {item.condition}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Farm finances */}
          <FarmFinances farmId={farm._id} crops={crops} livestock={livestock} />

        </div>
      </div>
    </>
  );
};

export default FarmDetail;