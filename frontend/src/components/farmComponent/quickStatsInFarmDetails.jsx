import React from 'react';
import { Sprout, PawPrint, Wrench } from 'lucide-react';

const QuickStatsInFarmDetails = ({crops, equipment, totalLivestock}) => {
  return (
    <>
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
    </>
  );
}

export default QuickStatsInFarmDetails;
