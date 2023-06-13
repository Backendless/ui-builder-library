import { useEffect, useState } from 'react';

import { useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseLeft(props) {
  const { component, setIsTransition, transitionsContainerPod, isOpen, isContentLoaded, transitionRef } = props;
  const { classList, style, variant, duration } = component;

  const [podElement, setPodElement] = useState();

  const width = useTransition(transitionRef, podElement, isOpen, isContentLoaded, duration, 'Width', setIsTransition);

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
        { transitionsContainerPod.render() }
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
