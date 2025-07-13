import { useState } from "react";


const TabbedForm = ({
  primaryComponent: Primary,
  secondaryComponent: Secondary,
  primaryLabel,
  secondaryLabel,
  size,
}) => {
  const [isPrimaryComponent, setIsPrimaryComponent] = useState(true);

  const sizeClassMap = {
    small: "w-[22rem]",
    medium: "w-[28rem]",
    large: "w-[32rem]",
  };

  return (
    <div className="flex justify-center mt-10">
      <div
        className={`card bg-neutral text-primary-content ${sizeClassMap[size]}`}
      >
        <div className="card-body">
          <div className="flex justify-center gap-x-2 pt-4 mb-4">
            <button
              className={`btn flex-1 rounded-md px-6 py-2 text-center ${
                !isPrimaryComponent ? "bg-primary text-white" : "bg-gray-500"
              }`}
              onClick={() => setIsPrimaryComponent(false)}
            >
              {secondaryLabel}
            </button>
            <button
              className={`btn flex-1 rounded-md px-6 py-2 text-center ${
                isPrimaryComponent ? "bg-primary text-white" : "bg-gray-500"
              }`}
              onClick={() => setIsPrimaryComponent(true)}
            >
              {primaryLabel}
            </button>
          </div>
          {isPrimaryComponent ? <Primary /> : <Secondary />}
        </div>
      </div>
    </div>
  );
};

export default TabbedForm;
