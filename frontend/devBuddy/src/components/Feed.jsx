import axios from "axios";
import { useSwipeable } from "react-swipeable";

import UserCard from "./UserCard";
import { fetchFeed } from "../../utils/helpers";

import { useEffect, useState } from "react";
const Feed = () => {
  const handlers = useSwipeable({
  onSwipedLeft: () => handleNext(),
  onSwipedRight: () => handlePrevious(),
  preventDefaultTouchmoveEvent: true,
  trackMouse: true, 
});

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    (async () => {
      setCurrentIndex(0)
      const data = await fetchFeed(page);
      setUsers(data);
      console.log("response", data);
    })();
  }, [page]);

  const handlePrevious = () => {
    if(currentIndex < users.length && currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex-1)
    }
  }
  const handleNext = () => {
    if(currentIndex < users.length && currentIndex + 1 < users.length)
    {
      setCurrentIndex(currentIndex + 1)
      const index = currentIndex
      console.log(index)  
    }
    if(currentIndex + 1 >= users.length){
      
      setPage(page+1)
      
    }
  }
  if(users.length == 0) {
    return (
      <div>
        Sorry no more people to add here
      </div>
    )
  }

  return (
    <div className="flex flex-wrap m-10">
      <div className="flex flex-wrap gap-20 w-full" {...handlers}>
        <UserCard key={users[currentIndex]._id} {...users[currentIndex]} />
      </div>
    </div>
    
  );
};
export default Feed;
