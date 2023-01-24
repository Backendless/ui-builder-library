import { useRef, useEffect, useCallback } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function Parallax({ component, pods }) {
  const { display, style, classList, imageUrl, strength } = component;
  const parallaxContentPod = pods['parallaxContent'];

  const backdropRef = useRef();
  const containerRef = useRef();

  useAnimation(backdropRef, containerRef, strength, display);

  useEffect(() => {
    component.el = containerRef.current;
  }, [containerRef]);

  if (!display) {
    return null;
  }

  return (
    <div ref={ containerRef } className={ cn('bl-customComponent-parallax', classList) } style={ style }>
      <div ref={ backdropRef } className="parallax-background-img"
           style={ { backgroundImage: `url(${ imageUrl })` } }></div>
      <div className="parallax-content">
        { parallaxContentPod.render() }
      </div>
    </div>
  );
}

const useAnimation = (backdropRef, containerRef, strength, display) => {
  const animate = useCallback(() => {
    const containerTopOffset = containerRef.current.getBoundingClientRect().top + window.pageYOffset;
    const containerElementCenter = containerRef.current.getBoundingClientRect().height / 2;
    const containerElementCenterOffset = containerTopOffset + containerElementCenter;

    const backgroundHeight = backdropRef.current.getBoundingClientRect().height;
    const screenCenter = window.innerHeight / 2;
    const distanceToCenterOfScreen = containerElementCenterOffset - screenCenter - window.pageYOffset;
    const translateY = (distanceToCenterOfScreen / backgroundHeight * -100) * strength * 0.001;

    backdropRef.current.style.transform = `translate(0, calc(${ translateY }% - ${ strength / 2 }px))`;
  }, []);

  useEffect(() => {
    if (display) {
      backdropRef.current.style.height = `calc(100% + ${ strength }px)`;

      animate();

      document.addEventListener('scroll', animate)
      window.addEventListener('resize', animate, false);
    }

    return () => {
      document.removeEventListener('scroll', animate);
      window.removeEventListener('resize', animate, false);
    };
  }, [display]);
}
