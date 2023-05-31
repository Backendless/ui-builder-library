import { useEffect, useRef, useState } from 'react';

import { hideElement, showElement } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseTop(props) {
  const { component, transitionsContainerPod, isOpen, isContentLoaded } = props;
  const { classList, style, variant, duration } = component;

  const [height, setHeight] = useState('0px');

  const [hasOpen, setHasOpen] = useState(false);

  const transitionRef = useRef();
  const [podElement, setPodElement] = useState();

  const openTimeout = useRef(null);
  const closeTimeout = useRef(null);

  useEffect(() => {
    const readyToInitialTransition = transitionRef.current && !podElement;

    if (readyToInitialTransition) {
      setPodElement(transitionRef.current.firstElementChild);
    }
  }, [transitionRef, podElement]);

  useEffect(() => {
    if (isOpen) {
      setHasOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const readyToStartTransition = podElement && isContentLoaded;

    if(readyToStartTransition) {
      if (isOpen) {
        showElement(transitionRef.current);

        setHeight(podElement.clientHeight + 'px');

        openTimeout.current = setTimeout(() => {
          setHeight('auto');
        }, duration);
      } else if (!isOpen &&  hasOpen) {
        clearTimeout(openTimeout.current);

        setHeight(podElement.clientHeight + 'px');

        closeTimeout.current = setTimeout(() => {
          hideElement(transitionRef.current);
        }, duration);
      }
    }

    return () => {
      clearTimeout(openTimeout.current);
      clearTimeout(closeTimeout.current);
    };
  }, [isOpen, podElement, isContentLoaded]);

  return (
    <div className={ cn('bl-customComponent-transitions', classList) }>
      <div
        ref={ transitionRef }
        className={ cn('transition', variant) }
        style={{ ...style, transitionDuration: duration + 'ms', height: isOpen && height ? height : height !== 'auto' ? '0px' : podElement.clientHeight + 'px' }}>
        { transitionsContainerPod.render() }
      </div>
    </div>
  );
}
