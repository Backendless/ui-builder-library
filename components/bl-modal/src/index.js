import { useEffect, useState } from 'react';

import { useCloseOnEscape, useModalContentStyles } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function ModalComponent({ component, eventHandlers, pods, elRef }) {
  const {
    display, classList, style, modalVisibility, closeOnEscape, allowScrolling, contentWidth, contentHeight,
  } = component;
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

  const modalContentStyles = useModalContentStyles({ contentWidth, contentHeight });

  if (!display || !visibility) {
    return null;
  }

  return ReactDOM.createPortal((
    <div ref={ elRef } style={ style } className={ cn('bl-customComponent-modal', classList) }>
      <div className="backdrop" onClick={ handleBackdropClick } />
      <div className="modal-content" style={ modalContentStyles }>{ modalContentPod.render() }</div>
    </div>
  ), document.body);
}
