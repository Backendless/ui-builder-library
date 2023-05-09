import { useEffect, useRef, useState } from 'react';

import { useImageLoad } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export const Others = props => {
  const { component, eventHandlers, transitionsContainerPod, display, isContentLoaded, dynamicContent } = props;
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation, onStartAnimation } = eventHandlers;

  const [isTransition, setIsTransition] = useState(false);

  const rootRef = useRef();
  const endAnimationTimeout = useRef(null);

  const isImagesLoaded = useImageLoad(rootRef, dynamicContent);

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

  return (
    <div ref={ rootRef } className={ cn('bl-customComponent-transitions', classList) }>
      <div
        className={ getClassName(variants, display, isTransition) }
        style={{ ...style, transitionDuration: duration + 'ms' }}>
        { transitionsContainerPod.render() }
      </div>
    </div>
  );
};

const getClassName = (variants, display, isTransition) => (
  cn('transition', variants, { [variants + '--active']: display && isTransition })
);
