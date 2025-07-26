import UserCard from "./UserCard";
import { getRequests } from "../../utils/helpers";
import { useEffect, useState } from "react";


const Requests = () => {
  const [requests, setRequests] = useState([])

useEffect(() => {
  const fetchRequests = async () => {
      const res = await getRequests();
      console.log(res);
      setRequests(res);
    
  };

  fetchRequests();
}, []);


  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {requests.map((request) => (
          <UserCard key={request._id} request={request } />
        ))}
      </div>
    </div>
  );
};

export default Requests;