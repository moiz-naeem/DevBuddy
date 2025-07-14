import { useRef, useMemo, useCallback , useEffect} from "react";

export const useFormChanges = (initialValues, currentValues) => {
  const initialRef = useRef(JSON.stringify(initialValues));

   useEffect(() => {
     console.log("Render after update")
   }, [initialValues]);

  console.log("Initial values: " + initialValues.age)

  const hasChanged = useMemo(() => {
    return JSON.stringify(currentValues) !== initialRef.current;
  }, [currentValues]);

  const resetInitial = useCallback((newInitialValues) => {
    initialRef.current = JSON.stringify(newInitialValues);
  }, []);

  return [hasChanged, resetInitial];
};
