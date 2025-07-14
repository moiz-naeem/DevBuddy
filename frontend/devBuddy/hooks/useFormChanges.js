import { useRef, useMemo, useCallback , useEffect} from "react";

export const useFormChanges = (initialValues, currentValues) => {
  const initialRef = useRef(JSON.stringify(initialValues));

   useEffect(() => {
     console.log("Render after update")
   }, [initialValues]);

  console.log("Initial values: " + initialValues.age)

  const hasChanged = useMemo(() => {
    console.log("inside hasChanged: ")
    console.log(initialRef.current)
    console.log(JSON.stringify(currentValues))

    console.log(JSON.stringify(currentValues) === (initialRef.current))
    return JSON.stringify(currentValues) !== (initialRef.current);
  }, [currentValues]);

  const resetInitial = useCallback((newInitialValues) => {
    console.log("inside reset: ")
    initialRef.current = JSON.stringify(newInitialValues);
    console.log(initialRef.current)
  }, []);

  return [hasChanged, resetInitial];
};
