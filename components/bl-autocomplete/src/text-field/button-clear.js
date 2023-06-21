export function ButtonClear({ disabled, setInputValue, setAutocompleteValue, onButtonClearClick }) {
  const handleInputClear = () => {
    setInputValue('');
    setAutocompleteValue(null);

    if (onButtonClearClick) {
      onButtonClearClick({ autocompleteValue: null });
    }
  };
  
  return (
    <button
      tabIndex="-1"
      type="button"
      disabled={ disabled }
      onClick={ handleInputClear }
      className="button button__clear">
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="icon">
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </button>
  );
}