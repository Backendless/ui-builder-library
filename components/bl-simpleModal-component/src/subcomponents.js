function SimpleModalInput(props) {
  const {
    inputValue,
    placeholder,
    onInputValue,
  } = props;

  const onInputChange = (event) => {
    onInputValue(event.target.value);
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
          onChange={ onInputChange }
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
  const {
    content,
    type,
    inputValue,
    setInputValue,
    placeholder,
  } = props;

  return (
    <div className="simple-modal__container">
      { content && (
        <p className="simple-modal__text">
          { content }
        </p>
      ) }

      { type === 'prompt' && (
        <SimpleModalInput
          inputValue={ inputValue }
          onInputValue={ setInputValue }
          placeholder={ placeholder }
        />
      ) }
    </div>
  );
}

export function Title(props) {
  const { title } = props;

  return (
    <h2 className="simple-modal__title">
      { title }
    </h2>
  );
}

export function Button(props) {
  const {
    type,
    onClose,
    onSubmit,
    inputValue,
    submitButtonLabel,
    closeButtonLabel,
  } = props;

  const handlerSubmitted = () => {
    if (type === 'confirm') {
      onSubmit();
    } else {
      onSubmit({ inputValue });
    }
  };

  return (
    <div className="simple-modal__button-container">
      <button
        type="button"
        className="simple-modal__button"
        onClick={ onClose }
      >
        { closeButtonLabel }
      </button>

      { (type === 'prompt' || type === 'confirm') && (
        <button
          type="button"
          className="simple-modal__button"
          onClick={ handlerSubmitted }
        >
          { submitButtonLabel }
        </button>
      ) }
    </div>
  );
}
