import { useEffect, useRef, useState } from 'react';

export const useTransition = (
  podElement, display, duration, initDimension,
  dimension, dimensionName, onEndAnimation
) => {
  const [isTransition, setIsTransition] = useState(false);

  const openTimeout = useRef(null);
  const zeroDimensionTimeout = useRef(null);

  useEffect(() => {
    if (podElement) {
      if (display && dimension) {
        setIsTransition(true);

        openTimeout.current = setTimeout(() => {
          setIsTransition(false);

          podElement.style[dimensionName] = initDimension;

          onEndAnimation();
        }, duration);

      } else if (!display) {
        setIsTransition(true);

        clearTimeout(openTimeout.current);

        zeroDimensionTimeout.current = setTimeout(() => {
          podElement.style[dimensionName] = '0px';
        }, 50);
      }
    }

    return () => {
      clearTimeout(openTimeout.current);
      clearTimeout(zeroDimensionTimeout.current);
    };
  }, [dimension, display, duration, podElement]);

  return isTransition;
};

export const showElement = element => {
  element.style.opacity = 1;
  element.style.position = 'static';
  element.style.zIndex = 0;
};

export const hideElement = element => {
  element.style.opacity = 0;
  element.style.position = 'absolute';
  element.style.zIndex = -1;
};
