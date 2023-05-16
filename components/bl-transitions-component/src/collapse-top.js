import { useEffect, useMemo, useRef, useState } from 'react';

import { useImageLoad, useResizeObserver, useTransition } from './helpers';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export function CollapseTop(props) {
  const { component, eventHandlers, transitionsContainerPod, display, isContentLoaded, dynamicContent } = props;
  const { classList, style, variants, duration, width, height: initHeight } = component;
  const { onMounted, onUnmounted, onEndAnimation, onStartAnimation } = eventHandlers;

  const [height, setHeight] = useState(0);

  const rootRef = useRef();

  const normalizedInitHeight = useMemo(() => normalizeDimensionValue(initHeight || ' '), [initHeight]);

  const rootStyle = useMemo(() => ({
    ...style,
    width : normalizeDimensionValue(width || ' '),
    height: normalizedInitHeight,
  }), [style, width, normalizedInitHeight]);

  const setIsAuto = useResizeObserver(rootRef.current, 'height', height, setHeight);
  const isImagesLoaded = useImageLoad(rootRef, dynamicContent);
  const isTransition = useTransition(
    rootRef, display, duration, normalizedInitHeight, height,
    'height', setIsAuto, onEndAnimation
  );

  useEffect(() => {
    let getHeightTimeout;

    if (rootRef.current && isContentLoaded && isImagesLoaded) {
      getHeightTimeout = setTimeout(() => {
        rootRef.current.style.height = normalizedInitHeight;
        setHeight(rootRef.current.clientHeight);
        rootRef.current.style.height = '0px';
      }, 50);
    }

    return () => getHeightTimeout && clearTimeout(getHeightTimeout);
  }, [rootRef, isContentLoaded, isImagesLoaded, normalizedInitHeight]);

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
    <div className={ cn('bl-customComponent-transitions', classList) } style={ rootStyle }>
      <div
        ref={ rootRef }
        className={ cn('transition', variants, { [variants + '--active']: isTransition }) }
        style={{ transitionDuration: duration + 'ms' }}>
        { transitionsContainerPod.render() }
      </div>
    </div>
  );
}
