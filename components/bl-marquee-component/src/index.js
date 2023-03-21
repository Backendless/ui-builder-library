import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const DEFAULT_COUNT = 'infinite';
const PlayState = { RUN: 'running', PAUSE: 'paused' };

export default function MarqueeComponent({ component, elRef, eventHandlers, pods }) {
  const {
    classList, style, display, start, pauseOnHover, pauseOnClick, direction, speed, delay, loop, gradient,
  } = component;
  const { onFinish, onCycleComplete } = eventHandlers;

  const children = pods['marqueeContent'].render();

  const [isMounted, setIsMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const [play, setPlay] = useState(start);

  const marqueeRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calculateWidth = () => {
      if (marqueeRef.current && elRef.current) {
        setContainerWidth(elRef.current.getBoundingClientRect().width);
        setMarqueeWidth(marqueeRef.current.getBoundingClientRect().width);
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);

    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, [isMounted]);

  const duration = useMemo(() => {
    const width = marqueeWidth < containerWidth ? containerWidth : marqueeWidth;

    return width / speed;
  }, [marqueeWidth, containerWidth, speed]);

  const styleMarquee = useMemo(() => {
    return {
      '--marquee-play'       : play ? PlayState.RUN : PlayState.PAUSE,
      animationDelay         : `${delay}s`,
      animationDuration      : `${duration}s`,
      animationDirection     : direction,
      animationIterationCount: loop || DEFAULT_COUNT,
    };
  }, [play, direction, duration, delay, loop]);

  const styles = useMemo(() => {
    const playStateOnHover = !play || pauseOnHover ? PlayState.PAUSE : PlayState.RUN;
    const playStateOnClick = !play || (pauseOnHover && !pauseOnClick) || pauseOnClick ? PlayState.PAUSE : PlayState.RUN;

    return {
      ...style,
      '--marquee-pause-on-hover': playStateOnHover,
      '--marquee-pause-on-click': playStateOnClick,
    };
  }, [style, play, pauseOnHover, pauseOnClick]);

  const handleFinish = useCallback(() => {
    if (!hasFinished) {
      setHasFinished(true);
    } else {
      onFinish();
    }
  }, [onFinish, hasFinished]);

  component.startPlay = () => setPlay(true);
  component.stopPlay = () => setPlay(false);

  if (!display || !isMounted) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-marquee', ...classList) } style={ styles }>
      { gradient && <div className="overlay"/> }

      <div
        ref={ marqueeRef }
        style={ styleMarquee }
        className="marquee-content"
        onAnimationIteration={ onCycleComplete }
        onAnimationEnd={ handleFinish }>
        { children }
      </div>

      <div style={ styleMarquee } className="marquee-content" aria-hidden="true">
        { children }
      </div>
    </div>
  );
}
