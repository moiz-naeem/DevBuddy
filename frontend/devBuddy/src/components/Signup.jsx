import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Alert from "./Alert";
import { passwordRegex } from "../../utils/helpers";
import { motion } from "framer-motion";

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
      .matches(passwordRegex, 
          "Password must be at least 8 characters long and include one uppercase, one lowercase, one number, and one special character.",
        {excludeEmptyString: true,
      }),
  });

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse("")

    try {
      const payload = { firstName, lastName, password, email };
      setError("");
      await signUpSchema.validate(payload);
      const res = await axios.post("http://localhost:6969/signup", payload, {
        withCredentials: true,
      });
      setResponse(res.data);

    } catch (err) {
      setResponse({...err?.response?.data || err.message || "Registration unsuccessful"});
    }finally{
      setIsLoading(false)
    }
  };

  return (
    // <div className="flex justify-center mt-10">
    //       <div className="card bg-neutral text-primary-content w-96">
    // <div className="card-body">
    <div>
    {response.message && <Alert message={response.message} status={response.status} />
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
        <motion.button
          type="submit"
          className="btn bg-primary text-white px-6 py-2 self-center mx-auto min-w-fit"
          disabled={isLoading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Sign Up"
          )}
        </motion.button>
      </div>
    </form>
    </div>
  );
};

export default Signup;
