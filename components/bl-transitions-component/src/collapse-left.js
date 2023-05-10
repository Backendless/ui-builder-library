import { useEffect, useRef, useState } from 'react';

import { useImageLoad, useResizeObserver, useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseLeft(props) {
  const { component, eventHandlers, transitionsContainerPod, display, isContentLoaded, dynamicContent } = props;
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation, onStartAnimation } = eventHandlers;

  const [width, setWidth] = useState(0);

  const rootRef = useRef();

  const setIsAuto = useResizeObserver(rootRef.current, 'width', width, setWidth);
  const isTransition = useTransition(rootRef, display, duration, width, 'width', setIsAuto, onEndAnimation);
  const isImagesLoaded = useImageLoad(rootRef, dynamicContent);

  useEffect(() => {
    let getWidthTimeout;

    if (rootRef.current && isContentLoaded && isImagesLoaded) {
      getWidthTimeout = setTimeout(() => {
        rootRef.current.style.width = 'auto';
        setWidth(rootRef.current.clientWidth);
        rootRef.current.style.width = '0px';
      }, 50);
    }

    return () => getWidthTimeout && clearTimeout(getWidthTimeout);
  }, [rootRef, isContentLoaded, isImagesLoaded]);

  useEffect(() => {
    onMounted();

    return () => onUnmounted();
  }, []);

  useEffect(() => {
    if (isTransition) {
      onStartAnimation();
    }
  }, [isTransition]);

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
