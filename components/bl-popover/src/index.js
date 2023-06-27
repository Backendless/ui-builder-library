import { useEffect, useMemo, useRef, useState } from 'react';

import { useMouseEvents } from './helpers';
import { Tooltip } from './Tooltip';

const { cn } = BackendlessUI.CSSUtils;

export default function Popover({ component, eventHandlers, pods }) {
  const { display, style, classList, position, delayMouseOver, delayMouseOut, zIndex } = component;
  const { onTargetClick, onMouseOver, onMouseOut } = eventHandlers;

  const rootRef = useRef();
  const tooltipRef = useRoot();
  const targetRef = useRef();

  const popoverTarget = pods['popoverTarget'];
  const popoverContent = pods['popoverContent'];

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    tooltipRef.style.zIndex = zIndex;
  }, [zIndex]);

  component.setIsOpen = setIsOpen;

  useMouseEvents(tooltipRef, targetRef, onMouseOver, onMouseOut, isOpen, delayMouseOver, delayMouseOut);

  if (!display) {
    return null;
  }

  return (
    <div ref={ rootRef } className={ cn('bl-customComponent-popover', classList) } style={ style }>
      <div
        ref={ targetRef }
        className="content-container"
        onClick={ () => onTargetClick({ isOpen }) }>
        { popoverTarget.render() }
      </div>
      { isOpen && (
        <Tooltip
          root={ tooltipRef }
          targetRef={ targetRef.current }
          position={ position }
          popoverContent={ popoverContent }
          eventHandlers={ eventHandlers }
        />
      ) }
    </div>
  );
}

const useRoot = () => useMemo(() => {
  const root = document.createElement('div');
  root.className = ('bl-customComponent-popover popover');

  return root;
}, []);
