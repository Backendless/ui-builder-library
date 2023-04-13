import { useState, useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const ESCAPE_KEY_CODE = 27;

export default function ModalComponent({ component, eventHandlers, pods, elRef }) {
  const { display, classList, style, modalVisibility, closeOnEscape } = component;
  const { onClose } = eventHandlers;

  const [visibility, setVisibility] = useState(modalVisibility);

  component.openModal = () => setVisibility(true);
  component.closeModal = () => {
    setVisibility(false);
    onClose();
  };

  useEffect(() => {
    setVisibility(modalVisibility);
  }, [modalVisibility]);

  const modalContentPod = pods['modalContent'];

  useCloseOnEscape({ onClose, visibility, setVisibility, closeOnEscape });

  const handleClick = () => {
    if (closeOnEscape) {
      setVisibility(false);
      onClose();
    }
  };

  if (!display) {
    return null;
  }

  return (
    <>
      { visibility &&
        <div ref={ elRef } style={ style } className={ cn("bl-customComponent-modal", classList) }>
          <div className="backdrop" onClick={ handleClick } />
          <div className="modal-content">{ modalContentPod.render() }</div>
        </div>
      }
    </>
  );
}

const useCloseOnEscape = ({ onClose, visibility, setVisibility, closeOnEscape }) => {
  useEffect(() => {
    const handleEscClick = e => {
      if (visibility && closeOnEscape && e.keyCode === ESCAPE_KEY_CODE) {
        setVisibility(false);
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClick);

    return () => document.removeEventListener('keydown', handleEscClick);
  }, [visibility, closeOnEscape]);
};
