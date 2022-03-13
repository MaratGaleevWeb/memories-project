import { useEffect, useRef, RefObject } from 'react';

type TUseObserver = (
  ref: RefObject<HTMLElement>,
  canLoad: boolean,
  isLoading: boolean,
  callback: () => void,
) => void;

const useObserver: TUseObserver = ({ current }, canLoad, isLoading, callback) => {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    observer.current && observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([{ isIntersecting }]) => isIntersecting && canLoad && callback(),
    );

    current && observer.current.observe(current);
  }, [isLoading]);
};

export default useObserver;
