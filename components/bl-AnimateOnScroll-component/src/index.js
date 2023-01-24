import { useEffect, useMemo, useRef } from 'react';
import { Aos } from './aos';

const { cn } = BackendlessUI.CSSUtils;

const DevicesMap = {
  mobile: 'mobile',
  tablet: 'tablet',
  all   : true,
  none  : false,
};

export default function AnimateOnScroll({ component, eventHandlers, pods }) {
  const {
    display, classList, style, animationType, easing, side,
    duration, offset, disableFor, delay, mirror, once, anchor,
  } = component;
  const { onAnimationEnter, onAnimationOut } = eventHandlers;
  const elementPod = pods['animationPod'];

  const animationOnScrollRef = useRef(null);

  const animationName = useMemo(() => {
    return animationType + (side === 'none' ? '' : `-${ side }`);
  }, [animationType, side]);

  useEffect(() => {
    Aos.init({ disable: DevicesMap[disableFor] });

    document.addEventListener('aos:in', () => onAnimationEnter());
    document.addEventListener('aos:out', () => onAnimationOut());

    return () => {
      document.removeEventListener('aos:in', () => onAnimationEnter());
      document.removeEventListener('aos:out', () => onAnimationOut());
    };
  }, []);

  useEffect(() => component.el = animationOnScrollRef.current, []);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ animationOnScrollRef }
      className={ cn('bl-customComponent-animateOnScroll', classList) }
      style={ style }
      data-aos={ animationName }
      data-aos-easing={ easing }
      data-aos-duration={ duration }
      data-aos-delay={ delay }
      data-aos-offset={ offset }
      data-aos-mirror={ mirror }
      data-aos-once={ once }
      data-aos-anchor={ anchor ? '.' + anchor : null }
    >
      { elementPod.render() }
    </div>
  );
}
