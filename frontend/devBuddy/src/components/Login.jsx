import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";


const Login = () => {
  const [email, setEmail] = useState("elon@gmail.com");
  const [password, setPassword] = useState("Idontknowman2@");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store?.user);


  useEffect(() => {
    const stateError = location?.state?.error;
    if (stateError) {
      setError(stateError);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);


  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(""); // Clear previous errors
      
      const res = await axios.post(
        "http://localhost:6969/login",
        { email, password },
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data));
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.response?.data || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-neutral text-primary-content w-96">
        <div className="card-body">
          {error && <Alert error={error} />}
          
          <h2 className="card-title flex justify-center">Login</h2>
          
          <form onSubmit={handleLoginForm}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="label">Required</p>
            </fieldset>
            
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="label">Required</p>
            </fieldset>
            
            <div className="card-actions flex justify-center">
              <button
                type="submit"
                className="btn bg-primary btn-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;