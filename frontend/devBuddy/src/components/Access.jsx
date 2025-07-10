import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Access = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-neutral text-primary-content w-100">
        <div className="card-body">
          <div className="fieldset join flex justify-center w-auto pr-7 pt-4 pl-2">
            <button
              className={`btn join-item w-1/2 rounded-md ${
                !isLogin ? "bg-primary text-white" : "bg-gray-400"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <button
              className={`btn join-item w-1/2 rounded-md ${
                isLogin ? "bg-primary text-white" : "bg-gray-400"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
          {isLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Access;
