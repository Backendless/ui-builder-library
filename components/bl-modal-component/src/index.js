import { useState, useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;
const ESCAPE_KEY_CODE = 27;

export default function ModalComponent({ component, eventHandlers, pods }) {
  const { display, classList, style, disabled } = component;
  const { onClose } = eventHandlers;

  const [visibility, setVisibility] = useState(display);

  component.openModal = () => setVisibility(true);
  component.closeModal = () => {
    setVisibility(false);
    onClose({ visibility: false });
  };

  useEffect(() => {
    setVisibility(display);
  }, [display]);

  const modalContentPod = pods['modalContent'];

  useCloseOnEscape(onClose, setVisibility);

  const handleClick = () => {
    setVisibility(false);
    onClose({ visibility: false });
  };

  if (!visibility) {
    return null;
  }

  return (
    <div
      style={ style }
      className={ cn("bl-customComponent-modal", classList, { "bl-customComponent-modal--disabled": disabled }) }>
      <div className="backdrop" onClick={ handleClick } />
      <div className="modal-content">
        { modalContentPod.render() }
      </div>
    </div>
  );
}

const useCloseOnEscape = (onClose, setVisibility) => {
  useEffect(() => {
    const handleEscClick = e => {
      if (e.keyCode === ESCAPE_KEY_CODE) {
        setVisibility(false);
        onClose({ visibility: false });
      }
    };

    document.addEventListener('keydown', handleEscClick);

    return () => document.removeEventListener('keydown', handleEscClick);
  }, []);
};
