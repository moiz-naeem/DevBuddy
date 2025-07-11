import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";


const TabbedForm = ({primaryComponent: Primary, secondaryComponent: Secondary , primaryLabel, secondaryLabel}) => {
  const [isPrimaryComponent, setIsPrimaryComponent] = useState(true);

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-neutral text-primary-content w-100">
        <div className="card-body">
          <div className={`fieldset join flex justify-center w-auto  pt-4 ${!!isPrimaryComponent && "pl-2 pr-7" }`}>
            <button
              className={`btn join-item w-1/2 rounded-md ${
                !isPrimaryComponent ? "bg-primary text-white" : "bg-gray-400"
              }`}
              onClick={() => setIsPrimaryComponent(false)}
            >
              {console.log(secondaryLabel)}
              {secondaryLabel}
            </button>
            <button
              className={`btn join-item w-1/2 rounded-md ${
                isPrimaryComponent ? "bg-primary text-white" : "bg-gray-400"
              }`}
              onClick={() => setIsPrimaryComponent(true)}
            >
             {primaryLabel}
            </button>
          </div>
          {isPrimaryComponent ? <Primary/> : <Secondary/>}
        </div>
      </div>
    </div>
  );
};

export default TabbedForm;
