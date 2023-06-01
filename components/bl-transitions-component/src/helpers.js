import { useEffect, useRef, useState } from 'react';

export const useTransition = (transitionRef, podElement, isOpen, isContentLoaded, duration, dimensionName) => {
  const [dimension, setDimension] = useState('');
  const [podElementDimension, setPodElementDimension] = useState(0);
  const [isTakenMeasurements, setIsTakenMeasurements] = useState(false);
  const [hasOpen, setHasOpen] = useState(false);

  const openTimeout = useRef(null);
  const closeTimeout = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHasOpen(true);
    }
  }, [isOpen]);

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

      openTimeout.current = setTimeout(() => {
        setDimension('auto');
      }, duration);
    } else if (hasOpen) {
      clearTimeout(openTimeout.current);

      setDimension(podElement['client' + dimensionName] + 'px');

      closeTimeout.current = setTimeout(() => {
        hideElement(transitionRef.current);

        setDimension('');
        setIsTakenMeasurements(false);
        setHasOpen(false);
      }, duration);
    }

    return () => {
      clearTimeout(openTimeout.current);
      clearTimeout(closeTimeout.current);
    };
  }, [transitionRef, podElement, isOpen, isTakenMeasurements, duration, hasOpen]);

  return dimension;
};

const showElement = element => {
  element.style.opacity = 1;
  element.style.position = 'static';
  element.style.zIndex = 0;
};

const hideElement = element => {
  element.style.opacity = 0;
  element.style.position = 'absolute';
  element.style.zIndex = -1;
};
