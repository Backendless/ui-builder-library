import { useState, useEffect } from 'react';
import { SimpleModalButton, SimpleModalContainer, SimpleModalTitle } from './subcomponents';

export default function SimpleModal({ component, eventHandlers }) {
  const {
    display,
    classList,
    titleModal,
    textModal,
    typeSimpleModal,
    placeholderText,
    closeButtonLabel,
    submitButtonLabel,
    closingDuration,
  } = component;
  const { onClose, onSubmit, onInputValueChange } = eventHandlers;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const simpleModalClasses = useSimpleModalClasses(isClosing);

  component.closeModal = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setInputValue('');
    }, closingDuration);
  };

  component.openModal = () => {
    setIsModalOpen(true);
    setIsClosing(false);
  };

  useEffect(() => {
    onInputValueChange({ inputValue });
  }, [inputValue]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [isModalOpen]);

  if (!display || !isModalOpen) {
    return null;
  }

  return (
    <div className={ 'bl-customComponent-simple-modal ' + classList.join(' ') }>
      <div className={ simpleModalClasses } style={ { animationDuration: `${ closingDuration }ms` } }>
        <div onClick={ onClose } className="overlay"></div>
        <div className="simple-modal__content">
          { titleModal && (<SimpleModalTitle titleModal={ titleModal }/>) }
          { (typeSimpleModal === 'prompt' || textModal) && (
            <SimpleModalContainer
              textModal={ textModal }
              typeSimpleModal={ typeSimpleModal }
              inputValue={ inputValue }
              setInputValue={ setInputValue }
              placeholderText={ placeholderText }
            />
          ) }

          <SimpleModalButton
            typeSimpleModal={ typeSimpleModal }
            onClose={ onClose }
            onSubmit={ onSubmit }
            inputValue={ inputValue }
            submitButtonLabel={ submitButtonLabel }
            closeButtonLabel={ closeButtonLabel }
          />
        </div>
      </div>
    </div>
  );
}

const useSimpleModalClasses = (isClosing) => {
  const classes = ['simple-modal'];

  classes.push(isClosing ? 'close-modal' : 'open-modal');

  return classes.join(' ');
};
