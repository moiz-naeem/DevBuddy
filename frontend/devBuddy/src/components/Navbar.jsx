import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar() {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:6969/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      const errorMessage =
        err?.response?.data || "An error occurred while logging out. Try again";
      setError(errorMessage);
    } finally {
      dispatch(removeUser());
      setIsLoading(false);
      navigate("/auth", {
        state: {
          error: error || "Logged out successfully!"
        },
        replace: true,
      });
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1 ">
        <a className="btn btn-ghost text-xl bg-base-100" onClick={() => navigate("/")}>devBuddy</a>
      </div>
      {user && (
        <div className="flex gap-2">
          <div> Welcome {user?.data?.firstName} </div>
          <div className="dropdown dropdown-end mx-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between" onClick={()=> navigate("/profile")}>
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleSignOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
