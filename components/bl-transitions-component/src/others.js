import { useEffect, useRef, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export const Others = ({ component, eventHandlers, transitionsContainerPod, display }) => {
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation } = eventHandlers;

  const [isTransition, setIsTransition] = useState(false);

  const endAnimationTimeout = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsTransition(true), 50);

    onMounted();

    return () => {
      clearTimeout(timeout);
      onUnmounted();
    };
  }, []);

  useEffect(() => {
    if (display) {
      endAnimationTimeout.current = setTimeout(() => onEndAnimation(), duration);
    } else {
      clearTimeout(endAnimationTimeout.current);
    }

    return () => clearTimeout(endAnimationTimeout.current);
  }, [display]);

  return (
    <div
      className={ getClassName(variants, display, isTransition, classList) }
      style={{ ...style, transitionDuration: duration + 'ms' }}>
      { transitionsContainerPod.render() }
    </div>
  );
};

const getClassName = (variants, display, isTransition, classList) => (
  cn('bl-customComponent-transitions', variants, { [variants + '--active']: display && isTransition }, classList)
);
