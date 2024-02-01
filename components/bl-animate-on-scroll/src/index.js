import { useEffect, useMemo } from 'react';

import { Aos } from './aos';

const { cn } = BackendlessUI.CSSUtils;

const DevicesMap = {
  mobile: 'mobile',
  tablet: 'tablet',
  all   : true,
  none  : false,
};

export default function AnimateOnScroll({ component, eventHandlers, settings, pods, elRef }) {
  const {
    display, classList, style, animationType, easing, side,
    duration, offset, delay, mirror, once, anchor,
  } = component;
  const { disableFor } = settings;
  const { onAnimationEnter, onAnimationOut } = eventHandlers;
  const elementPod = pods['animationPod'];

  const animationName = useMemo(() => animationType + (side === 'none' ? '' : `-${ side }`), [animationType, side]);

  useEffect(() => {
    Aos.init({ disable: DevicesMap[disableFor] });

    document.addEventListener('aos:in', ({ detail }) => onAnimationEnter({ detail }));
    document.addEventListener('aos:out', ({ detail }) => onAnimationOut({ detail }));

    return () => {
      document.addEventListener('aos:in', ({ detail }) => onAnimationEnter({ detail }));
      document.addEventListener('aos:out', ({ detail }) => onAnimationOut({ detail }));
    };
  }, []);

  useEffect(() => {
    Aos.refresh();
  }, [anchor]);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
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
