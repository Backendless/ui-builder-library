import { useState, useRef, useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseTop({ component, eventHandlers, transitionsContainerPod, isOpen, setIsOpen }) {
  const { display, classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation } = eventHandlers;

  const [height, setHeight] = useState('auto');

  const rootRef = useRef();

  useEffect(() => {
    setHeight(rootRef.current.clientHeight);
    setIsOpen(false);

    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 0);

    onMounted();

    return () => {
      clearTimeout(timeout);
      onUnmounted();
    };
  }, []);

  useEffect(() => {
    if (!display) {
      rootRef.current.style.height = rootRef.current.clientHeight + 'px';
    }
  }, [display]);

  useEffect(() => {
    let timeout;

    if (isOpen) {
      rootRef.current.style.height = height + 'px';

      timeout = setTimeout(() => {
        rootRef.current.style.height = 'auto';
      }, duration);
    } else {
      rootRef.current.style.height = 0;
    }

    const endAnimationTimeout = setTimeout(() => {
      onEndAnimation();
    }, duration);

    return () => {
      clearTimeout(timeout);
      clearTimeout(endAnimationTimeout);
    };
  }, [isOpen]);

  return (
    <div
      ref={ rootRef }
      className={ cn('bl-customComponent-transitions', variants, { [variants + '--open']: isOpen }, classList) }
      style={ { ...style, transitionDuration: duration + 'ms' } }>
      { transitionsContainerPod.render() }
    </div>
  );
}
