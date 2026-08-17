import React from 'react';
import { Bug } from 'lucide-react';

const DiagnoseInCropDetails = ({diagnosisLogs}) => {
  return (
    <div>

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

        <div className="flex items-center justify-between gap-3 mb-4">

          <div>
            <h2 className="font-medium text-gray-900">
              Diagnosis History
            </h2>

            <p className="text-[11px] text-gray-400 mt-1">
              Previous crop health checks
            </p>
          </div>

          {diagnosisLogs.length > 0 && (
            <span className="shrink-0 text-xs text-gray-400">
              {diagnosisLogs.length}{" "}
              {diagnosisLogs.length === 1
                ? "record"
                : "records"}
            </span>
          )}

        </div>

        {diagnosisLogs.length === 0 ? (
          <div className="py-6 text-center">

            <div className="w-10 h-10 mx-auto rounded-full bg-gray-50 flex items-center justify-center">
              <Bug
                size={19}
                className="text-gray-300"
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              No diagnoses yet for this crop.
            </p>

          </div>
        ) : (
          <div className="space-y-3">

            {diagnosisLogs.map((log) => (
              <div
                key={log._id}
                className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 sm:p-4"
              >

                <div className="flex items-start gap-3">

                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <Bug
                      size={14}
                      className="text-amber-600"
                    />
                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 break-words">
                          {log.disease}
                        </p>

                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(
                            log.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <span className="shrink-0 text-[10px] sm:text-[11px] bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                        {log.confidence}% match
                      </span>

                    </div>

                    {log.explanation && (
                      <p className="text-xs text-gray-600 leading-relaxed mt-3">
                        {log.explanation}
                      </p>
                    )}

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </section>
    </div>
  );
}

export default DiagnoseInCropDetails;
