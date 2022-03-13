import { useEffect, useRef, RefObject } from 'react';

type TUseFocus = (cleanUpFunc: () => void) => RefObject<HTMLInputElement>;

const useFocus: TUseFocus = (cleanUpFunc) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();

    return cleanUpFunc;
  }, []);

  return ref;
};
export default useFocus;
