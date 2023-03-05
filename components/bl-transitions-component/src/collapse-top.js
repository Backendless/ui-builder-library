import { useEffect, useRef, useState } from 'react';

import { hideElement, useResizeObserver, useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseTop({ component, eventHandlers, transitionsContainerPod, display }) {
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation } = eventHandlers;

  const [getHeightTimeout, setGetHeightTimeout] = useState();
  const [height, setHeight] = useState(0);

  const rootRef = useRef();

  const setIsAuto = useResizeObserver(rootRef.current, 'Height', height, setHeight);
  const isTransition = useTransition(rootRef, display, duration, height, 'height', setIsAuto, onEndAnimation);

  useEffect(() => {
    if (rootRef.current) {
      hideElement(rootRef.current);

      setGetHeightTimeout(setTimeout(() => {
        rootRef.current.style.height = 'auto';
        setHeight(rootRef.current.clientHeight);
        rootRef.current.style.height = '0px';
      }, 50));
    }

    return () => {
      clearTimeout(getHeightTimeout);
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
