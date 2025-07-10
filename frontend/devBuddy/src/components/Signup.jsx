
import { useState } from "react";
import * as Yup from "yup";
import { toLowerCaseFields } from "../../utils/helpers";

const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const signUpSchema = Yup.object(
      {
      firstName: Yup.string().required("First name is required").min(3).max(50).lowercase("First name must be lowercase"),
      lastName: Yup.string().required("Last name is required").min(3).max(50).lowercase("Last name must be lowercase"),
      email: Yup.string().email("Invalid email").required("Email is required").lowercase("Email should be in lowercase"),
      password: Yup.string().required("Password is required").matches
      (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      {
      message:
        "Password must be at least 8 characters long and include one uppercase, one lowercase, one number, and one special character.",
      excludeEmptyString: true,
      }
      )

    }) 
    

    const handleSignUpForm = async (e) => {
      e.preventDefault();
      const payload = {firstName, lastName, password, email}
      const isValidPayload = await signUpSchema.validate(payload);
      

    }

    return(
        <div className="flex justify-center mt-10">
              <div className="card bg-neutral text-primary-content w-96">
                <div className="card-body">
                  {error && <Alert error={error} />}
                  
                  <h2 className="card-title flex justify-center">Sign up</h2>
                  
                  <form onSubmit={handleSignUpForm}>
                    <div className="flex">
                        <fieldset className="fieldset">
                      <legend className="fieldset-legend">First Name</legend>
                      <input
                        type="text"
                        className="input"
                        placeholder="Jim"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                      <p className="label">Required</p>
                    </fieldset>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Last Name</legend>
                      <input
                        type="text"
                        className="input"
                        placeholder="Simons"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                      <p className="label">Required</p>
                    </fieldset>
                    </div>
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
                          "Sign Up"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        
    )
}

export default Signup;