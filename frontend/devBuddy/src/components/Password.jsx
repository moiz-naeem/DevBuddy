import { useSelector } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { passwordRegex } from "../../utils/helpers";
import Alert from "./Alert";
const Password = () => {
  const user = useSelector((store) => store?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", status: "" });
  

  const isStrongCurrentPassword = currentPassword.trim().length > 0 ? passwordRegex.test(currentPassword) : true;
  const isStrongNewPassword = newPassword.trim().length > 0 ? passwordRegex.test(newPassword) : true;
  const passwordsMatch = confirmNewPassword.trim().length > 0 && newPassword.trim().length > 0 
    ? confirmNewPassword.trim() === newPassword.trim() 
    : true;

  const newAndOldMatch = newPassword.trim().length > 0 && currentPassword.trim().length > 0 
    ? newPassword.trim() === currentPassword.trim() 
    : false;

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
    setAlert({ message: "", status: "" });

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
      setAlert({ message: res.data.message, status: res.data.status });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setAlert({
        message:
          err?.message || err?.response?.data?.message || "Password update unsuccessful",
        status: "fail",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {alert.message && <Alert message={alert.message} status={alert.status} />}

      <form onSubmit={handlePasswordForm}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend ml-2">Current Password</legend>
          <input
            type="password"
            className="input ml-2 w-full"
            placeholder="Enter your current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            
            required
            disabled={isLoading}
          />
          <p
            className={`label ml-2 ${
              currentPassword.trim().length > 0 && !isStrongCurrentPassword
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {currentPassword && !isStrongCurrentPassword
              ? "Password must be 8+ characters with uppercase, lowercase, number & special character"
              : "Required"}
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
          <p className={`label ml-2 ${newPassword.trim().length > 0 && !isStrongCurrentPassword || newAndOldMatch ? "text-red-400":"white" }`}>{newAndOldMatch
              ? "New and current password cannot be the same"
              : newPassword.trim().length > 0 && !isStrongNewPassword
              ? "Password must be 8+ characters with uppercase, lowercase, number & special character" : "Required" }</p>
          
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend ml-2">Confirm Password</legend>
          <input
            type="password"
            className="input ml-2 w-full"
            placeholder="Confirm your new password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <p
            className={`label ml-2 ${
              confirmNewPassword.trim().length > 0 && (!passwordsMatch || newAndOldMatch)
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {confirmNewPassword.trim().length > 0 && newAndOldMatch
              ? "New and current password cannot be the same"
              : confirmNewPassword.trim().length > 0 && !passwordsMatch
              ? "Passwords don't match"
              : "Required"}
          </p>
        </fieldset>

        <div className="card-actions flex justify-center ">
          <button
            type="submit"
            className="btn bg-primary btn-md rounded-md w-1/3"
            disabled={
              isLoading ||
              !passwordsMatch ||
              !isStrongCurrentPassword ||
              newAndOldMatch
            }
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
