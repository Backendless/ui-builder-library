import { useEffect } from 'react';

export default function ModalComponent({ component, eventHandlers, pods }) {
  const { modalVisibility } = component;
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
        <div className="bl-customComponent-modal">
          <div className="backdrop" onClick={ handleClick } />
          <div className="modal-content">
            { modalContentPod.render() }
          </div>
        </div>
      }
    </>
  );
}
