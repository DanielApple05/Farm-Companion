const FarmCardSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4 animate-pulse ">
          {/* Farm Name & Location */}
          <div>
            <div className="h-5 w-40 bg-gray-200 rounded"></div>

            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              <div className="h-3 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Link */}
          <div className="flex items-center gap-2 mt-auto">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FarmCardSkeleton;