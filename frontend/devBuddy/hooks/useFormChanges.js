import { useRef, useMemo, useCallback , useEffect, useState} from "react";
import { isEqual } from 'lodash';


export const useFormChanges = (initialValues, currentValues) => {
  const initialRef = useRef((initialValues));
  const [resetCounter, setResetCounter] = useState(0); 

  const hasChanged = useMemo(() => {

    return !isEqual(currentValues, initialRef.current);
  }, [currentValues, resetCounter]);

  const resetInitial = useCallback((newInitialValues) => {
    initialRef.current = newInitialValues;
    setResetCounter(prev => prev + 1);
  }, []);

  return [hasChanged, resetInitial];
};
