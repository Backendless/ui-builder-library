import { useEffect, useRef, useState } from 'react';

import { showElement, useImageLoad, useTransition } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function CollapseLeft(props) {
  const { component, eventHandlers, transitionsContainerPod, display, isContentLoaded, dynamicContent } = props;
  const { classList, style, variant, duration } = component;
  const { onMounted, onUnmounted, onEndAnimation, onStartAnimation } = eventHandlers;

  const [width, setWidth] = useState(0);
  const [initWidth, setInitWidth] = useState('');

  const rootRef = useRef();
  const [podElement, setPodElement] = useState();

  const isImagesLoaded = useImageLoad(rootRef, dynamicContent);
  const isTransition = useTransition(podElement, display, duration, initWidth, width, 'width', onEndAnimation);

  useEffect(() => {
    const readyToInitialTransition = rootRef.current && !podElement;

    if (readyToInitialTransition) {
      setPodElement(rootRef.current.firstElementChild);
      setInitWidth(rootRef.current.firstElementChild.style.width);
    }
  }, [rootRef]);

  useEffect(() => {
    let getWidthTimeout;
    const readyToStartTransition = podElement && isContentLoaded && isImagesLoaded;

    if (readyToStartTransition) {
      const size = podElement.clientWidth;

      getWidthTimeout = setTimeout(() => setWidth(size), 50);

      podElement.style.width = '0px';
    }

    return () => getWidthTimeout && clearTimeout(getWidthTimeout);
  }, [podElement, isContentLoaded, isImagesLoaded]);

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
    if (podElement) {
      podElement.classList.add('transition', variant);

      if (isTransition) {
        podElement.style.transitionDuration = duration + 'ms';
        podElement.style.width = width + 'px';

        showElement(rootRef.current);
      } else {
        podElement.style.transitionDuration = '0ms';
      }
    }
  }, [podElement, variant, width, isTransition]);

  return (
    <div ref={ rootRef } className={ cn('bl-customComponent-transitions', variant, classList) } style={ style }>
      { transitionsContainerPod.render() }
    </div>
  );
}
