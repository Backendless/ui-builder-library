import { useRef, useEffect, useCallback } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function Parallax({ component, pods }) {
  const { display, style, classList, image, strength } = component;
  const parallaxContentPod = pods['parallaxContent'];

  const backgroundImageElement = useRef();
  const containerElement = useRef();

  const parallax = useCallback((containerElementCenterOffset) => {
    const backgroundHeight = backgroundImageElement.current.getBoundingClientRect().height;
    const screenCenter = window.innerWidth / 2;
    const distanceToCenterOfScreen = containerElementCenterOffset - screenCenter - window.pageYOffset;
    const translateY = (distanceToCenterOfScreen / backgroundHeight * -100) * strength * 0.001;

    backgroundImageElement.current.style.transform = `translate(0, calc(${ translateY }% - ${ strength / 2 }px))`;
  }, []);

  useEffect(() => {
    backgroundImageElement.current.style.height = `calc(100% + ${ strength }px)`;

    const containerElementTop = containerElement.current.getBoundingClientRect().top;
    const containerElementCenter = containerElement.current.getBoundingClientRect().height / 2;
    const containerElementCenterOffset = containerElementTop + containerElementCenter;

    parallax(containerElementCenterOffset);
    document.addEventListener('scroll', () => parallax(containerElementCenterOffset));

    return () => {
      document.removeEventListener('scroll', parallax);
    };
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div ref={ containerElement } className={ cn('bl-customComponent-parallax', classList) } style={ style }>
      <div ref={ backgroundImageElement } className="parallax-background-img"
           style={ { backgroundImage: `url(${ image })` } }></div>
      <div className="parallax-content">
        { parallaxContentPod.render() }
      </div>
    </div>
  );
}
