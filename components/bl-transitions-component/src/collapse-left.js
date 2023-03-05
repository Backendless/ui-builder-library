import { useEffect, useRef, useState } from 'react';

import { hideElement, useResizeObserver, useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseLeft({ component, eventHandlers, transitionsContainerPod, display }) {
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation } = eventHandlers;

  const [getWidthTimeout, setGetWidthTimeout] = useState();
  const [width, setWidth] = useState(0);

  const rootRef = useRef();

  const setIsAuto = useResizeObserver(rootRef.current, 'Width', width, setWidth);
  const isTransition = useTransition(rootRef, display, duration, width, 'width', setIsAuto, onEndAnimation);

  useEffect(() => {
    if (rootRef.current) {
      hideElement(rootRef.current);

      setGetWidthTimeout(setTimeout(() => {
        rootRef.current.style.width = 'auto';
        setWidth(rootRef.current.clientWidth);
        rootRef.current.style.width = '0px';
      }, 50));
    }

    return () => {
      clearTimeout(getWidthTimeout);
    };
  }, [rootRef]);

  useEffect(() => {
    onMounted();

    return () => {
      onUnmounted();
    };
  }, []);

  return (
    <div
      ref={ rootRef }
      className={ cn('bl-customComponent-transitions', variants, { [variants + '--open']: isTransition }, classList) }
      style={{ ...style, transitionDuration: duration + 'ms' }}>
      { transitionsContainerPod.render() }
    </div>
  );
}
