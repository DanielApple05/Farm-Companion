import { useState } from 'react';
import {
  Sprout, PlusCircle, AlertTriangle,
  Activity, Calendar, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AddCropModal from './addCropModal';

const CropCardInFarmDetails = ({ crops, onAdded, farmId, onClose, error, loading }) => {

  const statusStyles = {
    Healthy: "bg-green-50 text-green-700",
    Flagged: "bg-amber-50 text-amber-700",
    "Due for vaccination": "bg-red-50 text-red-700",
  };
  const [cropModal, setCropModal] = useState(false);

  return (
    <div>
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
            farmId={farmId}
            onClose={() => setCropModal(false)}
            onAdded={onAdded}
          />
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Loader2
              size={20}
              className="animate-spin"
            />

            <p className="text-sm mt-2">
              Loading Crops...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Sprout
              size={24}
              className="text-gray-300"
            />

            <p className="text-sm text-gray-600 mt-2">
              failed to fetch crops
            </p>
          </div>
        )}

        {/* Empty State */}
        {crops.length === 0 && !loading && !error && (
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
          </div>)}

        {!loading && !error && crops.length > 0 &&
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
          </div>}
      </div>
    </div>
  );
}

export default CropCardInFarmDetails;
