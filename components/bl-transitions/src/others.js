import { useEffect, useRef, useState } from 'react';

import { hideElement, showElement } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export const Others = props => {
  const { component, setIsTransition, transitionsContainerPod, isOpen, hasOpen, transitionRef } = props;
  const { classList, style, variant, duration } = component;

  const [podElement, setPodElement] = useState();

  const closeTimeout = useRef(null);
  const openTimeout = useRef(null);

  useEffect(() => {
    const readyToInitialTransition = transitionRef.current && !podElement;

    if (readyToInitialTransition) {
      setPodElement(transitionRef.current.firstElementChild);
    }
  }, [transitionRef]);

  useEffect(() => {
    if (transitionRef.current) {
      hideElement(transitionRef.current);
    }
  }, [transitionRef]);

  useEffect(() => {
    if (isOpen && transitionRef.current) {
      clearTimeout(closeTimeout.current);

      showElement(transitionRef.current);

      setIsTransition(true);

      openTimeout.current = setTimeout(() => setIsTransition(false), duration);
    } else if (transitionRef.current && hasOpen) {
      clearTimeout(openTimeout.current);
      setIsTransition(true);

      closeTimeout.current = setTimeout(() => {
        hideElement(transitionRef.current);

        setIsTransition(false);
      }, duration);
    }

    return () => clearTimeout(closeTimeout.current);
  }, [isOpen, transitionRef, duration]);

  return (
    <div className={ cn('bl-customComponent-transitions', classList) } style={ style }>
      <div
        ref={ transitionRef }
        className={ cn('transition', variant, { [isOpen ? 'open' : 'close']: hasOpen }) }
        style={{ animationDuration: duration + 'ms' }}>
        { transitionsContainerPod.render() }
      </div>
    </div>
  );
};
