import { useEffect, useState } from 'react';

export const useVisibility = (display, isOpen, setIsOpen, duration, onEndAnimation) => {
  const [isOpenTimeout, setIsOpenTimeout] = useState();

  useEffect(() => {
    if (display) {
      clearTimeout(isOpenTimeout);
      setIsOpen(true);
    } else if (!display && isOpen) {
      setIsOpenTimeout(setTimeout(() => {
        setIsOpen(false);
        onEndAnimation();
      }, duration));
    }

    return () => {
      clearTimeout(isOpenTimeout);
    };
  }, [display]);
};

export const useResizeObserver = (element, dimensionName, dimension, setDimension) => {
  const [isAuto, setIsAuto] = useState(false);

  useEffect(() => {
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      if (isAuto) {
        const currentDimension = element['client' + dimensionName];

        if (dimension !== currentDimension) {
          setDimension(currentDimension);
        }
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [isAuto]);

  return setIsAuto;
};

export const useTransition = (rootRef, display, duration, dimension, dimensionName, setIsAuto, onEndAnimation) => {
  const [isTransition, setIsTransition] = useState(false);
  const [openTimeout, setOpenTimeout] = useState();
  const [zeroDimensionTimeout, setZeroDimensionTimeout] = useState();

  useEffect(() => {
    if (rootRef.current) {
      if (display && dimension) {
        setTimeout(() => {
          showElement(rootRef.current);

          setIsTransition(true);

          rootRef.current.style[dimensionName] = dimension + 'px';
        }, 50);

        setOpenTimeout(setTimeout(() => {
          setIsTransition(false);
          rootRef.current.style[dimensionName] = 'auto';
          setIsAuto(true);

          onEndAnimation();
        }, duration));

      } else if (!display) {
        setIsTransition(true);

        clearTimeout(openTimeout);

        setIsAuto(false);
        rootRef.current.style[dimensionName] = dimension + 'px';

        setZeroDimensionTimeout(setTimeout(() => {
          rootRef.current.style[dimensionName] = '0px';
        }, 50));
      }
    }

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(zeroDimensionTimeout);
    };
  }, [display, rootRef, dimension]);

  return isTransition;
};

export const hideElement = element => {
  element.style.opacity = 0;
  element.style.position = 'absolute';
  element.style.zIndex = -1;
};

export const showElement = element => {
  element.style.opacity = 1;
  element.style.position = 'static';
  element.style.zIndex = 0;
};
