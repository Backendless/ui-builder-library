import { useEffect, useRef, useState } from 'react';

import { useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseTop(props) {
  const { component, setIsTransition, transitionsContainerPod, isOpen, isContentLoaded, transitionRef } = props;
  const { classList, style, variant, duration } = component;

  const [podElement, setPodElement] = useState();
  const podWrapperRef = useRef();

  const height = useTransition(
    transitionRef, podElement, podWrapperRef, isOpen,
    isContentLoaded, duration, 'Height', setIsTransition
  );

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
        <div ref={ podWrapperRef } style={{ position: 'absolute' }}>
          { transitionsContainerPod.render() }
        </div>
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
