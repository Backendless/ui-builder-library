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
  }, [display, duration, isOpen]);

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
  }, [isAuto, element, dimension, setDimension]);

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
  }, [dimension, display, duration, rootRef]);

  return isTransition;
};

export const showElement = element => {
  element.style.opacity = 1;
  element.style.position = 'static';
  element.style.zIndex = 0;
};

export const useImageLoad = (rootRef, dynamicContent) => {
  const [countLoadedImages, setCountLoadedImages] = useState(0);
  const [countImages, setCountImages] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    if (dynamicContent) {
      setIsImagesLoaded(true);
    } else {
      if (rootRef.current) {
        const images = [...rootRef.current.querySelectorAll('img')];
        setCountImages(images.length);

        if (images.length) {
          images.forEach(image => {
            image.addEventListener('load', () => setCountLoadedImages(state => state + 1));
          });
        } else {
          setIsImagesLoaded(true);
        }
      }
    }
  }, [rootRef]);

  useEffect(() => {
    if (countImages && countLoadedImages === countImages) {
      setIsImagesLoaded(true);
    }
  }, [countLoadedImages]);

  return isImagesLoaded;
};
