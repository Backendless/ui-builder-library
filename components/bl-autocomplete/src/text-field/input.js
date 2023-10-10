import { forwardRef } from 'react';

export const Input = forwardRef((props, ref) => {
  const {
    inputValue, disabled, autocompleteId, autocompleteValue, isOptionsOpen, onChange, setInputValue, setIsOptionsOpen,
  } = props;

  const value = validateValue(inputValue, autocompleteValue);

  const handleChange = ({ target: { value } }) => {
    setInputValue(value);
    setIsOptionsOpen(true);
    onChange({ inputValue: value });
  };

  const handleClick = () => {
    if (!disabled) {
      setIsOptionsOpen(!isOptionsOpen);
    }
  };

  return (
    <div
      onClick={ handleClick }
      className="input__container">
      <input
        id={ autocompleteId }
        ref={ ref }
        type="text"
        autoComplete="off"
        value={ value }
        disabled={ disabled }
        onChange={ handleChange }
        className="input__field"
      />
    </div>
  );
});

const validateValue = (inputValue, autocompleteValue) => {
  if (!autocompleteValue) {
    return inputValue;
  }

  if (!inputValue && autocompleteValue) {
    return autocompleteValue?.label;
  }

  return inputValue;
};
