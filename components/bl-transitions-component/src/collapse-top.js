import { useEffect, useRef, useState } from 'react';

import { showElement, useImageLoad, useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseTop(props) {
  const { component, eventHandlers, transitionsContainerPod, display, isContentLoaded, dynamicContent } = props;
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation, onStartAnimation } = eventHandlers;

  const [height, setHeight] = useState(0);
  const [initHeight, setInitHeight] = useState('');

  const rootRef = useRef();
  const [element, setElement] = useState({ current: null });

  const isImagesLoaded = useImageLoad(element, dynamicContent);
  const isTransition = useTransition(element, display, duration, initHeight, height, 'height', onEndAnimation);

  useEffect(() => {
    if (rootRef.current && !element.current) {
      setElement({ current: rootRef.current.firstElementChild });
      setInitHeight(rootRef.current.firstElementChild.style.height);
    }
  }, [rootRef]);

  useEffect(() => {
    let getHeightTimeout;

    if (element.current && isContentLoaded && isImagesLoaded) {
      const size = element.current.clientHeight;

      getHeightTimeout = setTimeout(() => setHeight(size), 50);

      element.current.style.height = '0px';
    }

    return () => getHeightTimeout && clearTimeout(getHeightTimeout);
  }, [element, isContentLoaded, isImagesLoaded]);

  useEffect(() => {
    onMounted();

    return () => onUnmounted();
  }, []);

  useEffect(() => {
    if (isTransition) {
      onStartAnimation();
    }
  }, [isTransition]);

  useEffect(() => {
    if (element.current) {
      element.current.classList.add('transition', variants);

      if (isTransition) {
        element.current.style.transitionDuration = duration + 'ms';
        element.current.style.height = height + 'px';

        showElement(rootRef.current);
      } else {
        element.current.style.transitionDuration = '0ms';
      }
    }
  }, [element, height, variants, isTransition]);

  return (
    <div ref={ rootRef } className={ cn('bl-customComponent-transitions', variants, classList) } style={ style }>
      { transitionsContainerPod.render() }
    </div>
  );
}
