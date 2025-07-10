import axios from "axios";
import { addUser } from "./userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



export const fetchUser = async () => {
    

    try {
   
      const response = await axios.get("http://localhost:6969/profile/view", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 2000,
      });
      console.log(response);
      return {response: response.data, status: response?.status};

    } catch (err) {
      console.log(err)
      const errorMessage = err?.response?.data || "Please log in first.";
      return {response: errorMessage, status: err?.response?.status}
      
    } 
  };
export const toLowerCaseFields = (fields) => {
  const lowered = {};
  for (const key in fields) {
    if (typeof fields[key] === "string") {
      lowered[key] = fields[key].toLowerCase();
    } else {
      lowered[key] = fields[key]; 
    }
  }
  return lowered;
};
