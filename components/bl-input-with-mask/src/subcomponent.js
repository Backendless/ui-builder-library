import { useMemo } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export const Input = props => {
  const { inputRef, htmlFor, eventHandlers, setIsFocused, readOnly, disabled } = props;
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
      readOnly={ readOnly }
      disabled={ disabled }
    />
  );
};

export const Placeholder = props => {
  const { placeholder, htmlFor, value, isFocused, disabled } = props;

  const classes = useMemo(() => cn('input-with-mask__label',
    {
      'input-with-mask__label--move-up' : isFocused || value,
      'input-with-mask__label--focused' : isFocused,
      'input-with-mask__label--disabled': disabled,
    }
  ), [isFocused, value, disabled]);

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
