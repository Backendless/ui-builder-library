function SimpleModalInput(props) {
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

export function SimpleModalContainer(props) {
  const {
    textModal,
    typeSimpleModal,
    inputValue,
    setInputValue,
    placeholderText,
  } = props;

  return (
    <div className="simple-modal__container">
      { textModal && (
        <p className="simple-modal__text">
          { textModal }
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

export function SimpleModalTitle(props) {
  const { titleModal } = props;

  return (
    <h2 className="simple-modal__title">
      { titleModal }
    </h2>
  );
}

export function SimpleModalButton(props) {
  const {
    typeSimpleModal,
    onClose,
    onSubmit,
    inputValue,
    submitButtonLabel,
    closeButtonLabel,
  } = props;

  const handlerSubmitted = () => {
    if (typeSimpleModal === 'confirm') {
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
