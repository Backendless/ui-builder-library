import { useState, useEffect } from 'react';
import { SimpleModalButton, SimpleModalContainer } from './subcomponents';

export default function MyCustomComponent({ component, eventHandlers }) {
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
  const { onCloseButton, onSubmitButton, onInputValueChange } = eventHandlers;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const simpleModalClasses = useSimpleModalClasses(isClosing);

  component.closeModal = () => {
    setIsClosing(false);

    setTimeout(() => {
      setIsModalOpen(false);
      setInputValue('');
    }, (closingDuration * 1000));
  };

  useEffect(() => {
    setIsClosing(isModalOpen);
  }, [isModalOpen]);

  component.openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    onInputValueChange({ inputValue });
  }, [inputValue]);

  if (isModalOpen) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  if (!display || !isModalOpen) {
    return null;
  }

  return (
    <div className={ 'bl-customComponent-simple-modal ' + classList.join(' ') }>
      <div className={ simpleModalClasses } style={ { animationDuration: `${ closingDuration }s` } }>
        <div onClick={ onCloseButton } className="overlay"></div>
        <div className="simple-modal__content">
          { titleModal && (
            <h2 className="simple-modal__title">
              { titleModal }
            </h2>
          ) }
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
            onCloseButton={ onCloseButton }
            onSubmitButton={ onSubmitButton }
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

  classes.push(isClosing ? 'open-modal' : 'close-modal');

  return classes.join(' ');
};
