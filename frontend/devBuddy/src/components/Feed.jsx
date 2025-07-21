import axios from "axios";
import UserCard from "./UserCard";
import { fetchFeed } from "../../utils/helpers";

import { useEffect, useState } from "react";
const Feed = () => {
  const [users, setUsers] = useState([]);
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
      {users.map((user) => (
        <UserCard key={user._id} {...user} />
      ))}
    </div>
    </div>
    
  );
};
export default Feed;
