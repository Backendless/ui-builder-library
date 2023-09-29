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
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const styles = useMemo(() => ({
    '--nav-item-background': background,
    '--nav-item-color'     : color,
    '--tooltip-background' : tooltipBackground,
    '--tooltip-color'      : tooltipColor,
    ...style,
  }), [style, background, color, tooltipBackground, tooltipColor]);

  const scrollBehavior = useMemo(() => smoothScroll ? ScrollBehavior.SMOOTH : ScrollBehavior.AUTO, [smoothScroll]);

  const scrollHandler = useCallback(() => {
    if (!scrollEnabled || !anchors) {
      return;
    }

    const newActiveDotIndex = calculateActiveDotIndex(anchors);

    setActiveDotIndex(newActiveDotIndex);

    if (newActiveDotIndex !== activeDotIndex) {
      onAnchorChange({ activeAnchor: anchors[newActiveDotIndex] });
    }
  }, [scrollEnabled, anchors, onAnchorChange, activeDotIndex]);

  const dotClickHandler = useCallback(index => {
    if (!anchors || !anchors[index]) {
      return;
    }

    setScrollEnabled(false);
    setActiveDotIndex(index);

    const activeAnchor = anchors[index];
    const sectionElement = document.getElementById(activeAnchor);

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: scrollBehavior });
      onAnchorChange({ activeAnchor });
    }

    setTimeout(() => setScrollEnabled(true), 1000);
  }, [anchors, onAnchorChange, smoothScroll]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = scrollBehavior;
  }, [smoothScroll]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  useEffect(() => {
    anchorValidation(anchors);
  }, [anchors]);

  component.getActiveAnchor = () => anchors[activeDotIndex];
  component.setActiveAnchor = anchor => {
    const index = anchors.findIndex(a => a === anchor);

    if (index !== -1) {
      dotClickHandler(index);
    }
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-navigation-dots', classList) } ref={ elRef } style={ styles }>

      { anchors &&
        <Nav
          anchors={ anchors }
          activeDotIndex={ activeDotIndex }
          dotShape={ dotShape }
          tooltip={ tooltip }
          dotClickHandler={ dotClickHandler }
        />
      }

    </div>
  );
}

function Nav({ anchors, activeDotIndex, dotShape, tooltip, dotClickHandler }) {
  return (
    <ul className="nav">

      { anchors.map((anchor, index) => (
        <NavDotItem
          key={ anchor }
          index={ index }
          isActive={ activeDotIndex === index }
          dotShape={ dotShape }
          anchor={ anchor }
          tooltip={ tooltip }
          onClick={ dotClickHandler }
        />
      )) }

    </ul>
  );
}

function NavDotItem({ index, isActive, dotShape, anchor, tooltip, onClick }) {
  return (
    <li>
      <a
        className={ cn('nav-item', dotShape, { active: isActive }) }
        href={ `#${ anchor }` }
        onClick={ () => onClick(index) }>

        { tooltip && <span className="nav-item-tooltip">{ anchor }</span> }

      </a>
    </li>
  );
}

function calculateActiveDotIndex(anchors) {
  const windowHeight = window.innerHeight;

  let newActiveDotIndex = -1;

  for (let i = 0; i < anchors.length; i++) {
    const sectionElement = document.getElementById(anchors[i]);

    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();

      if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
        newActiveDotIndex = i;
        break;
      }
    }
  }

  return newActiveDotIndex;
}

function anchorValidation(anchors) {
  if (anchors && !anchors.every(anchor => anchor && typeof anchor === 'string')) {
      console.error("Error: anchor in 'anchors' prop is missing, invalid, or contains non-string value in NavigationDotsComponent.");
  }
}
