import { useEffect, useRef, useState } from 'react';

import { useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseTop(props) {
  const { component, setIsTransition, transitionsContainerPod, isOpen, isContentLoaded } = props;
  const { classList, style, variant, duration } = component;

  const transitionRef = useRef();
  const [podElement, setPodElement] = useState();

  const height = useTransition(transitionRef, podElement, isOpen, isContentLoaded, duration, 'Height', setIsTransition);

  useEffect(() => {
    const readyToInitialTransition = transitionRef.current && !podElement;

    if (readyToInitialTransition) {
      setPodElement(transitionRef.current.firstElementChild);
    }
  }, [transitionRef, podElement]);

  return (
    <div className={ cn('bl-customComponent-transitions', classList) }>
      <div
        ref={ transitionRef }
        className={ cn('transition', variant) }
        style={{ ...style, transitionDuration: duration + 'ms', height: getHeight(isOpen, height, podElement) }}>
        { transitionsContainerPod.render() }
      </div>
    </div>
  );
}

const getHeight = (isOpen, height, podElement) => {
  if (height) {
    if (isOpen) {
      return height;
    }

    if (height === 'auto') {
      return podElement.clientHeight + 'px';
    }

    return '0px';
  }
};
