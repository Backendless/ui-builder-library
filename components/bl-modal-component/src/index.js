import { useState, useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;
const ESCAPE_KEY_CODE = 27;

export default function ModalComponent({ component, eventHandlers, pods }) {
  const { display, classList, style, disabled, modalVisibility } = component;
  const { onClose } = eventHandlers;

  const [visibility, setVisibility] = useState(modalVisibility);

  component.setModalVisibility = visibility => setVisibility(visibility);

  const modalContentPod = pods['modalContent'];

  useCloseOnEscape(onClose, setVisibility);

  const handleClick = () => {
    setVisibility(false);
    onClose({ modalVisibility: false });
  };

  if (!display) {
    return null;
  }

  return (
    <>
      { visibility &&
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

const useCloseOnEscape = (onClose, setVisibility) => {
  useEffect(() => {
    const handleEscClick = e => {
      if (e.keyCode === ESCAPE_KEY_CODE) {
        setVisibility(false);
        onClose({ modalVisibility: false });
      }
    };

    document.addEventListener('keydown', handleEscClick);

    return () => document.removeEventListener('keydown', handleEscClick);
  }, []);
};
