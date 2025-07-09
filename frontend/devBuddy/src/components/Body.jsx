
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { fetchUser } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { addUser } from "../../utils/userSlice";
import { useDispatch } from "react-redux";

const Body = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


useEffect(() => {
  const loadUser = async () => {
    setIsLoading(true);
    if (!user) {
      const data = await fetchUser();
      
      if (data.status === 200) {
        dispatch(addUser(data.response));
      } else {
        navigate("/login", { state: { error: data.response }, replace: true });
      }
    }
    setIsLoading(false);
  };

  loadUser();
}, []);

if (isLoading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  );
}

return (
  <div>
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);
};

export default Body;