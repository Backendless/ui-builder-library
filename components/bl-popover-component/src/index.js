import { useRef, useState } from 'react';
import { Tooltip } from './Tooltip';

const { cn } = BackendlessUI.CSSUtils;

export default function Popover({ component, eventHandlers, pods }) {
  const { display, style, classList, position } = component;
  const { onClick } = eventHandlers;

  const popoverButton = pods['popoverButton'];
  const popoverContent = pods['popoverContent'];

  const [isOpen, setIsOpen] = useState(false);
  const contentContainer = useRef();

  component.setIsOpen = (boolean) => {
    setIsOpen(boolean);
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-popover', classList) } style={ style }>
      <div
        ref={ contentContainer }
        className="content-container"
        onClick={ () => onClick({ isOpen }) }>
        { popoverButton.render() }
      </div>

      { isOpen && (
        <Tooltip
          contentContainerElement={ contentContainer.current }
          position={ position }
          popoverContent={ popoverContent }
        />
      ) }
    </div>
  );
}
