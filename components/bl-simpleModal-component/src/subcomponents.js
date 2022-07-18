const SimpleModalInput = (props) => {
  const {
    inputValue,
    placeholderText,
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
          placeholder={ placeholderText }
          value={ inputValue }
          onChange={ onInputChange }
        />
        <label
          htmlFor="modal-input"
          className="form-input__placeholder"
        >
          { placeholderText }
        </label>
      </div>
    </div>
  );
};

export const SimpleModalContainer = (props) => {
  const {
    titleModal,
    typeSimpleModal,
    inputValue,
    setInputValue,
    placeholderText,
  } = props;

  return (
    <div className="simple-modal__container">
      { titleModal && (
        <p className="simple-modal__text">
          { titleModal }
        </p>
      ) }

      { typeSimpleModal === 'prompt' && (
        <SimpleModalInput
          inputValue={ inputValue }
          onInputValue={ setInputValue }
          placeholderText={ placeholderText }
        />
      ) }
    </div>
  );
};

export const SimpleModalButton = (props) => {
  const {
    typeSimpleModal,
    onCloseButton,
    onSubmitButton,
    inputValue,
    submitButtonLabel,
    closeButtonLabel,
  } = props;

  const handlerSubmitted = () => {
    if (typeSimpleModal === 'confirm') {
      onSubmitButton();
    } else {
      onSubmitButton({ inputValue });
    }
  };

  return (
    <div className="simple-modal__button-container">
      <button
        type="button"
        className="simple-modal__button"
        onClick={ onCloseButton }
      >
        { closeButtonLabel }
      </button>

      { (typeSimpleModal === 'prompt' || typeSimpleModal === 'confirm') && (
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
};
