import axios from "axios";

export const fetchFeed = async(page) => {
  try{
        const res = await axios.get(`http://localhost:6969/feed?page=${page}&&limit=10`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 2000,
      });

      return res?.data?.users;

    }catch(err){
        console.log(err.message || err?.response?.data || "Error while fetching the data")

    }
}
export const reviewRequest = async(status, requestId) =>{
   try{
    const res = await axios({
        method: "POST",
        url: `http://localhost:6969/request/review/${status}/${requestId}`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 1000,
      });

  }catch(err){
    console.log(err.message || err?.response?.data || "Error while fetching the data")
  }


}

export const sendRequest = async (status, userId) => {
  try{
    const res = await axios({
        method: "POST",
        url: `http://localhost:6969/request/send/${status}/${userId}`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 1000,
      });

  }catch{
    console.log(err.message || err?.response?.data || "Error while fetching the data")
  }
}
export const getRequests = async () => {
  try{
    const res = await axios({
        method: "GET",
        url: `http://localhost:6969/user/request/received`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 1000,
      });
      console.log(res?.data?.data)
      return res?.data?.data

  }catch(err){
    console.log(err.message || err?.response?.data || "Error while fetching the data")
  }
}

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

  const updatedObj = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key];
      updatedObj[key] = typeof value === "string" ? value.trim().toLowerCase() : value;
    }
  }

  return updatedObj;
};
export const normalizeValue = (val) => {
  if (typeof val === "string") return val.trim().toLowerCase();
  if (Array.isArray(val)) {
    if (val.length > 0 && typeof val[0] === "object") {
      return [...val].sort((a, b) => a.id - b.id);
    }
    return val; 
  }
  return val;
};

export function getChangedFields(original, updated) {
  const changes = {};
  for (const key in updated) {

    if (JSON.stringify(original[key]) !== JSON.stringify(updated[key])) {
      changes[key] = updated[key];

      
    }
  }

  return changes;
}

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/ ;


export const skillOptions = [
  { id: 1, label: 'JavaScript' },
  { id: 2, label: 'TypeScript' },
  { id: 3, label: 'Python' },
  { id: 4, label: 'Java' },
  { id: 5, label: 'C++' },
  { id: 6, label: 'C#' },
  { id: 7, label: 'Go' },
  { id: 8, label: 'Ruby' },
  { id: 9, label: 'PHP' },
  { id: 10, label: 'SQL' },
  { id: 11, label: 'HTML' },
  { id: 12, label: 'CSS' },
  { id: 13, label: 'React' },
  { id: 14, label: 'Vue.js' },
  { id: 15, label: 'Angular' },
  { id: 16, label: 'Node.js' },
  { id: 17, label: 'Express.js' },
  { id: 18, label: 'Next.js' },
  { id: 19, label: 'REST APIs' },
  { id: 20, label: 'GraphQL' },
  { id: 21, label: 'Docker' },
  { id: 22, label: 'Kubernetes' },
  { id: 23, label: 'CI/CD' },
  { id: 24, label: 'AWS' },
  { id: 25, label: 'Azure' },
  { id: 26, label: 'Google Cloud' },
  { id: 27, label: 'Linux' },
  { id: 28, label: 'Agile Methodologies' },
  { id: 29, label: 'Scrum' },
  { id: 30, label: 'Git' },
  { id: 31, label: 'Jira' },
  { id: 32, label: 'Unit Testing' },
  { id: 33, label: 'Integration Testing' },
  { id: 34, label: 'Test-Driven Development' },
  { id: 35, label: 'Microservices' },
  { id: 36, label: 'Monorepo Management' },
  { id: 37, label: 'Product Management' },
  { id: 38, label: 'Product Roadmapping' },
  { id: 39, label: 'User Research' },
  { id: 40, label: 'UI/UX Design' },
  { id: 41, label: 'Wireframing' },
  { id: 42, label: 'Figma' },
  { id: 43, label: 'Prototyping' },
  { id: 44, label: 'A/B Testing' },
  { id: 45, label: 'MVP Development' },
  { id: 46, label: 'Customer Journey Mapping' },
  { id: 47, label: 'Feature Prioritization' },
  { id: 48, label: 'Kano Model' },
  { id: 49, label: 'Lean Startup' },
  { id: 50, label: 'Design Thinking' },
  { id: 51, label: 'Business Strategy' },
  { id: 52, label: 'Market Analysis' },
  { id: 53, label: 'Data Analysis' },
  { id: 54, label: 'Business Intelligence' },
  { id: 55, label: 'Power BI' },
  { id: 56, label: 'Tableau' },
  { id: 57, label: 'Excel' },
  { id: 58, label: 'OKRs' },
  { id: 59, label: 'KPI Tracking' },
  { id: 60, label: 'Financial Modeling' },
  { id: 61, label: 'Competitive Analysis' },
  { id: 62, label: 'Operations Management' },
  { id: 63, label: 'Stakeholder Management' },
  { id: 64, label: 'Pitch Deck Creation' },
  { id: 65, label: 'Business Planning' },
  { id: 66, label: 'Accounting' },
  { id: 67, label: 'Bookkeeping' },
  { id: 68, label: 'Budgeting' },
  { id: 69, label: 'Financial Reporting' },
  { id: 70, label: 'Cash Flow Management' },
  { id: 71, label: 'Investment Analysis' },
  { id: 72, label: 'Corporate Finance' },
  { id: 73, label: 'Financial Forecasting' },
  { id: 74, label: 'Valuation' },
  { id: 75, label: 'Risk Management' },
  { id: 76, label: 'Startup Strategy' },
  { id: 77, label: 'Fundraising' },
  { id: 78, label: 'Venture Capital' },
  { id: 79, label: 'Angel Investing' },
  { id: 80, label: 'Bootstrapping' },
  { id: 81, label: 'Business Model Canvas' },
  { id: 82, label: 'Elevator Pitch' },
  { id: 83, label: 'Growth Hacking' },
  { id: 84, label: 'Customer Development' },
  { id: 85, label: 'Go-to-Market Strategy' },
  { id: 86, label: 'Networking' },
  { id: 87, label: 'Lean Canvas' },
  { id: 88, label: 'Recruitment' },
  { id: 89, label: 'Talent Acquisition' },
  { id: 90, label: 'Interviewing' },
  { id: 91, label: 'Employee Onboarding' },
  { id: 92, label: 'Performance Reviews' },
  { id: 93, label: 'Conflict Resolution' },
  { id: 94, label: 'Team Building' },
  { id: 95, label: 'HR Analytics' },
  { id: 96, label: 'Compensation Strategy' },
  { id: 97, label: 'Organizational Development' },
  { id: 98, label: 'Diversity & Inclusion' },
  { id: 99, label: 'Workplace Culture' },
  { id: 100, label: 'Training & Development' },
];

