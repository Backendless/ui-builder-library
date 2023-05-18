import { useEffect, useRef, useState } from 'react';

import { showElement, useImageLoad, useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseTop(props) {
  const { component, eventHandlers, transitionsContainerPod, display, isContentLoaded, dynamicContent } = props;
  const { classList, style, variant, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation, onStartAnimation } = eventHandlers;

  const [height, setHeight] = useState(0);
  const [initHeight, setInitHeight] = useState('');

  const rootRef = useRef();
  const [element, setElement] = useState({});

  const isImagesLoaded = useImageLoad(element, dynamicContent);
  const isTransition = useTransition(element, display, duration, initHeight, height, 'height', onEndAnimation);

  useEffect(() => {
    const readyToInitialTransition = rootRef.current && !element.current;

    if (readyToInitialTransition) {
      setElement({ current: rootRef.current.firstElementChild });
      setInitHeight(rootRef.current.firstElementChild.style.height);
    }
  }, [rootRef]);

  useEffect(() => {
    let getHeightTimeout;
    const readyToStartTransition = element.current && isContentLoaded && isImagesLoaded;

    if (readyToStartTransition) {
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
      element.current.classList.add('transition', variant);

      if (isTransition) {
        element.current.style.transitionDuration = duration + 'ms';
        element.current.style.height = height + 'px';

        showElement(rootRef.current);
      } else {
        element.current.style.transitionDuration = '0ms';
      }
    }
  }, [element, height, variant, isTransition]);

  return (
    <div ref={ rootRef } className={ cn('bl-customComponent-transitions', variant, classList) } style={ style }>
      { transitionsContainerPod.render() }
    </div>
  );
}
