import { useEffect, useMemo } from 'react';
import { Title, Container, ModalButtons } from './subcomponents';
import modalTypes from './modal-types';

const { cn } = BackendlessUI.CSSUtils;

export function Modal(props) {
  const { component, eventHandlers, inputValue, setInputValue, isClosing } = props;
  const {
    style,
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

  const { modalClasses, rootClasses } = useClasses(classList, isClosing);

  const root = useMemo(() => {
    return document.createElement('div');
  }, []);
  root.className = rootClasses;

  useEffect(() => {
    document.body.appendChild(root);

    return () => {
      document.body.removeChild(root);
    };
  }, [root]);

  useEffect(() => {
    onInputValueChange({ inputValue });
  }, [inputValue]);

  return ReactDOM.createPortal(
    <div className={ modalClasses } style={ { animationDuration: `${ closingDuration }ms`, ...style } }>
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
  const rootClasses = cn('bl-customComponent-simple-modal', classList);
  const modalClasses = cn('simple-modal', isClosing ? 'close-modal' : 'open-modal');

  return { rootClasses, modalClasses };
};
