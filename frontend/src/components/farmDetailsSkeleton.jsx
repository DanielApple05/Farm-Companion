import React from 'react';

const FarmDetailsSkeleton = () => {
  return (
      <>
          <div className="flex-1 mt-20 p-6 bg-gray-50 w-full">
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
      </>
    );
  }

export default FarmDetailsSkeleton;
