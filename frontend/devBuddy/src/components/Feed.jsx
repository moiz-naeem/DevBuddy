import React, { useState, useEffect } from "react";

import { fetchFeed } from "../../utils/helpers";
import SwipeCard from "./SwipeCard";
import ShimmerCard from "./ShimmerCard";



const Feed = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNewUsers = async (pageNum) => {
    setLoading(true);
    try {
      const data = await fetchFeed(pageNum);
      setUsers(data);
      console.log("Fetched users for page", pageNum, ":", data);
    } catch (error) {
      console.error("Error fetching users:", error);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchNewUsers(page);
  }, [page]);

  const handleLastCardRemoved = () => {
    console.log("Last card removed, fetching next page...");
    setPage(prev => {
      console.log("Setting page from", prev, "to", prev + 1);
      return prev + 1;
    });
  };


  if (loading) {
    return (
      <div className="flex flex-wrap m-10">
        <div className="flex flex-wrap gap-20 w-full justify-center">
          <div className="relative h-[500px] w-full flex justify-center items-center bg-gray-100">
            <ShimmerCard />
          </div>
        </div>
      </div>
    );
  }


  if (users?.length === 0 && !loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <p className="text-xl text-gray-600">Sorry, no more people to add here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap m-10">
      <div className="flex flex-wrap gap-20 w-full justify-center">
        <div className="relative h-[500px] w-full flex justify-center items-center bg-gray-100">
          {users.map((user) => (
            <SwipeCard
              key={user._id}
              cards={users}
              setCards={setUsers}
              onCardRemoved={handleLastCardRemoved}
              {...user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;