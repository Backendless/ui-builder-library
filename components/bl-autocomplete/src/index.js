import { useState, useMemo, useCallback, useRef } from 'react';

import { useOnClickOutside, useFilteredOptions, validate } from './helpers';
import { Options } from './options';
import { TextField } from './text-field';

const { cn } = BackendlessUI.CSSUtils;

export default function AutocompleteComponent({ component, eventHandlers, elRef }) {
  const { classList, style, display, disabled, placeholder, emptyOptionsLabel, variant, options } = component;

  const autocompleteRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const [isOptionsOpen, setIsOptionsOpen]= useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [isAutocompleteActive, setIsAutocompleteActive] = useState(false);

  const optionsList = useMemo(() => validate(options), [options]);

  const hasGroup = !!optionsList[0]?.groupLabel;
  const autocompleteHeight = autocompleteRef.current?.getBoundingClientRect()?.height;

  const filteredOptions = useFilteredOptions(optionsList, inputValue, hasGroup);

  const classes = cn(
    'bl-customComponent-autocomplete', `bl-customComponent-autocomplete--${variant}`, classList,
    {
      'bl-customComponent-autocomplete--disabled': disabled,
      'has-clear-button': autocompleteValue,
      'autocomplete-focused': isAutocompleteActive,
    }
  );

  const handleClickOutside = useCallback(() => {
    setIsOptionsOpen(false);
    setIsAutocompleteActive(false);
    setInputValue('');
  }, []);

  useOnClickOutside(elRef, handleClickOutside);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      style={ style }
      className={ classes }>
      <TextField
        ref={ autocompleteRef }
        disabled={ disabled }
        inputValue={ inputValue }
        placeholder={ placeholder }
        isOptionsOpen={ isOptionsOpen }
        autocompleteValue={ autocompleteValue }
        isAutocompleteActive={ isAutocompleteActive }
        setInputValue={ setInputValue }
        setIsOptionsOpen={ setIsOptionsOpen }
        setAutocompleteValue={ setAutocompleteValue }
        setIsAutocompleteActive={ setIsAutocompleteActive }
        eventHandlers={ eventHandlers }
      />
      { isOptionsOpen && (
        <Options
          hasGroup={ hasGroup }
          optionsList={ filteredOptions }
          emptyOptionsLabel={ emptyOptionsLabel }
          autocompleteHeight={ autocompleteHeight }
          setInputValue={ setInputValue }
          setIsOptionsOpen={ setIsOptionsOpen }
          setAutocompleteValue={ setAutocompleteValue }
          onChange={ eventHandlers.onChange }
        />
      ) }
    </div>
  );
};
