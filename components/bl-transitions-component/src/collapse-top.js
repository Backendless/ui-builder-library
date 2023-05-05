import { useEffect, useRef, useState } from 'react';

import { useResizeObserver, useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseTop({ component, eventHandlers, transitionsContainerPod, display, isContentLoaded }) {
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation } = eventHandlers;

  const [height, setHeight] = useState(0);

  const rootRef = useRef();
  const getHeightTimeout = useRef(null);

  const setIsAuto = useResizeObserver(rootRef.current, 'height', height, setHeight);
  const isTransition = useTransition(rootRef, display, duration, height, 'height', setIsAuto, onEndAnimation);

  useEffect(() => {
    if (rootRef.current && isContentLoaded) {
      getHeightTimeout.current = setTimeout(() => {
        rootRef.current.style.height = 'auto';
        setHeight(rootRef.current.clientHeight);
        rootRef.current.style.height = '0px';
      }, 50);
    }

    return () => clearTimeout(getHeightTimeout.current);
  }, [rootRef, isContentLoaded]);

  useEffect(() => {
    onMounted();

    return () => onUnmounted();
  }, []);

  return (
    <div className={ cn('bl-customComponent-transitions', classList) }>
      <div
        ref={ rootRef }
        className={ cn('transition', variants, { [variants + '--active']: isTransition }) }
        style={{ ...style, transitionDuration: duration + 'ms', position: 'absolute', zIndex: -1, opacity: 0 }}>
        { transitionsContainerPod.render() }
      </div>
    </div>
  );
}

