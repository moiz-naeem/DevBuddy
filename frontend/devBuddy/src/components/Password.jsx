import { useSelector } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { passwordRegex } from "../../utils/helpers";
const Password = () => {
  const user = useSelector((store) => store?.user);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [response, setResponse] = useState("");
  const [touched, setTouched] = useState({
    currentPassword: false,
    confirmNewPassword: false,
  });

  const isStrongCurrentPassword = passwordRegex.test(currentPassword);
  const passwordsMatch =
    confirmNewPassword.trim().length > 0 &&
    confirmNewPassword.trim() === newPassword.trim();

  const passwordSchema = Yup.object({
    currentPassword: Yup.string()
      .max(100, { message: "Password can not exceed 100 characters" })
      .required("Current password is required")
      .matches(passwordRegex, {
        message:
          "Current Password must be 8+ characters with uppercase, lowercase, number & special character.",
        excludeEmptyString: true,
      }),
    newPassword: Yup.string()
      .max(100, { message: "Password can not exceed 100 characters" })
      .required("New password is required")
      .matches(passwordRegex, {
        message:
          "New Password must be 8+ characters with uppercase, lowercase, number & special character.",
        excludeEmptyString: true,
      }),
    confirmNewPassword: Yup.string()
      .max(100, { message: "Password can not exceed 100 characters" })
      .required("Confirm new password is required")
      .matches(passwordRegex, {
        message:
          "New Password must be 8+ characters with uppercase, lowercase, number & special character.",
        excludeEmptyString: true,
      }),
  });

  const handlePasswordForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResponse("");
    try {
      console.log(currentPassword, newPassword, confirmNewPassword);
      await passwordSchema.validate({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      const res = await axios.patch(
        "http://localhost:6969/profile/password",
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      setResponse(res.data);
      console.log(res.data);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(
        err?.message || err?.response?.data || "Password update unsuccessfull"
      );
      console.log(
        err.message || err?.response?.data || "Password update  unsuccessfull"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* {!!error && 
                  <Alert message ={error} status = {"fail"}/>} */}

      {/* <h2 className="card-title flex justify-center">Login</h2> */}

      <form onSubmit={handlePasswordForm}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend ml-2">Current Password</legend>
          <input
            type="password"
            className="input ml-2 w-full"
            placeholder="Enter your current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, currentPassword: true }))
            }
            required
            disabled={isLoading}
          />
          <p
            className={`label ml-2 ${
             currentPassword && !isStrongCurrentPassword ? "text-red-400" : "text-white"
            }`}
          >
            {currentPassword && !isStrongCurrentPassword ? "Enter correct password" : "Required"}
          </p>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend ml-2">New Password</legend>
          <input
            type="password"
            className="input ml-2 w-full"
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            
            required
            disabled={isLoading}
          />
          <p className="label ml-2">Required</p>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend ml-2">Confirm Password</legend>
          <input
            type="password"
            className="input ml-2 w-full"
            placeholder="Confirm your new password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, confirmNewPassword: true }))
            }
            required
            disabled={isLoading}
          />
          <p
            className={`label ml-2 ${
             confirmNewPassword && !passwordsMatch ? "text-red-400" : "text-white"
            }`}
          >
            {confirmNewPassword &&!passwordsMatch ? "Passwords don't match" : "Required"}
          </p>
        </fieldset>

        <div className="card-actions flex justify-center ">
          <button
            type="submit"
            className="btn bg-primary btn-md rounded-md w-1/3"
            disabled={isLoading || !passwordsMatch || !isStrongCurrentPassword}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Password;
