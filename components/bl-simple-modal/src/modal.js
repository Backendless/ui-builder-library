import { useCallback, useEffect, useMemo } from 'react';

import modalTypes from './modal-types';
import { Container, ModalButtons, Title } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export function Modal(props) {
  const { component, eventHandlers, inputValue, setInputValue, isClosing } = props;
  const {
    style, title, content, classList, type, placeholder,
    closeButtonLabel, submitButtonLabel, closingDuration,
  } = component;
  const { onInputValueChange, onClose, onSubmit } = eventHandlers;

  const { modalClasses, rootClasses } = useClasses(classList, isClosing);

  const root = useMemo(() => document.createElement('div'), []);

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

  const onCloseHandler = useCallback(() => {
    if (onClose.hasLogic) {
      onClose();
    } else {
      component.closeModal();
    }
  }, []);

  const onSubmitHandler = useCallback(() => {
    const payload = type === modalTypes.confirm ? undefined : { inputValue };

    onSubmit(payload);
  }, [type, inputValue]);

  return ReactDOM.createPortal(
    <div className={ modalClasses } style={{ animationDuration: `${ closingDuration }ms`, ...style }}>
      <div onClick={ onCloseHandler } className="overlay"></div>
      <div className="simple-modal__content">
        <Title content={ title }/>
        { (type === modalTypes.prompt || content) && (
          <Container
            content={ content }
            type={ type }
            inputValue={ inputValue }
            setInputValue={ setInputValue }
            placeholder={ placeholder }
            onSubmit={ onSubmit }
          />
        ) }

        <ModalButtons
          type={ type }
          onCloseHandler={ onCloseHandler }
          onSubmitHandler={ onSubmitHandler }
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
