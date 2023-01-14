import { useEffect } from 'react';
import { Aos } from './aos';

const { cn } = BackendlessUI.CSSUtils;

const disableType = {
  mobile: 'mobile',
  tablet: 'tablet',
  true  : true,
  false : false,
};

export default function AnimateOnScroll({ component, eventHandlers, pods }) {
  const {
    display, classList, style, animationType, easing, side,
    duration, offset, disable, delay, mirror, once, anchor,
  } = component;
  const { animatedIn, animatedOut } = eventHandlers;
  const elementPod = pods['animationPod'];

  useEffect(() => {
    Aos.init({
      disable: disableType[disable],
    });

    document.addEventListener('aos:in', () => {
      animatedIn();
    });

    document.addEventListener('aos:out', () => {
      animatedOut();
    });
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-animateOnScroll', classList) }
      style={ style }
      data-aos={ animationType + (side === 'none' ? '' : `-${ side }`) }
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

