import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import * as Yup from "yup";


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
    if (!location.state?.error) {
      setError("");
    }
  }, []);



  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const loginSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
        .lowercase("Email should be in lowercase"),
      password: Yup.string()
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
          message:
            "Password must be 8+ characters with uppercase, lowercase, number & special character.",
          excludeEmptyString: true,
        }),
    });

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    

    try {
      setError("");
      const payload = { email, password };

      await loginSchema.validate(payload)

      const res = await axios.post(
        "http://localhost:6969/login",
        { email, password },
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data));
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err)
      setError(err?.response?.data || err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return null;
  }

  return (
    // <div className="flex justify-center mt-10">
    //   <div className="card bg-neutral text-primary-content w-96">
        // <div className="card-body">
        <div>
          {!!error && 
          <Alert message ={error} status = {"fail"}/>}
          
          {/* <h2 className="card-title flex justify-center">Login</h2> */}
          
          <form onSubmit={handleLoginForm}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend ml-2">Email</legend>
              <input
                type="email"
                className="input ml-2"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="label ml-2">Required</p>
            </fieldset>
            
            <fieldset className="fieldset">
              <legend className="fieldset-legend ml-2">Password</legend>
              <input
                type="password"
                className="input ml-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="label ml-2">Required</p>
            </fieldset>
            
            <div className="card-actions flex justify-center ">
              <button
                type="submit"
                className="btn bg-primary btn-md rounded-md w-1/3"
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

    //   </div>
    // </div>
  );
};

export default Login;