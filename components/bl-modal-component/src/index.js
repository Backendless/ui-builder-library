import { useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function ModalComponent({ component, eventHandlers, pods }) {
  const { display, classList, style, disabled, modalVisibility } = component;
  const { onClose } = eventHandlers;

  const modalContentPod = pods['modalContent'];

  useEffect(() => {
    const handleEscClick = e => {
      if (e.keyCode === 27) {
        if (onClose) {
          onClose({ modalVisibility: false });
        }
      }
    };

    document.addEventListener('keydown', handleEscClick);

    return () => document.removeEventListener('keydown', handleEscClick);
  }, []);

  const handleClick = () => {
    if (onClose) {
      onClose({ modalVisibility: false });
    }
  };

  if (!display) {
    return null;
  }

  return (
    <>
      { modalVisibility &&
        <div className={ cn("bl-customComponent-modal", classList, { disabled }) } style={ style }>
          <div className="backdrop" onClick={ handleClick } />
          <div className="modal-content">
            { modalContentPod.render() }
          </div>
        </div>
      }
    </>
  );
}
