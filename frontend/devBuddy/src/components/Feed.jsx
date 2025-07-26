import React, { useState, useEffect } from "react";

import { fetchFeed } from "../../utils/helpers";
import SwipeCard from "./SwipeCard";
import ShimmerCard from "./shimmer/ShimmerCard";
import EmptyRequestShimmer from "./shimmer/EmptyRequestShimmer";



const Feed = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNewUsers = async (pageNum) => {
    setLoading(true);
    try {
      const data = await fetchFeed(pageNum);
      setUsers(data);

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
    setPage(prev => {

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
      <EmptyRequestShimmer heading={"No New Users"} secondaryHeading={"You have already interacted with all of the registered users. Check back later requests to connect with others."}
    buttonTitle={"Explore Requests"} action = {"/requests"}/>
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