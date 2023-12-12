import { useMemo } from 'react';

import { modalTypes } from './constants';
import { sanitize } from './sanitize';

function SimpleModalInput(props) {
  const { inputValue, placeholder, setInputValue, onSubmit } = props;

  const onChange = event => {
    setInputValue(event.target.value);
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit({ inputValue });
    }
  };

  return (
    <div className="simple-modal__input-form">
      <div className="form-input">
        <input
          type="text"
          id="modal-input"
          className="form-input__input"
          autoComplete="off"
          placeholder={ placeholder }
          value={ inputValue }
          onChange={ onChange }
          onKeyDown={ onKeyDown }
        />
        <label
          htmlFor="modal-input"
          className="form-input__placeholder"
        >
          { placeholder }
        </label>
      </div>
    </div>
  );
}

export function Container(props) {
  const { content, type, inputValue, setInputValue, placeholder, onSubmit } = props;
  const sanitizedContent = useMemo(() => content ? sanitize(content) : '', [content]);

  return (
    <div className="simple-modal__container">
      { content && (
        <p className="simple-modal__text" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>
      ) }

      { type === modalTypes.PROMPT && (
        <SimpleModalInput
          inputValue={ inputValue }
          setInputValue={ setInputValue }
          placeholder={ placeholder }
          onSubmit={ onSubmit }
        />
      ) }
    </div>
  );
}

export function Title({ content }) {
  if (!content) {
    return null;
  }

  return (
    <h2 className="simple-modal__title">{ content }</h2>
  );
}

export function ModalButtons(props) {
  const { type, onCloseHandler, onSubmitHandler, submitButtonLabel, closeButtonLabel } = props;

  return (
    <div className="simple-modal__button-container">
      <button
        type="button"
        className="simple-modal__button close-button"
        onClick={ onCloseHandler }
      >
        { closeButtonLabel }
      </button>

      { (type === modalTypes.PROMPT || type === modalTypes.CONFIRM) && (
        <button
          type="button"
          className="simple-modal__button submit-button"
          onClick={ onSubmitHandler }
        >
          { submitButtonLabel }
        </button>
      ) }
    </div>
  );
}
