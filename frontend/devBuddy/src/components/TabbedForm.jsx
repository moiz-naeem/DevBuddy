import { useState } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";


const TabbedForm = ({
  primaryComponent: Primary,
  secondaryComponent: Secondary,
  primaryLabel,
  secondaryLabel,
  size,
}) => {
  const [isPrimaryComponent, setIsPrimaryComponent] = useState(true);
  const primaryControls = useAnimation([2,-2,0]);
  const secondaryControls = useAnimation([2,-2,0]);

  const sizeClassMap = {
    small: "w-[22rem]",
    medium: "w-[28rem]",
    large: "w-[32rem]",
  };
  const handlePrimaryClick = async () => {
  setIsPrimaryComponent(true);
  await primaryControls.start({
    rotate: [-2, 2, -1, 1, 0],
    scale: [1, 1.1, 1.05, 1],
    transition: {
      duration: 0.6,
    ease: "easeInOut", // or you can try 'anticipate' for a snappy feel
    type: "tween"
    },
  });
};

const handleSecondaryClick = async () => {
  setIsPrimaryComponent(false);
  await secondaryControls.start({
    rotate: [-2, 2, -1, 1, 0],
    scale: [1, 1.1, 1.05, 1],
    //  backgroundColor: ["#6a7282", "#605dff"],
    transition: {
      duration: 0.6,
    ease: "easeInOut",
    type: "tween"
    },
  });
};


  return (
    <div className="flex justify-center mt-10">
      <div
        className={`card bg-neutral text-primary-content ${sizeClassMap[size]}`}
      >
        <div className="card-body">
          <div className="flex justify-center gap-x-2 pt-4 mb-4">
            <motion.button  className={`btn flex-1 rounded-md px-6 py-2 text-center ${
                !isPrimaryComponent ? "bg-primary text-white" : "bg-gray-500"
              }`}
              onClick={handleSecondaryClick }
              animate={secondaryControls}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}

              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}> {secondaryLabel}</motion.button>
            
            <motion.button  className={`btn flex-1 rounded-md px-6 py-2 text-center ${
                isPrimaryComponent ? "bg-primary text-white" : "bg-gray-500"
              }`}
              onClick={handlePrimaryClick}

              animate={primaryControls}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            
              
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              > {primaryLabel}</motion.button>
          </div>
          {isPrimaryComponent ? <Primary /> : <Secondary />}
        </div>
      </div>
    </div>
  );
};

export default TabbedForm;
