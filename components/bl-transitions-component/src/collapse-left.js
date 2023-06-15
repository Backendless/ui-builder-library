import { useEffect, useRef, useState } from 'react';

import { useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseLeft(props) {
  const { component, setIsTransition, transitionsContainerPod, isOpen, isContentLoaded, transitionRef } = props;
  const { classList, style, variant, duration } = component;

  const [podElement, setPodElement] = useState();
  const podWrapperRef = useRef();

  const width = useTransition(
    transitionRef, podElement, podWrapperRef, isOpen,
    isContentLoaded, duration, 'clientWidth', setIsTransition
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
        style={{ ...style, transitionDuration: duration + 'ms', width: getWidth(isOpen, width, podElement) }}>
        <div ref={ podWrapperRef } style={{ position: 'absolute' }}>
          { transitionsContainerPod.render() }
        </div>
      </div>
    </div>
  );
}

const getWidth = (isOpen, width, podElement) => {
  if (width) {
    if (isOpen) {
      return width;
    }

    if (width === 'auto') {
      return podElement.clientWidth + 'px';
    }

    return '0px';
  }
};
