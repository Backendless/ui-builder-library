export const Input = ({ inputRef, htmlFor, eventHandlers, setIsFocused }) => {
  const { onFocusEvent, onLostFocusEvent, onMouseEnter, onMouseLeave } = eventHandlers;

  const onFocusHandler = event => {
    onFocusEvent({ event });
    setIsFocused(true);
  };

  const onBlurHandler = event => {
    onLostFocusEvent({ event });
    setIsFocused(false);
  };

  return (
    <input
      type="text"
      ref={ inputRef }
      id={ htmlFor }
      className="input-with-mask__field"
      onFocus={ onFocusHandler }
      onBlur={ onBlurHandler }
      onMouseEnter={ event => onMouseEnter({ event }) }
      onMouseLeave={ event => onMouseLeave({ event }) }
    />
  );
};
