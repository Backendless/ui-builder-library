import { useState } from 'react';
import { Modal } from './modal';

const { cn } = BackendlessUI.CSSUtils;

export default function SimpleModal({ component, eventHandlers }) {
  const {
    display,
    closingDuration,
  } = component;

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  component.closeModal = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setInputValue('');
    }, closingDuration);
  };

  component.openModal = () => {
    setIsOpen(true);
  };

  if (!display || !isOpen) {
    return null;
  }

  return (
    <Modal
      component={ component }
      eventHandlers={ eventHandlers }
      inputValue={ inputValue }
      isOpen={ isOpen }
      setInputValue={ setInputValue }
      isClosing={ isClosing }
    />
  );
}
