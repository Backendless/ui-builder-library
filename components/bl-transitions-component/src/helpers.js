import { useEffect, useRef, useState } from 'react';

export const useTransition = (
  transitionRef, podElement, isOpen, isContentLoaded,
  duration, dimensionName, setIsTransition
) => {
  const [dimension, setDimension] = useState('');
  const [podElementDimension, setPodElementDimension] = useState(0);
  const [isTakenMeasurements, setIsTakenMeasurements] = useState(false);
  const [hasOpen, setHasOpen] = useState(false);

  const openTimeout = useRef(null);
  const closeTimeout = useRef(null);

  useEffect(() => {
    if (transitionRef.current) {
      hideElement(transitionRef.current);
    }
  }, [transitionRef]);

  useEffect(() => {
    if (!isTakenMeasurements) {
      const readyToStartTransition = podElement && isContentLoaded;

      if(readyToStartTransition) {
        setPodElementDimension(podElement['client' + dimensionName]);
        setIsTakenMeasurements(true);
      }
    }
  }, [podElement, isContentLoaded, isTakenMeasurements]);

  useEffect(() => {
    if (isTakenMeasurements) {
      setDimension('0px');
    }
  }, [isTakenMeasurements]);

  useEffect(() => {
    if (isOpen && isTakenMeasurements) {
      showElement(transitionRef.current);

      setDimension(podElementDimension + 'px');
      setIsTransition(true);
      setHasOpen(true);

      openTimeout.current = setTimeout(() => {
        setDimension('auto');
        setIsTransition(false);
      }, duration);
    } else if (hasOpen) {
      clearTimeout(openTimeout.current);

      setDimension(podElement['client' + dimensionName] + 'px');
      setIsTransition(true);
      setHasOpen(false);

      closeTimeout.current = setTimeout(() => {
        hideElement(transitionRef.current);

        setIsTransition(false);
        setDimension('');
        setIsTakenMeasurements(false);
      }, duration);
    }

    return () => {
      clearTimeout(openTimeout.current);
      clearTimeout(closeTimeout.current);
    };
  }, [transitionRef, isOpen, isTakenMeasurements, duration]);

  return dimension;
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
