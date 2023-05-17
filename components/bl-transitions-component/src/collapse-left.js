import { useEffect, useRef, useState } from 'react';

import { showElement, useImageLoad, useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseLeft(props) {
  const { component, eventHandlers, transitionsContainerPod, display, isContentLoaded, dynamicContent } = props;
  const { classList, style, variants, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation, onStartAnimation } = eventHandlers;

  const [width, setWidth] = useState(0);
  const [initWidth, setInitWidth] = useState('');

  const rootRef = useRef();
  const [element, setElement] = useState({ current: null });

  const isImagesLoaded = useImageLoad(element, dynamicContent);
  const isTransition = useTransition(element, display, duration, initWidth, width, 'width', onEndAnimation);

  useEffect(() => {
    if (rootRef.current && !element.current) {
      setElement({ current: rootRef.current.firstElementChild });
      setInitWidth(rootRef.current.firstElementChild.style.width);
    }
  }, [rootRef]);

  useEffect(() => {
    let getWidthTimeout;

    if (element.current && isContentLoaded && isImagesLoaded) {
      const size = element.current.clientWidth;

      getWidthTimeout = setTimeout(() => setWidth(size), 50);

      element.current.style.width = '0px';
    }

    return () => getWidthTimeout && clearTimeout(getWidthTimeout);
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
        element.current.style.width = width + 'px';

        showElement(rootRef.current);
      } else {
        element.current.style.transitionDuration = '0ms';
      }
    }
  }, [element, variants, width, isTransition]);

  return (
    <div ref={ rootRef } className={ cn('bl-customComponent-transitions', variants, classList) } style={ style }>
      { transitionsContainerPod.render() }
    </div>
  );
}
