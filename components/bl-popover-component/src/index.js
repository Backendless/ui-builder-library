import { useRef, useState } from 'react';

import { Tooltip } from './Tooltip';

const { cn } = BackendlessUI.CSSUtils;

export default function Popover({ component, eventHandlers, pods }) {
  const { display, style, classList, position, delayMouseOver, delayMouseOut } = component;
  const { onTargetClick, onMouseOut, onMouseOver } = eventHandlers;

  const popoverTarget = pods['popoverTarget'];
  const popoverContent = pods['popoverContent'];

  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useRef();

  const mouseEnterTimeout = useRef(null);
  const mouseLeaveTimeout = useRef(null);

  component.setIsOpen = setIsOpen;

  const onMouseEnter = () => {
    if (mouseEnterTimeout.current) {
      clearTimeout(mouseEnterTimeout.current);
      clearTimeout(mouseLeaveTimeout.current);
    }

    mouseEnterTimeout.current = setTimeout(() => onMouseOver({ isOpen }), delayMouseOver);
  };

  const onMouseLeave = () => {
    if (mouseLeaveTimeout.current) {
      clearTimeout(mouseLeaveTimeout.current);
      clearTimeout(mouseEnterTimeout.current);
    }

    mouseLeaveTimeout.current = (setTimeout(() => onMouseOut({ isOpen }), delayMouseOut));
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-popover', classList) } style={ style }>
      <div
        ref={ targetRef }
        className="content-container"
        onClick={ () => onTargetClick({ isOpen }) }
        onMouseEnter={ onMouseEnter }
        onMouseLeave={ onMouseLeave }>
        { popoverTarget.render() }
      </div>

      { isOpen && (
        <Tooltip
          targetRef={ targetRef.current }
          position={ position }
          popoverContent={ popoverContent }
        />
      ) }
    </div>
  );
}
