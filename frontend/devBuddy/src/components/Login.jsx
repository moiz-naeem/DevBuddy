import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("elon@gmail.com");
  const [password, setPassword] = useState("Idontknowman2@");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginForm = async (formData) => {
    try{

       const res = await axios.post(
      "http://localhost:6969/login",
      { email, password },
      { withCredentials: true }
       );
       console.log(res.data)
        dispatch(addUser(res.data))
        return navigate('/')


    }catch(err){
        console.log(err.message)
    }
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
