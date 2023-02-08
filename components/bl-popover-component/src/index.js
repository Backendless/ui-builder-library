import { useRef, useState } from 'react';
import { Tooltip } from './Tooltip';

const { cn } = BackendlessUI.CSSUtils;

export default function Popover({ component, eventHandlers, pods }) {
  const { display, style, classList, position } = component;
  const { onTriggerClick } = eventHandlers;

  const popoverTrigger = pods['popoverTrigger'];
  const popoverContent = pods['popoverContent'];

  const [isOpen, setIsOpen] = useState(false);
  const contentElement = useRef();

  component.setIsOpen = setIsOpen;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-popover', classList) } style={ style }>
      <div
        ref={ contentElement }
        className="content-container"
        onClick={ () => onTriggerClick({ isOpen }) }>
        { popoverTrigger.render() }
      </div>

      { isOpen && (
        <Tooltip
          contentElement={ contentElement.current }
          position={ position }
          popoverContent={ popoverContent }
        />
      ) }
    </div>
  );
}
