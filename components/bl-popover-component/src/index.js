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

  component.setIsOpen = setIsOpen;

  const onMouseEnter = () => {
    setTimeout(() => onMouseOver({ isOpen }), delayMouseOver);
  };

  const onMouseLeave = () => {
    setTimeout(() => onMouseOut({ isOpen }), delayMouseOut);
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
