import { useCallback, useEffect, useMemo, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function NavigationDotsComponent({ component, eventHandlers, elRef }) {
  const {
    classList, style, display, sections, dotShape, background, color, tooltip, tooltipBackground, tooltipColor,
  } = component;
  const { onClick } = eventHandlers;

  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const styles = useMemo(() => ({
    '--nav-item-background': background,
    '--nav-item-color': color,
    '--tooltip-background': tooltipBackground,
    '--tooltip-color': tooltipColor,
    ...style,
  }), [style, background, color, tooltipBackground, tooltipColor]);

  const scrollHandler = useCallback(() => {
    if (!scrollEnabled || !sections) {
      return;
    }

    const windowHeight = window.innerHeight;

    let newActiveDotIndex = -1;

    for (let i = 0; i < sections.length; i++) {
      const sectionElement = document.getElementById(sections[i].anchor);

      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();

        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          newActiveDotIndex = i;
          break;
        }
      }
    }

    setActiveDotIndex(newActiveDotIndex);
  }, [scrollEnabled, sections]);

  const dotClickHandler = useCallback(index => {
    if (!sections || !sections[index]) {
      return;
    }

    setScrollEnabled(false);
    setActiveDotIndex(index);

    const anchor = sections[index].anchor;
    const sectionElement = document.getElementById(anchor);

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      onClick({ activeSection: sections[index] });
    }

    setTimeout(() => {
      setScrollEnabled(true);
    }, 1000);
  }, [sections, onClick]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  component.getActiveSection = () => sections[activeDotIndex];
  component.setActiveSection = section => {
    const index = sections.findIndex(s => s === section);

    if (index !== -1) {
      dotClickHandler(index);
    }
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-navigation-dots', classList) } ref={ elRef } style={ styles }>
      <ul className="nav">

        { sections?.map((section, index) => (
          <li key={ index }>
            <a
              className={ cn('nav-item', dotShape, { active: activeDotIndex === index }) }
              href={ `#${ section.anchor }` }
              onClick={ () => dotClickHandler(index) }>

              { tooltip && (
                <span className="nav-item-tooltip">{ section.anchor }</span>
              ) }

            </a>
          </li>
        )) }

      </ul>
    </div>
  );
}
