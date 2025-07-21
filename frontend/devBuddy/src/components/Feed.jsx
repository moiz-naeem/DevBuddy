import axios from "axios";
import UserCard from "./UserCard";
import { fetchFeed } from "../../utils/helpers";

import { useEffect, useState } from "react";
const Feed = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    (async () => {
      const data = await fetchFeed();
      setUsers(data);
      console.log("response", data);
    })();
  }, []);

  return (
    <div className="flex flex-wrap m-10">
        <div className="flex flex-wrap gap-8">
      
        <button className=" bg-black" onClick={()=> {if(currentIndex < users.length) setCurrentIndex(currentIndex-1)}}> Previous </button>
        <UserCard key={currentIndex} {...users[currentIndex]} />
        <button className=" bg-black" onClick={()=> setCurrentIndex(currentIndex+1)}> Next </button>

      
    </div>
    </div>
    
  );
};
export default Feed;
