import { useState, useMemo, useEffect, useCallback } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const INFINITE = 'infinite';

export default function AnimatedBoxComponent({ component, elRef, eventHandlers, pods }) {
  const { style, classList, display, type, duration, delay, loop } = component;
  const { onMouseOver, onMouseOut, onClick, onAnimationStart, onCycleComplete, onAnimationEnd } = eventHandlers;

  const startAnimation = useMemo(() => duration && duration > 0 && loop && loop >= 0, [duration, loop]);

  const [isAnimating, setIsAnimating] = useState(startAnimation);

  const styles = useStyles(style, duration, delay, loop);

  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false);
    onAnimationEnd();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      setIsAnimating(entry.isIntersecting);
    }, { threshold: 0.5 });

    if (elRef.current) {
      observer.observe(elRef.current);
    }

    return () => elRef.current && observer.unobserve(elRef.current);
  }, [elRef]);

  component.play  = () => setIsAnimating(true);
  component.pause = () => setIsAnimating(false);

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
    '--animate-duration': `${ duration }s`,
    '--animate-delay': `${ delay }s`,
    '--animate-iteration-count': loop ? loop : INFINITE,
  }), [style, duration, delay, loop]);
}
