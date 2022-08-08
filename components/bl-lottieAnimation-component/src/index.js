import { useEffect, useRef } from 'react';
import { destroy, loadAnimation, play, stop } from './lottie.min';

const { cn } = BackendlessUI.CSSUtils;

export default function LottieAnimation({ component, eventHandlers }) {
  const { display, classList, data, isLoop, type, isStopped } = component;
  const { onHover, onUnhover, onClick } = eventHandlers;

  const container = useRef(null);

  useEffect(() => {
    loadAnimationHandler(container, type, isLoop, isStopped, data);

    if (isStopped) {
      stop();
    }
  }, [data]);

  component.playAnimation = () => {
    play();
  };

  component.stopAnimation = () => {
    stop();
  };

  component.setAnimation = (data, isStopped, isLoop) => {
    loadAnimationHandler(container, type, isLoop, isStopped, data);
  };

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-lottieAnimation', classList) }
      ref={ container }
      onClick={ onClick }
      onMouseEnter={ onHover }
      onMouseLeave={ onUnhover }></div>
  );
}

const loadAnimationHandler = (container, type, isLoop, isStepped, data) => {
  destroy();

  if (data) {
    let animationJson;

    if (data != null && data.constructor.name === 'Object') {
      animationJson = data;
    } else if (typeof data === 'string') {
      animationJson = JSON.parse(data);
    }

    loadAnimation({
      container    : container.current,
      renderer     : type,
      loop         : isLoop,
      autoplay     : !isStepped,
      animationData: animationJson
    });
  }
};
