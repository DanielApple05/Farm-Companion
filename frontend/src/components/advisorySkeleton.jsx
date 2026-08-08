import Sidebar from "./sidebar";
import Header from "./header";

// Simple animated placeholder block — reused throughout the skeleton
const Pulse = ({ className = "" }) => (
  <div className={`bg-gray-100 rounded-md animate-pulse ${className}`} />
);

const AdvisorySkeleton = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Page header */}
          <div>
            <Pulse className="h-7 w-32" />
            <Pulse className="h-4 w-64 mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weather card skeleton */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Pulse className="h-3 w-24" />
                  <Pulse className="h-8 w-20" />
                  <Pulse className="h-3 w-28" />
                </div>
                <Pulse className="w-10 h-10 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <Pulse className="w-4 h-4 rounded-full" />
                    <Pulse className="h-3 w-10" />
                    <Pulse className="h-3 w-8" />
                  </div>
                ))}
              </div>
            </div>

            {/* Planting windows skeleton */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
              <Pulse className="h-4 w-36 mb-4" />
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <Pulse className="h-3 w-20" />
                    <div className="text-right space-y-1">
                      <Pulse className="h-3 w-28" />
                      <Pulse className="h-2.5 w-16 ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seasonal tips skeleton */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <Pulse className="h-4 w-40 mb-4" />
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Pulse className="w-8 h-8 rounded-lg shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Pulse className="h-3 w-52" />
                    <Pulse className="h-2.5 w-full max-w-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvisorySkeleton;
