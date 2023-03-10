import { useState, useRef, useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseLeft({ component, eventHandlers, transitionsContainerPod, isOpen, setIsOpen }) {
  const { display, classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation } = eventHandlers;

  const [width, setWidth] = useState('auto');

  const rootRef = useRef();

  useEffect(() => {
    setWidth(rootRef.current.clientWidth);
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
      rootRef.current.style.width = rootRef.current.clientWidth + 'px';
    }
  }, [display]);

  useEffect(() => {
    let timeout;

    if (isOpen) {
      rootRef.current.style.width = width + 'px';

      timeout = setTimeout(() => {
        rootRef.current.style.width = 'auto';
      }, duration);
    } else {
      rootRef.current.style.width = 0;
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
