const ErrorShimmer = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
    <div className="text-center max-w-md">

      <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed">
        We couldn't load your requests. Please check your internet connection and try again.
      </p>
      

      <button 
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  </div>
);
export default ErrorShimmer;