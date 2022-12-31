import { useEffect } from 'react';

export const useVisibility = (display, setIsOpen, setVisibility, animationDuration) => {
  useEffect(() => {
    let visibilityTimeout, isOpenTimeout;

    if (!display) {
      isOpenTimeout = setTimeout(() => {
        setIsOpen(false);
      }, 0);

      visibilityTimeout = setTimeout(() => {
        setVisibility(false);
      }, animationDuration);
    } else {
      setVisibility(true);
    }

    return () => {
      clearTimeout(isOpenTimeout);
      clearTimeout(visibilityTimeout);
    };
  }, [display]);
};
