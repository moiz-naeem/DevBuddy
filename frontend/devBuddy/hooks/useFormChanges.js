import { useRef, useMemo, useCallback , useEffect, useState} from "react";
import isEqual from 'lodash/isEqual';

export const useFormChanges = (initialValues, currentValues) => {
  const initialRef = useRef((initialValues));
  const [resetCounter, setResetCounter] = useState(0); 

   useEffect(() => {
     console.log("Render after update")
   }, [initialValues]);

  console.log("Initial values: " + initialValues.age)

  const hasChanged = useMemo(() => {
    console.log("inside hasChanged: ")

    console.dir(initialRef.current)

    console.dir(currentValues)

    console.log( isEqual(currentValues, initialRef.current))

    return !isEqual(currentValues, initialRef.current);
  }, [currentValues, resetCounter]);

  const resetInitial = useCallback((newInitialValues) => {
    console.log("inside reset: ")
    initialRef.current = newInitialValues;
    setResetCounter(prev => prev + 1);
    console.log(initialRef.current)
  }, []);

  return [hasChanged, resetInitial];
};
