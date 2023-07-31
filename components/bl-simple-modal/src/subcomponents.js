import { useMemo } from 'react';

import modalTypes from './modal-types';
import { sanitize } from './sanitize';

function SimpleModalInput(props) {
  const { inputValue, placeholder, setInputValue } = props;

  const onChange = event => {
    setInputValue(event.target.value);
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
  const { content, type, inputValue, setInputValue, placeholder } = props;
  const sanitizedContent = useMemo(() => content ? sanitize(content) : '', [content]);

  return (
    <div className="simple-modal__container">
      { content && (
        <p className="simple-modal__text" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>
      ) }

      { type === modalTypes.prompt && (
        <SimpleModalInput
          inputValue={ inputValue }
          setInputValue={ setInputValue }
          placeholder={ placeholder }
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
  const { type, onClose, onSubmit, inputValue, submitButtonLabel, closeButtonLabel } = props;

  const onSubmitHandler = () => {
    if (type === modalTypes.confirm) {
      onSubmit();
    } else {
      onSubmit({ inputValue });
    }
  };

  return (
    <div className="simple-modal__button-container">
      <button
        type="button"
        className="simple-modal__button close-button"
        onClick={ onClose }
      >
        { closeButtonLabel }
      </button>

      { (type === modalTypes.prompt || type === modalTypes.confirm) && (
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
