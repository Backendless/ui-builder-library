import { useEffect, useRef, useState } from 'react';

import { showElement, useImageLoad } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export const Others = props => {
  const { component, eventHandlers, transitionsContainerPod, display, isContentLoaded, dynamicContent } = props;
  const { classList, style, variant, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation, onStartAnimation } = eventHandlers;

  const [isTransition, setIsTransition] = useState(false);
  const [podElement, setPodElement] = useState();

  const rootRef = useRef();
  const endAnimationTimeout = useRef(null);

  const isImagesLoaded = useImageLoad(rootRef, dynamicContent);

  useEffect(() => {
    const readyToInitialTransition = rootRef.current && !podElement;

    if (readyToInitialTransition) {
      setPodElement(rootRef.current.firstElementChild);
    }
  }, [rootRef]);

  useEffect(() => {
    if (isContentLoaded && isImagesLoaded) {
      const timeout = setTimeout(() => setIsTransition(true), 50);

      return () => {
        clearTimeout(timeout);
        onUnmounted();
      };
    }

    onMounted();
  }, [isContentLoaded, isImagesLoaded]);

  useEffect(() => {
    if (display) {
      endAnimationTimeout.current = setTimeout(() => onEndAnimation(), duration);
    } else {
      clearTimeout(endAnimationTimeout.current);
    }

    return () => clearTimeout(endAnimationTimeout.current);
  }, [display]);

  useEffect(() => {
    if (isTransition) {
      onStartAnimation();
    }
  }, [isTransition]);

  useEffect(() => {
    if (podElement) {
      podElement.classList.add('transition', variant);

      if (display && isTransition) {
        onOpen(podElement, variant, duration);
        showElement(rootRef.current);
      } else {
        onHide(podElement, variant);
      }
    }
  }, [podElement, variant, display, isTransition, duration]);

  return (
    <div ref={ rootRef } className={ cn('bl-customComponent-transitions', variant, classList) } style={ style }>
      { transitionsContainerPod.render() }
    </div>
  );
};

const onOpen = (element, variant, duration) => {
  element.classList.add(variant + '--active');
  element.style.transitionDuration = duration + 'ms';
};

const onHide = (element, variant) => {
  element.classList.remove(variant + '--active');
  element.style.transitionDuration = 0;
};
