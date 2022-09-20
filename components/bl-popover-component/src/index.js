import { useRef, useState } from 'react';
import { Tooltip } from './Tooltip';

const { cn } = BackendlessUI.CSSUtils;

export default function Popover({ component, eventHandlers }) {
  const { display, style, classList, title, text, buttonLabel, position, disabled } = component;
  const { onClick } = eventHandlers;

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();

  component.setIsOpen = (boolean) => {
    setIsOpen(boolean);
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-popover', classList) } style={ style }>
      <button
        ref={ buttonRef }
        type="button"
        className={ cn('popover-button', { disabled: disabled }) }
        onClick={ () => onClick({ isOpen }) } disabled={ disabled }>
        { buttonLabel }
      </button>

      { isOpen && (
        <Tooltip
          buttonElement={ buttonRef.current }
          title={ title }
          text={ text }
          position={ position }
        />
      ) }
    </div>
  );
}
