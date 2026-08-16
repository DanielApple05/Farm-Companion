import React, { useState } from 'react';
import { Wrench, PlusCircle } from 'lucide-react';
import AddEquipmentModal from './addEquipmentModal';

const EquipmentCardInFarmDetails = ({equipment, farmId, onClose, onAdded }) => {

  const conditionStyles = {
    Good: "bg-green-50 text-green-700",
    "Needs repair": "bg-amber-50 text-amber-700",
    Broken: "bg-red-50 text-red-700",
  };

  const [ equipModalOpen, setEquipModalOpen ] = useState(false);

  return (
    <div>
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
            farmId={farmId}
            onClose={() => setEquipModalOpen(false)}
            onAdded={onAdded}
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
    </div>
  );
}

export default EquipmentCardInFarmDetails;
