import { forwardRef, useMemo, useRef } from 'react';

import { Buttons } from './buttons';
import { Fieldset } from './fieldset';
import { Input } from './input';
import { Placeholder } from './placeholder';

export const TextField = forwardRef((props, ref) => {
  const {
    inputValue,
    disabled,
    placeholder,
    autocompleteValue,
    isOptionsOpen,
    isAutocompleteActive,
    setInputValue,
    setIsOptionsOpen,
    setAutocompleteValue,
    setIsAutocompleteActive,
    eventHandlers,
  } = props;

  const { onButtonClearClick, onChange } = eventHandlers;

  const inputRef = useRef(null);
  const autocompleteId = useMemo(() => getId(), []);

  const handleClick = () => {
    inputRef.current.focus();
    
    if (!disabled) {
      setIsAutocompleteActive(true);
    }
  };

  return (
    <div
      ref={ ref }
      onClick={ handleClick }
      className="autocomplete">
      <Placeholder
        placeholder={ placeholder }
        autocompleteId={ autocompleteId }
        autocompleteValue={ autocompleteValue }
        isAutocompleteActive={ isAutocompleteActive }
      />
      <div className="autocomplete__text-field">
        <Input
          ref={ inputRef }
          inputValue={ inputValue }
          disabled={ disabled }
          autocompleteId={ autocompleteId }
          autocompleteValue={ autocompleteValue }
          isOptionsOpen={ isOptionsOpen }
          onChange={ onChange }
          setInputValue={ setInputValue }
          setIsOptionsOpen={ setIsOptionsOpen }
        />
        <Buttons
          disabled={ disabled }
          isOptionsOpen={ isOptionsOpen }
          autocompleteValue={ autocompleteValue }
          setInputValue={ setInputValue }
          setIsOptionsOpen={ setIsOptionsOpen }
          setAutocompleteValue={ setAutocompleteValue }
          onButtonClearClick={ onButtonClearClick }
        />
        <Fieldset
          placeholder={ placeholder }
          autocompleteValue={ autocompleteValue }
          isAutocompleteActive={ isAutocompleteActive }
        />
      </div>
    </div>
  );
});

const getId = () => {
  const chr4 = () => Math.random().toString(16).slice(-4);
  const chr8 = () => `${chr4()}${chr4()}`;

  return `${chr8()}${chr8()}`;
};
