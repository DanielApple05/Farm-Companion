import React from 'react';
import { Leaf, CloudRain } from 'lucide-react';

const TipsInCropDetails = ({cropTips, weatherTips}) => {
  return (
    <div>
      {cropTips.length > 0 && (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

          <div className="flex items-center justify-between gap-3 mb-4">

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Leaf
                  size={15}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="font-medium text-gray-900">
                  Crop Tips
                </h2>

                <p className="text-[11px] text-gray-400">
                  Advice for this crop
                </p>
              </div>
            </div>

            <span className="text-xs text-gray-400 shrink-0">
              {cropTips.length}{" "}
              {cropTips.length === 1
                ? "tip"
                : "tips"}
            </span>

          </div>

          <div className="space-y-3">

            {cropTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-green-50/70 border border-green-100 rounded-xl p-3.5"
              >
                <div className="flex items-start justify-between gap-3">

                  <h3 className="text-sm font-medium text-gray-900">
                    {tip.title}
                  </h3>

                  {tip.severity && (
                    <span className="shrink-0 text-[10px] font-medium text-green-700 capitalize">
                      {tip.severity}
                    </span>
                  )}

                </div>

                <p className="text-xs text-gray-600 leading-relaxed mt-1.5">
                  {tip.body}
                </p>
              </div>
            ))}

          </div>
        </section>
      )}

      {/* Weather Tips */}
      {weatherTips.length > 0 && (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

          <div className="flex items-center justify-between gap-3 mb-4">

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <CloudRain
                  size={15}
                  className="text-blue-500"
                />
              </div>

              <div>
                <h2 className="font-medium text-gray-900">
                  Weather Tips
                </h2>

                <p className="text-[11px] text-gray-400">
                  Based on current conditions
                </p>
              </div>
            </div>

            <span className="text-[11px] text-gray-400">
              Weather-based
            </span>

          </div>

          <div className="space-y-3">

            {weatherTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5"
              >

                <div className="flex items-start justify-between gap-3">

                  <h3 className="text-sm font-medium text-gray-900">
                    {tip.title}
                  </h3>

                  {tip.severity && (
                    <span className="shrink-0 text-[10px] font-medium text-blue-700 capitalize">
                      {tip.severity}
                    </span>
                  )}

                </div>

                <p className="text-xs text-gray-600 leading-relaxed mt-1.5">
                  {tip.body}
                </p>

              </div>
            ))}

          </div>
        </section>
      )}

      {/* No tips */}
      {cropTips.length === 0 &&
        weatherTips.length === 0 && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                <Leaf
                  size={16}
                  className="text-gray-400"
                />
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  No tips available right now.
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Relevant advice will appear as your crop develops.
                </p>
              </div>

            </div>
          </section>
        )}
    </div>
  );
}

export default TipsInCropDetails;
