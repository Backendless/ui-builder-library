import { useEffect, useMemo, useRef, useState } from 'react';

import { useImageLoad, useResizeObserver, useTransition } from './helpers';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export function CollapseLeft(props) {
  const { component, eventHandlers, transitionsContainerPod, display, isContentLoaded, dynamicContent } = props;
  const { classList, style, variants, duration, width: initWidth, height } = component;
  const { onMounted, onUnmounted, onEndAnimation, onStartAnimation } = eventHandlers;

  const [width, setWidth] = useState(0);

  const rootRef = useRef();

  const normalizedInitWidth = useMemo(() => normalizeDimensionValue(initWidth || ' '), [initWidth]);

  const rootStyle = useMemo(() => ({
    ...style,
    width : normalizedInitWidth,
    height: normalizeDimensionValue(height || ' '),
  }), [style, normalizedInitWidth, height]);

  const setIsAuto = useResizeObserver(rootRef.current, 'width', width, setWidth);
  const isImagesLoaded = useImageLoad(rootRef, dynamicContent);
  const isTransition = useTransition(
    rootRef, display, duration, normalizedInitWidth, width,
    'width', setIsAuto, onEndAnimation
  );

  useEffect(() => {
    let getWidthTimeout;

    if (rootRef.current && isContentLoaded && isImagesLoaded) {
      getWidthTimeout = setTimeout(() => {
        rootRef.current.style.width = normalizedInitWidth;
        setWidth(rootRef.current.clientWidth);
        rootRef.current.style.width = '0px';
      }, 50);
    }

    return () => getWidthTimeout && clearTimeout(getWidthTimeout);
  }, [rootRef, isContentLoaded, isImagesLoaded, normalizedInitWidth]);

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
