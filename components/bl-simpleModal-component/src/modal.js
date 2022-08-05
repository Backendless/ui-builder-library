import { useEffect, useMemo } from 'react';
import { Title, Container, ModalButtons } from './subcomponents';
import modalTypes from './modal-types';

const { cn } = BackendlessUI.CSSUtils;

export function Modal(props) {
  const { component, eventHandlers, inputValue, isOpen, setInputValue, isClosing } = props;
  const {
    title,
    content,
    classList,
    type,
    placeholder,
    closeButtonLabel,
    submitButtonLabel,
    closingDuration
  } = component;
  const { onInputValueChange, onClose, onSubmit } = eventHandlers;

  const { modalClasses } = useClasses(classList, isClosing);

  const root = useMemo(() => {
    return document.createElement('div');
  }, [])
  root.classList.add(cn('bl-customComponent-simple-modal', classList));

  useEffect(() => {
    document.body.appendChild(root);

    return () => {
      document.body.removeChild(root);
    };
  },[root]);

  useEffect(() => {
    onInputValueChange({ inputValue });
  }, [inputValue]);

  useEffect(() => {
    document.body.classList.toggle('active-modal', isOpen);
  }, [isOpen]);

  return ReactDOM.createPortal(
    <div className={ modalClasses } style={ { animationDuration: `${ closingDuration }ms` } }>
      <div onClick={ onClose } className="overlay"></div>
      <div className="simple-modal__content">
        <Title content={ title }/>
        { (type === modalTypes.prompt || content) && (
          <Container
            content={ content }
            type={ type }
            inputValue={ inputValue }
            setInputValue={ setInputValue }
            placeholder={ placeholder }
          />
        ) }

        <ModalButtons
          type={ type }
          onClose={ onClose }
          onSubmit={ onSubmit }
          inputValue={ inputValue }
          submitButtonLabel={ submitButtonLabel }
          closeButtonLabel={ closeButtonLabel }
        />
      </div>
    </div>,
    root
  );
}

const useClasses = (classList, isClosing) => {
  const rootClasses = ['bl-customComponent-simple-modal ', ...classList];
  const modalClasses = ['simple-modal'];

  modalClasses.push(isClosing ? 'close-modal' : 'open-modal');

  return { rootClasses: rootClasses.join(' '), modalClasses: modalClasses.join(' ') };
};
