import { useMemo } from 'react';

const { cn } = BackendlessUI.CSSUtils;

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

export const Placeholder = ({ placeholder, htmlFor, value, isFocused }) => {
  const classes = useMemo(() => cn('input-with-mask__label',
    {
      'input-with-mask__label--move-up': isFocused || value,
      'input-with-mask__label--focused': isFocused,
    }
  ), [isFocused, value]);

  return (
    <label
      htmlFor={ htmlFor }
      className={ classes }>
      { placeholder }
    </label>
  );
};

export const Fieldset = ({ isFocused, value, placeholder }) => {
  const classes = useMemo(() => cn(
    'input-with-mask__legend',
    { 'input-with-mask__legend--with-label': isFocused || value }
  ), [isFocused, value]);

  return (
    <fieldset className="input-with-mask__fieldset">
      <legend className={ classes }>
        { placeholder }
      </legend>
    </fieldset>
  );
};
