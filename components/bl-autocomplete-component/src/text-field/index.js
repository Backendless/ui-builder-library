import { forwardRef, useMemo, useRef } from 'react';

import { ButtonContainer } from './button-container';
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
  const autocompleteId = useMemo(() => BackendlessUI.UUID.short(), []);

  const handleClick = () => {
    inputRef.current.focus();

    if (!disabled) {
      setIsAutocompleteActive(true);
    }
  };

  return (
    <div ref={ ref } onClick={ handleClick } className="autocomplete">
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
        <ButtonContainer
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
