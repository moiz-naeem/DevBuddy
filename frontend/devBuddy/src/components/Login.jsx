import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginForm = (formData) => {
    axios.post(
      "http://localhost:6969/login",
      { email, password },
      { withCredentials: true }
    );
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-neutral text-primary-content w-96 ">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input"
              placeholder="email@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="label">Required</p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="label">Required</p>
          </fieldset>
          <div className="card-actions flex justify-center">
            <button
              className="btn bg-primary btn-md "
              onClick={(e) => handleLoginForm(e.target.value)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
