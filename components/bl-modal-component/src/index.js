import { useState, useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;
const ESCAPE_KEY_CODE = 27;

export default function ModalComponent({ component, eventHandlers, pods }) {
  const { display, classList, style, closeOnEscape } = component;
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

  useCloseOnEscape(onClose, setVisibility, closeOnEscape);

  const handleClick = () => {
    if (closeOnEscape) {
      setVisibility(false);
      onClose({ visibility: false });
    }
  };

  if (!visibility) {
    return null;
  }

  return (
    <div
      style={ style }
      className={ cn("bl-customComponent-modal", classList) }>
      <div className="backdrop" onClick={ handleClick } />
      <div className="modal-content">
        { modalContentPod.render() }
      </div>
    </div>
  );
}

const useCloseOnEscape = (onClose, setVisibility, closeOnEscape) => {
  useEffect(() => {
    const handleEscClick = e => {
      if (closeOnEscape && e.keyCode === ESCAPE_KEY_CODE) {
        setVisibility(false);
        onClose({ visibility: false });
      }
    };

    document.addEventListener('keydown', handleEscClick);

    return () => document.removeEventListener('keydown', handleEscClick);
  }, []);
};
