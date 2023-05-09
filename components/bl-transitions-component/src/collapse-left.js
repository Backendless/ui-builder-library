import { useEffect, useRef, useState } from 'react';

import { useResizeObserver, useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseLeft({ component, eventHandlers, transitionsContainerPod, display, isContentLoaded }) {
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation } = eventHandlers;

  const [width, setWidth] = useState(0);

  const rootRef = useRef();

  const setIsAuto = useResizeObserver(rootRef.current, 'width', width, setWidth);
  const isTransition = useTransition(rootRef, display, duration, width, 'width', setIsAuto, onEndAnimation);

  useEffect(() => {
    let getWidthTimeout;

    if (rootRef.current && isContentLoaded) {
      getWidthTimeout = setTimeout(() => {
        rootRef.current.style.width = 'auto';
        setWidth(rootRef.current.clientWidth);
        rootRef.current.style.width = '0px';
      }, 50);
    }

    return () => getWidthTimeout && clearTimeout(getWidthTimeout);
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
        style={{ ...style, transitionDuration: duration + 'ms' }}>
        { transitionsContainerPod.render() }
      </div>
    </div>
  );
}
