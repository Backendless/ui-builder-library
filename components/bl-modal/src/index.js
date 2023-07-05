import { useState, useEffect } from 'react';

import { useCloseOnEscape } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function ModalComponent({ component, eventHandlers, pods, elRef }) {
  const { display, classList, style, modalVisibility, closeOnEscape, allowScrolling } = component;
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

  useEffect(() => {
    if (visibility && !allowScrolling) {
      document.body.style.overflow = 'hidden';
    }

    return () => document.body.style.overflow = 'visible';
  }, [visibility, allowScrolling]);

  const modalContentPod = pods['modalContent'];

  useCloseOnEscape({ onClose, visibility, setVisibility, closeOnEscape });

  const handleBackdropClick = () => {
    if (closeOnEscape) {
      setVisibility(false);
      onClose();
    }
  };

  if (!display || !visibility) {
    return null;
  }

  return (
    <div ref={ elRef } style={ style } className={ cn("bl-customComponent-modal", classList) }>
      <div className="backdrop" onClick={ handleBackdropClick } />
      <div className="modal-content">{ modalContentPod.render() }</div>
    </div>
  );
}
