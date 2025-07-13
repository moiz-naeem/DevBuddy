import { useRef, useMemo, useCallback } from "react";

export const useFormChanges = (initialValues, currentValues) => {
  const initialRef = useRef(JSON.stringify(initialValues));

  const hasChanged = useMemo(() => {
    return JSON.stringify(currentValues) !== initialRef.current;
  }, [currentValues]);

  const resetInitial = useCallback((newInitialValues) => {
    initialRef.current = JSON.stringify(newInitialValues);
  }, []);

  return [hasChanged, resetInitial];
};
