const EmptyRequestShimmer = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
    <div className="text-center max-w-md">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No New Requests
      </h3>
      

      <p className="text-gray-600 mb-6 leading-relaxed">
        You haven't received any new connection requests yet. Check back later or explore new profiles to connect with others.
      </p>
      

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
        Explore Profiles
      </button>
    </div>
  </div>
);

export default EmptyRequestShimmer