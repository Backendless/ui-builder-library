import { useEffect, useRef, useState } from 'react';

export const useVisibility = (display, duration, onEndAnimation) => {
  const [isOpen, setIsOpen] = useState(display);
  const isOpenTimeout = useRef(null);

  useEffect(() => {
    if (display) {
      clearTimeout(isOpenTimeout.current);
      setIsOpen(true);
    } else if (!display && isOpen) {
      isOpenTimeout.current = setTimeout(() => {
        setIsOpen(false);
        onEndAnimation();
      }, duration);
    }

    return () => clearTimeout(isOpenTimeout.current);
  }, [display]);

  return isOpen;
};

export const useResizeObserver = (element, dimensionName, dimension, setDimension) => {
  const [isAuto, setIsAuto] = useState(false);

  useEffect(() => {
    if (!element) return;

    const resizeObserver = new ResizeObserver(entries => {
      if (isAuto) {
        const currentDimension = entries[0].contentRect[dimensionName];

        if (dimension !== currentDimension) {
          setDimension(currentDimension);
        }
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [isAuto, element, dimension, setDimension, dimensionName]);

  return setIsAuto;
};

export const useTransition = (rootRef, display, duration, dimension, dimensionName, setIsAuto, onEndAnimation) => {
  const [isTransition, setIsTransition] = useState(false);

  const openTimeout = useRef(null);
  const zeroDimensionTimeout = useRef(null);

  useEffect(() => {
    if (rootRef.current) {
      if (display && dimension) {
        setTimeout(() => {
          showElement(rootRef.current);

          setIsTransition(true);

          rootRef.current.style[dimensionName] = dimension + 'px';
        }, 50);

        openTimeout.current = setTimeout(() => {
          setIsTransition(false);
          rootRef.current.style[dimensionName] = 'auto';
          setIsAuto(true);

          onEndAnimation();
        }, duration);

      } else if (!display) {
        setIsTransition(true);

        clearTimeout(openTimeout.current);

        setIsAuto(false);
        rootRef.current.style[dimensionName] = dimension + 'px';

        zeroDimensionTimeout.current = setTimeout(() => {
          rootRef.current.style[dimensionName] = '0px';
        }, 50);
      }
    }

    return () => {
      clearTimeout(openTimeout.current);
      clearTimeout(zeroDimensionTimeout.current);
    };
  }, [display, rootRef]);

  return isTransition;
};

export const hideElement = element => {
  element.style = { ...element.style, opacity: 0, position: 'absolute', zIndex: -1 };
};

export const showElement = element => {
  element.style = { ...element.style, opacity: 1, position: 'static', zIndex: 0 };
};
