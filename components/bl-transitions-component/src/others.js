import { useEffect, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export const Others = ({ component, eventHandlers, transitionsContainerPod, display }) => {
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation } = eventHandlers;

  const [isTransition, setIsTransition] = useState(false);
  const [endAnimationTimeout, setEndAnimationTimeout] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTransition(true);
    }, 50);

    onMounted();

    return () => {
      clearTimeout(timeout);
      onUnmounted();
    };
  }, []);

  useEffect(() => {
    if (display) {
      setEndAnimationTimeout(setTimeout(() => {
        onEndAnimation();
      }, duration));
    } else {
      clearTimeout(endAnimationTimeout);
    }

    return () => {
      clearTimeout(endAnimationTimeout);
    };
  }, [display]);

  return (
    <div
      className={ cn(
        'bl-customComponent-transitions',
        variants,
        { [variants + '--open']: display && isTransition },
        classList) }
      style={{ ...style, transitionDuration: duration + 'ms' }}>
      { transitionsContainerPod.render() }
    </div>
  );
};
