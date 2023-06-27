export const Input = ({ ref, htmlFor, placeholder, eventHandlers, setIsFocused }) => {
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
    <div className="input-with-mask__conteiner">
      <input
        type="text"
        ref={ ref }
        id={ htmlFor }
        className="input-with-mask__field"
        onFocus={ onFocusHandler }
        onBlur={ onBlurHandler }
        onMouseEnter={ event => onMouseEnter({ event }) }
        onMouseLeave={ event => onMouseLeave({ event }) }
      />
    </div>
  );
};
