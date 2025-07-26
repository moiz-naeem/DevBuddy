const ShimmerRequestCard = () => {
    return (
        
  <div className="w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] bg-gray-900 rounded-lg overflow-hidden shadow-md flex flex-col animate-pulse">

    <div className="h-48 sm:h-56 md:h-64 lg:h-72 w-full bg-gray-700 flex-shrink-0"></div>

    <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-h-[180px]">
      <div className="flex-grow space-y-2 sm:space-y-3">

        <div className="flex justify-between items-center">
          <div className="h-4 sm:h-5 md:h-6 bg-gray-700 rounded w-32 sm:w-40"></div>
          <div className="h-4 sm:h-5 bg-gray-700 rounded w-8"></div>
        </div>


        <div className="space-y-2">
          <div className="h-3 sm:h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-3 sm:h-4 bg-gray-700 rounded w-3/4"></div>
        </div>


        <div className="flex flex-wrap gap-1 sm:gap-2">
          <div className="h-6 sm:h-7 md:h-8 bg-gray-700 rounded w-16 sm:w-20"></div>
          <div className="h-6 sm:h-7 md:h-8 bg-gray-700 rounded w-14 sm:w-18"></div>
          <div className="h-6 sm:h-7 md:h-8 bg-gray-700 rounded w-12 sm:w-16"></div>
          <div className="h-6 sm:h-7 md:h-8 bg-gray-700 rounded w-10 sm:w-14"></div>
        </div>
      </div>


      <div className="flex w-full justify-end gap-2 mt-4 pt-2 border-t border-gray-700">
        <div className="h-9 sm:h-10 bg-gray-700 rounded flex-1"></div>
        <div className="h-9 sm:h-10 bg-gray-700 rounded flex-1"></div>
      </div>
    </div>
  </div>
);

    

}

export default ShimmerRequestCard