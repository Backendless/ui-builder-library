import { useCallback, useEffect, useMemo, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const INFINITE = 'infinite';
const DEFAULT_ZERO = 0;
const DEFAULT_ONE = '1s';

export default function AnimatedBoxComponent({ component, elRef, eventHandlers, pods }) {
  const { style, classList, display, type, duration, delay, loop, autoStart } = component;
  const { onMouseOver, onMouseOut, onClick, onAnimationStart, onCycleComplete, onAnimationEnd } = eventHandlers;

  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(autoStart);
  const [isInViewport, setIsInViewport] = useState(null);

  const styles = useStyles(style, duration, delay, loop);

  const handleAnimationEnd = useCallback(() => {
    setHasStarted(false);
    setIsAnimating(false);
    onAnimationEnd();
  }, []);

  useEffect(() => {
    const ref = elRef.current;

    if (!ref) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setIsInViewport(entry.isIntersecting), { threshold: 0.5 });

    observer.observe(ref);

    return () => observer.unobserve(ref);
  }, [elRef, display]);

  useEffect(() => {
    if (isInViewport && hasStarted) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isInViewport, hasStarted]);

  component.play = () => {
    setIsAnimating(true);
    setHasStarted(true);
  }

  component.stop = () => {
    setIsAnimating(false);
    setHasStarted(false);
  }

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-animated-box', classList) }
      ref={ elRef }
      style={ styles }
      onMouseOver={ onMouseOver }
      onMouseOut={ onMouseOut }
      onClick={ onClick }
      onAnimationStart={ onAnimationStart }
      onAnimationIteration={ onCycleComplete }
      onAnimationEnd={ handleAnimationEnd }>

      <div className={ cn('animated-box-content', { animated: isAnimating }, isAnimating && type) }>
        { pods.animatedBoxContent.render() }
      </div>
    </div>
  );
}

function useStyles(style, duration, delay, loop) {
  return useMemo(() => {
    const animDuration = duration > 0 ? `${ duration }s` : DEFAULT_ONE;
    const animDelay = delay > 0 ? `${ delay }s` : DEFAULT_ZERO;
    const animCount = loop > 0 ? loop : INFINITE;

    return {
    ...style,
    '--animate-duration'       : animDuration,
    '--animate-delay'          : animDelay,
    '--animate-iteration-count': animCount,
  }}, [style, duration, delay, loop]);
}
