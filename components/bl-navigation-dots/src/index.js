import { useCallback, useEffect, useMemo, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const ScrollBehavior = {
  SMOOTH: 'smooth',
  AUTO  : 'auto',
};

export default function NavigationDotsComponent({ component, eventHandlers, elRef }) {
  const {
    classList, style, display, anchors, dotShape, background, color,
    tooltip, tooltipBackground, tooltipColor, smoothScroll,
  } = component;
  const { onAnchorChange } = eventHandlers;

  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);

  const styles = useMemo(() => ({
    '--nav-item-background': background,
    '--nav-item-color'     : color,
    '--tooltip-background' : tooltipBackground,
    '--tooltip-color'      : tooltipColor,
    ...style,
  }), [style, background, color, tooltipBackground, tooltipColor]);

  const scrollBehavior = useMemo(() => smoothScroll ? ScrollBehavior.SMOOTH : ScrollBehavior.AUTO, [smoothScroll]);

  const scrollHandler = useCallback(() => {
    if (!isScrollingAllowed || !anchors) {
      return;
    }

    const newActiveDotIndex = calculateActiveDotIndex(anchors);

    setActiveDotIndex(newActiveDotIndex);

    if (newActiveDotIndex !== activeDotIndex) {
      onAnchorChange({ activeAnchor: anchors[newActiveDotIndex] });
    }
  }, [isScrollingAllowed, anchors, onAnchorChange, activeDotIndex]);

  const onItemClick = useCallback(index => {
    if (!anchors || !anchors[index]) {
      return;
    }

    setIsScrollingAllowed(false);
    setActiveDotIndex(index);

    const activeAnchor = anchors[index];
    const sectionElement = document.getElementById(activeAnchor);

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: scrollBehavior });
      onAnchorChange({ activeAnchor });
    }

    setTimeout(() => setIsScrollingAllowed(true), 1000);
  }, [anchors, onAnchorChange, smoothScroll]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = scrollBehavior;
  }, [smoothScroll]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  useEffect(() => validateAnchors(anchors), [anchors]);

  component.getActiveAnchor = () => anchors[activeDotIndex];
  component.setActiveAnchor = anchor => {
    const index = anchors.findIndex(a => a === anchor);

    if (index !== -1) {
      onItemClick(index);
    }
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-navigation-dots', classList) } ref={ elRef } style={ styles }>
      { anchors && (
        <Nav
          anchors={ anchors }
          activeDotIndex={ activeDotIndex }
          dotShape={ dotShape }
          tooltip={ tooltip }
          onItemClick={ onItemClick }
        />
      ) }
    </div>
  );
}

function Nav({ anchors, activeDotIndex, dotShape, tooltip, onItemClick }) {
  return (
    <ul className="nav">
      { anchors.map((anchor, index) => (
        <NavDotItem
          key={ anchor }
          index={ index }
          active={ activeDotIndex === index }
          dotShape={ dotShape }
          anchor={ anchor }
          tooltip={ tooltip }
          onClick={ onItemClick }
        />
      )) }
    </ul>
  );
}

function NavDotItem({ index, active, dotShape, anchor, tooltip, onClick }) {
  return (
    <li>
      <a
        className={ cn('nav-item', dotShape, { active }) }
        href={ `#${ anchor }` }
        onClick={ () => onClick(index) }>
        { tooltip && <span className="nav-item-tooltip">{ anchor }</span> }
      </a>
    </li>
  );
}

function calculateActiveDotIndex(anchors) {
  const windowHeight = window.innerHeight;

  const activeDotIndex = anchors.findIndex(anchor => {
    const sectionElement = document.getElementById(anchor);

    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();

      return rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2;
    }

    return false;
  });

  return activeDotIndex;
}

function validateAnchors(anchors) {
  if (anchors) {
    anchors.forEach((anchor, index) => {
      if (!anchor || typeof anchor !== 'string' || !document.getElementById(anchor)) {
        console.error(`Error: anchor "${ anchor }" at index ${ index } is invalid in NavigationDotsComponent.`);
      }
    });
  } else {
    console.error('Error: anchors are missing in NavigationDotsComponent.');
  }
}
