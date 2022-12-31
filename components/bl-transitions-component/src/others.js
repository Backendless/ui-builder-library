import { useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export const Others = ({ component, eventHandlers, transitionsContainerPod, setIsOpen, isOpen }) => {
  const { classList, style, variants, animationDuration } = component;
  const { onMounted, onUnmounted, onEndAnimation } = eventHandlers;

  useEffect(() => {
    setIsOpen(false);

    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 100);

    onMounted();

    return () => {
      clearTimeout(timeout);
      onUnmounted();
    };
  }, []);

  useEffect(() => {
    const endAnimationTimeout = setTimeout(() => {
      onEndAnimation();
    }, animationDuration);

    return () => {
      clearTimeout(endAnimationTimeout);
    };
  }, [isOpen]);

  return (
    <div
      className={ cn('bl-customComponent-transitions', variants, { [variants + '--open']: isOpen }, classList) }
      style={ { ...style, transitionDuration: animationDuration + 'ms' } }>
      { transitionsContainerPod.render() }
    </div>
  );
};
