import { useState } from 'react';
import {
  PawPrint, PlusCircle, AlertTriangle,
  Activity, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AddLivestockModal from './addLivestockModal';

const LivestockCardInFarmDetails = ({ livestock, onAdded, farmId, onClose }) => {

  const [livestockModal, setLivestockModal] = useState(false);

  const statusStyles = {
    Healthy: "bg-green-50 text-green-700",
    Flagged: "bg-amber-50 text-amber-700",
    "Due for vaccination": "bg-red-50 text-red-700",
  };

  return (
    <div>
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
            farmId={farmId}
            onClose={() => setLivestockModal(false)}
            onAdded={onAdded}
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
    </div>
  );
}

export default LivestockCardInFarmDetails;
