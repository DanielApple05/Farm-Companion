// Simple animated placeholder block
const Pulse = ({ className = "" }) => (
  <div className={`bg-gray-100 rounded-md animate-pulse ${className}`} />
);


const LivestockLoading = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Pulse className="w-9 h-9 rounded-lg" />
              <Pulse className="h-4 w-20" />
            </div>
            <Pulse className="w-4 h-4 rounded-full" />
          </div>

          <Pulse className="h-3 w-28" />

          <div className="flex items-center gap-4">
            <Pulse className="h-3 w-14" />
            <Pulse className="h-3 w-24" />
          </div>

          <div className="flex items-center justify-between mt-auto">
            <Pulse className="h-5 w-24 rounded-md" />
            <Pulse className="h-3 w-10" />
          </div>
        </div>
      ))}
    </>
  );
};

export default LivestockLoading;