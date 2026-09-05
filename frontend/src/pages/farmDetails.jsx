import {
  MapPin,
  AlertTriangle,
  History
} from "lucide-react";

import Sidebar from "../components/navs/sidebar";
import Header from "../components/header";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getFarmById, deleteFarm } from "../api/farm";
import { useParams, useNavigate } from "react-router-dom";

import FarmFinances from "../components/farmComponent/farmFinances";
import DeleteButton from "../components/buttons/deleteButton";
import MobileNav from "../components/navs/mobileNav";
import CropCardInFarmDetails from "../components/cards/cropCardInFarmDetails";
import LivestockCardInFarmDetails from "../components/cards/livestockCardInFarmDetails";
import EquipmentCardInFarmDetails from "../components/cards/equipmentCardInFarmDetails";
import QuickStatsInFarmDetails from "../components/farmComponent/quickStatsInFarmDetails";

const FarmDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        setError("");
        const response = await getFarmById(id);
        setFarm(response.data);
      } catch (error) {
        setError(
          error?.response?.data?.message || "Failed to fetch Farm"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFarmById();
    }
  }, [id]);

  const crops = farm.crops || [];
  const livestock = farm.livestock || [];
  const equipment = farm.equipment || [];


  const totalLivestock = livestock.reduce(
    (sum, animal) => sum + Number(animal.availableHeads || 0),
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
          <div className="bg-white rounded-xl border border-gray-100 p-5 ">

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

          <QuickStatsInFarmDetails
            livestock={livestock}
            crops={crops}
            equipment={equipment}
            totalLivestock={totalLivestock}
          />


          {/* Crops */}
          <CropCardInFarmDetails
            crops={crops}
            farmId={farm._id}
            error={error}
            loading={loading}
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

          {/* Livestock */}
          <LivestockCardInFarmDetails
            livestock={livestock}
            farmId={farm._id}
            error={error}
            loading={loading}
            onClose={() => setLivestockModal(false)}
            onAdded={(newStock) =>
              setFarm({
                ...farm,
                livestock: [
                  ...(farm.livestock || []),
                  newStock,
                ],
              })
            } />

          {/* Equipment */}
          <EquipmentCardInFarmDetails
            equipment={equipment}
            farmId={farm._id}
            error={error}
            loading={loading}
            onClose={() => setEquipModalOpen(false)}
            onAdded={(newItem) =>
              setFarm({
                ...farm,
                equipment: [
                  ...(farm.equipment || []),
                  newItem,
                ],
              })
            } />

          {/* Farm finances */}
          <FarmFinances
            farmId={farm._id}
            crops={crops}
            livestock={livestock}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default FarmDetail;