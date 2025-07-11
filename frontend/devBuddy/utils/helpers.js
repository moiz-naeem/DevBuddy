import axios from "axios";



export const fetchUser = async () => {
    

    try {
   
      const response = await axios.get("http://localhost:6969/profile/view", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 2000,
      });
      return {response: response.data, status: response?.status};

    } catch (err) {
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


export const capitalizeText = (obj) => {
  if (!obj || typeof obj !== "object") return {};

  const capitalize = (text) => {
    if (!text || typeof text !== "string") return text;

    text = text.trim();

    if (!/[.!?]/.test(text)) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return text.replace(/(^\s*\w|[.!?]\s*\w)/g, match => match.toUpperCase());
  };

  const updatedObj = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key];
      updatedObj[key] = typeof value === "string" ? capitalize(value) : value;
    }
  }

  return updatedObj;
};

export const objToLowerCase = (obj) => {
  if (!obj || typeof obj !== "object") return {};

  const lowercase = (text) => {
    if (!text || typeof text !== "string") return text;

    text = text.trim();

    if (!/[.!?]/.test(text)) {
      return text.charAt(0).toLowerCase() + text.slice(1);
    }

    return text.replace(/(^\s*\w|[.!?]\s*\w)/g, match => match.toLowerCase());
  };

  const updatedObj = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key];
      updatedObj[key] = typeof value === "string" ? lowercase(value) : value;
    }
  }

  return updatedObj;
};

