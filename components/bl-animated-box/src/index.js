import { useCallback, useEffect, useMemo, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const INFINITE = 'infinite';
const ONE_SECOND = '1s';

export default function AnimatedBoxComponent({ component, elRef, eventHandlers, pods }) {
  const { style, classList, display, type, duration, delay, loop, autoPlay } = component;
  const { onMouseOver, onMouseOut, onClick, onAnimationStart, onCycleComplete, onAnimationEnd } = eventHandlers;

  const [isStopped, setIsStopped] = useState(!autoPlay);

  const styles = useStyles(style, duration, delay, loop);
  const isInViewport = useObserver(elRef, display);
  const animated = !isStopped && isInViewport;

  const handleAnimationEnd = useCallback(() => {
    setIsStopped(true);

    onAnimationEnd();
  }, []);

  component.play = () => setIsStopped(false);
  component.stop = () => setIsStopped(true);

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

      <div className={ cn('animated-box-content', { animated }, animated && type) }>
        { pods.animatedBoxContent.render() }
      </div>
    </div>
  );
}

function useStyles(style, duration, delay, loop) {
  return useMemo(() => ({
    ...style,
    '--animate-duration'       : duration > 0 ? `${ duration }ms` : ONE_SECOND,
    '--animate-delay'          : delay > 0 ? `${ delay }ms` : 0,
    '--animate-iteration-count': loop > 0 ? loop : INFINITE,
  }), [style, duration, delay, loop]);
}

function useObserver(ref, display) {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInViewport(entry.isIntersecting), { threshold: 0.5 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => ref.current && observer.unobserve(ref.current);
  }, [ref, display]);

  return isInViewport;
}
