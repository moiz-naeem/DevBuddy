import axios from "axios";

import { fetchFeed } from "../../utils/helpers";
import SwipeCards from "./SwipeCard";

import { useEffect, useState } from "react";
const Feed = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)


  
  useEffect(() => {
    (async () => {
      const data = await fetchFeed(page);

      setUsers(data); 
       console.log("response", data);
    })();
  }, [page]);

 
  return(
    <>
      { users?.length === 0 ? (
        <p>Sorry, no more people to add here</p>
      ) : (
    <div className="flex flex-wrap m-10">
      <div className="flex flex-wrap gap-20 w-full" >
        <SwipeCards key={`page-${page}`} users = {users} setPage={setPage} />
      </div>
    </div>

    
    ) }
    </>
  )
};
export default Feed;
