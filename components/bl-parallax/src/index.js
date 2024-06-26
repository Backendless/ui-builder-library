import { useCallback, useEffect, useRef, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const MAX_STRENGTH = 2000;

export default function Parallax({ component, pods, elRef }) {
  const { display, style, classList, imageUrl, strength } = component;

  const [validStrength, setValidStrength] = useState(0);

  const backdropRef = useRef();

  useEffect(() => {
    setValidStrength(typeof strength === 'number' ? strength : 0);
  }, [strength]);

  useAnimation(backdropRef, elRef, Math.min(validStrength, MAX_STRENGTH), display);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-parallax', classList) } style={ style }>
      <div ref={ backdropRef } className="parallax-background-img" style={{ backgroundImage: `url(${ imageUrl })` }}/>

      <div className="parallax-content">
        { pods['parallaxContent']?.render() }
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
  }, [strength]);

  useEffect(() => {
    if (display) {
      backdropRef.current.style.height = `calc(100% + ${ strength }px)`;

      animate();

      const scrollElement = findScrollableElement(containerRef.current);

      scrollElement.addEventListener('scroll', animate);
      window.addEventListener('resize', animate, false);

      return () => {
        scrollElement.removeEventListener('scroll', animate);
        window.removeEventListener('resize', animate, false);
      };
    }
  }, [display, strength]);
};

const hasOverflow = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
  return scrollHeight > clientHeight || scrollWidth > clientWidth;
};

const findScrollableElement = element => {
  let parentElement = element;

  while (parentElement.parentNode) {
    if (hasOverflow(parentElement.parentNode)) {
      return parentElement.parentNode;
    }

    parentElement = parentElement.parentNode;
  }

  return document;
};
