import React from 'react';
import {
  Bug, Leaf, Loader2
} from "lucide-react";
import { capitalizeFirst } from '../helpers';

const DiagnosisCard = ({ recentDiagnoses, cropError, cropLoading }) => {
  return (
    <div>
      {cropLoading && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <Loader2
            size={20}
            className="animate-spin"
          />

          <p className="text-sm mt-2">
            Loading crop Diagnosis...
          </p>
        </div>
      )}
      {
        !cropLoading && !cropError && recentDiagnoses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Leaf
              size={24}
              className="text-gray-300"
            />

            <p className="text-sm text-gray-500 mt-2">
              No farm knowledge available today.
            </p>
          </div>
        )
      }

      {/* Error */}
      {cropError && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Bug
            size={24}
            className="text-gray-300"
          />

          <p className="text-sm text-gray-600 mt-2">
            {cropError}
          </p>
        </div>
      )}

      {recentDiagnoses.map((diagnosis) => (
        <div
          key={diagnosis._id}
          className="flex items-center justify-between gap-4 p-3 mb-2 rounded-xl bg-gray-50 border border-gray-100"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
              <Bug size={16} className="text-amber-600" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {capitalizeFirst(diagnosis.disease)}
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                {capitalizeFirst(diagnosis.cropName)}
                {" · "}
                {new Date(diagnosis.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <span className="shrink-0 text-[11px] bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
            {diagnosis.confidence}% match
          </span>
        </div>
      ))}
    </div>
  );
}

export default DiagnosisCard;
