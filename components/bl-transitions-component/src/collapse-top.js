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
  const [podElement, setPodElement] = useState();

  const isImagesLoaded = useImageLoad(rootRef, dynamicContent);
  const isTransition = useTransition(podElement, display, duration, initHeight, height, 'height', onEndAnimation);

  useEffect(() => {
    const readyToInitialTransition = rootRef.current && !podElement;

    if (readyToInitialTransition) {
      setPodElement(rootRef.current.firstElementChild);
      setInitHeight(rootRef.current.firstElementChild.style.height);
    }
  }, [rootRef]);

  useEffect(() => {
    let getHeightTimeout;
    const readyToStartTransition = podElement && isContentLoaded && isImagesLoaded;

    if (readyToStartTransition) {
      const size = podElement.clientHeight;

      getHeightTimeout = setTimeout(() => setHeight(size), 50);

      podElement.style.height = '0px';
    }

    return () => getHeightTimeout && clearTimeout(getHeightTimeout);
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
        podElement.style.height = height + 'px';

        showElement(rootRef.current);
      } else {
        podElement.style.transitionDuration = '0ms';
      }
    }
  }, [podElement, height, variant, isTransition]);

  return (
    <div ref={ rootRef } className={ cn('bl-customComponent-transitions', variant, classList) } style={ style }>
      { transitionsContainerPod.render() }
    </div>
  );
}
