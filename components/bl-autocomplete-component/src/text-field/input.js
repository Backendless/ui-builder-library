import { forwardRef } from 'react';

export const Input = forwardRef((props, ref) => {
  const {
    inputValue,
    disabled,
    autocompleteId,
    autocompleteValue,
    isOptionsOpen,
    onChange,
    setInputValue,
    setIsOptionsOpen,
  } = props;

  let value;

  if (!autocompleteValue) {
    value = inputValue;
  } else if (!inputValue && autocompleteValue) {
    value = autocompleteValue?.label;
  } else {
    value = inputValue;
  }

  const handleChange = ({ target: { value } }) => {
    setInputValue(value);
    setIsOptionsOpen(true);

    if (onChange) {
      onChange({ inputValue: value });
    }
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
