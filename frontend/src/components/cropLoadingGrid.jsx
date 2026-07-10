// Simple animated placeholder block
const Pulse = ({ className = "" }) => (
  <div className={`bg-gray-100 rounded-md animate-pulse ${className}`} />
);

// Drop this in wherever crops.map(...) normally renders, while loading is true
const CropsLoadingGrid = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Pulse className="w-9 h-9 rounded-lg" />
            <Pulse className="h-4 w-24" />
          </div>

          <Pulse className="h-3 w-32" />

          <div className="flex items-center gap-4">
            <Pulse className="h-3 w-16" />
            <Pulse className="h-3 w-20" />
          </div>

          <div className="flex items-center justify-between mt-auto">
            <Pulse className="h-5 w-16 rounded-md" />
            <Pulse className="h-3 w-12" />
          </div>
        </div>
      ))}
    </>
  );
};

export default CropsLoadingGrid;