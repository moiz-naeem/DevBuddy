import UserCard from "./UserCard";
import { getRequests } from "../../utils/helpers";
import { useEffect, useState } from "react";


const Requests = () => {
  const [requests, setRequests] = useState([])

useEffect(() => {
  const fetchRequests = async () => {
      const res = await getRequests();
      setRequests(res?.data);
    
  };

  fetchRequests();
}, []);

const handleRemove = (idToRemove) => {
    setRequests(prev => prev.filter(req => req._id !== idToRemove));
  };

 if(requests.length == 0){
  return (
    <div className="flex justify-center">
        You have not received any new request please check back later
    </div>
  )
 }



  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {requests.map((request) => (
          <UserCard key={request._id} request={request } onRemove = {handleRemove}/>
        ))}
      </div>
    </div>
  );
};

export default Requests;