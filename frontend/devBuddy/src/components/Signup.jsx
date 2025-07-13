import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Alert from "./Alert";

const Signup = () => {
  const [firstName, setFirstName] = useState("Jim");
  const [lastName, setLastName] = useState("Simons");
  const [email, setEmail] = useState("jim@gmail.com");
  const [password, setPassword] = useState("Idontknowman2@");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({});

  const signUpSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(3)
      .max(50)
      .lowercase("First name must be lowercase"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(3)
      .max(50)
      .lowercase("Last name must be lowercase"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .lowercase("Email should be in lowercase"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
        message:
          "Password must be at least 8 characters long and include one uppercase, one lowercase, one number, and one special character.",
        excludeEmptyString: true,
      }),
  });

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    

    try {
      const payload = { firstName, lastName, password, email };
      setError("");
      await signUpSchema.validate(payload);
      
      const res = await axios.post("http://localhost:6969/signup", payload, {
        withCredentials: true,
      });
      setResponse(res.data);

      setIsLoading(false);
    } catch (err) {
      setResponse({...err.response.data});
      setIsLoading(false);
    }
  };

  return (
    // <div className="flex justify-center mt-10">
    //       <div className="card bg-neutral text-primary-content w-96">
    // <div className="card-body">
    <div>
    {
      Object.keys(response).length > 0 &&  <div className="pl-2 mt-2 jsutify-centre">
        <Alert {...response} />
        </div>

    }
    <form onSubmit={handleSignUpForm} className="max-w-xl mx-auto space-y-4">
      <div className="flex gap-4 w-full">
        <fieldset className="w-1/2">
          <legend className="fieldset-legend">First Name</legend>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Jim"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={isLoading}
          />
          <p className="label">Required</p>
        </fieldset>

        <fieldset className="w-1/2">
          <legend className="fieldset-legend">Last Name</legend>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Simons"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={isLoading}
          />
          <p className="label">Required</p>
        </fieldset>
      </div>

      <fieldset className="w-full">
        <legend className="fieldset-legend">Email</legend>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="email@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <p className="label">Required</p>
      </fieldset>

      <fieldset className="w-full">
        <legend className="fieldset-legend">Password</legend>
        <input
          type="password"
          className="input input-bordered w-full"
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
          className="btn bg-primary btn-md w-1/3 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </form>
    </div>
  );
};

export default Signup;
