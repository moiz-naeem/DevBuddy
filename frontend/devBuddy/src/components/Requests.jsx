import UserCard from "./UserCard";
import { getRequests } from "../../utils/helpers";
import { useEffect, useState } from "react";
import EmptyRequestShimmer from "./shimmer/EmptyRequestShimmer";
import ErrorShimmer from "./shimmer/ErrorShimmer";
import ShimmerRequestCard from "./shimmer/ShimmerRequestCard";

const Requests = () => {
  const [requests, setRequests] = useState([])
   const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getRequests();
      setRequests(res?.data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err?.response?.message || "Failed to fetch requests");
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

const handleRemove = (idToRemove) => {
    setRequests(prev => prev.filter(req => req._id !== idToRemove));
  };

if (error) {
    return <ErrorShimmer onRetry={fetchRequests} />;
  }

if (isLoading) {
    return (
      <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <ShimmerRequestCard key={index} />
          ))}
        </div>
      </div>
    );
  }

 if(requests.length == 0){
  return (
    <EmptyRequestShimmer/>
  )
 }



return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-500 mb-2">
          Connection Requests
        </h1>
        <p className="text-white">
          {requests.length} {requests.length === 1 ? 'request' : 'requests'} waiting for your response
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {requests.map((request) => (
          <UserCard 
            key={request._id} 
            request={request} 
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;