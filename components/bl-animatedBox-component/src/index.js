import { useCallback, useEffect, useMemo, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const INFINITE = 'infinite';

export default function AnimatedBoxComponent({ component, elRef, eventHandlers, pods }) {
  const { style, classList, display, type, duration, delay, loop, autoStart } = component;
  const { onMouseOver, onMouseOut, onClick, onAnimationStart, onCycleComplete, onAnimationEnd } = eventHandlers;

  const startAnimation = useMemo(() => duration && duration > 0 && loop && loop >= 0 && autoStart, [duration, loop, autoStart]);

  const [isAnimating, setIsAnimating] = useState(startAnimation);
  const [hasStarted, setHasStarted] = useState(autoStart);
  const [isInViewport, setIsInViewport] = useState(null);

  const styles = useStyles(style, duration, delay, loop);

  const handleAnimationEnd = useCallback(() => {
    setHasStarted(false);
    setIsAnimating(false);
    onAnimationEnd();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => (
      display && setIsInViewport(entry.isIntersecting)
    ), { threshold: 0.5 });
    const ref = elRef.current;

    if (!ref) {
      return;
    }

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
  return useMemo(() => ({
    ...style,
    '--animate-duration'       : `${ duration }s`,
    '--animate-delay'          : `${ delay }s`,
    '--animate-iteration-count': loop || INFINITE,
  }), [style, duration, delay, loop]);
}
