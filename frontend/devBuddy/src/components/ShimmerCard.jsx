const ShimmerCard = () => (
  <div className="animate-pulse bg-black w-96 shadow-sm absolute rounded-lg">
    <div className="h-96 w-full rounded-t-lg bg-gray-700"></div>
    <div className="p-4 space-y-4">
      <div className="flex gap-3">
        <div className="h-6 bg-gray-700 rounded w-32"></div>
        <div className="h-6 bg-gray-700 rounded w-8"></div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="flex flex-wrap gap-2">
        <div className="h-8 bg-gray-700 rounded w-16"></div>
        <div className="h-8 bg-gray-700 rounded w-20"></div>
        <div className="h-8 bg-gray-700 rounded w-14"></div>
      </div>
      <div className="flex gap-2 justify-end">
        <div className="h-10 bg-gray-700 rounded w-16"></div>
        <div className="h-10 bg-gray-700 rounded w-20"></div>
      </div>
    </div>
  </div>
);
export default ShimmerCard