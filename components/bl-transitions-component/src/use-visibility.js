import { useEffect } from 'react';

export const useVisibility = (display, setIsOpen, setVisibility, duration) => {
  useEffect(() => {
    let visibilityTimeout, isOpenTimeout;

    if (!display) {
      isOpenTimeout = setTimeout(() => {
        setIsOpen(false);
      }, 0);

      visibilityTimeout = setTimeout(() => {
        setVisibility(false);
      }, duration);
    } else {
      setVisibility(true);
    }

    return () => {
      clearTimeout(isOpenTimeout);
      clearTimeout(visibilityTimeout);
    };
  }, [display]);
};
