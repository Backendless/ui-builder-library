import { useState, useEffect, useCallback, useRef } from 'react';

import { useOnClickOutside, validate } from './helpers';
import { Options } from './options';
import { TextField } from './text-field';

const { cn } = BackendlessUI.CSSUtils;

export default function AutocompleteComponent({ component, eventHandlers }) {
  const { classList, style, display, disabled, placeholder, variant, options } = component;

  const rootRef = useRef();
  const autocompleteRef = useRef();
  const [optionsList, setOptionsList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isOptionsOpen, setIsOptionsOpen]= useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [isAutocompleteActive, setIsAutocompleteActive] = useState(false);

  useEffect(() => {
    setOptionsList(validate(options));
  }, [options]);

  const autocompleteHeight = autocompleteRef.current?.getBoundingClientRect()?.height;
  const filteredOptions = optionsList.filter(({ label }) => (
    label.toLowerCase().includes(inputValue.toLowerCase())
  ));

  const handleClickOutside = useCallback(() => {
    setIsOptionsOpen(false);
    setIsAutocompleteActive(false);
    setInputValue('');
  }, []);

  useOnClickOutside(rootRef, handleClickOutside);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ rootRef }
      style={ style }
      className={
        cn(
          'bl-customComponent-autocomplete', `bl-customComponent-autocomplete--${variant}`, classList,
          {
            'bl-customComponent-autocomplete--disabled': disabled,
            'has-clear-button': autocompleteValue,
            'autocomplete-focused': isAutocompleteActive,
          }
        )
      }>
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
      {isOptionsOpen && (
        <Options
          optionList={ filteredOptions }
          autocompleteHeight={ autocompleteHeight }
          setInputValue={ setInputValue }
          setIsOptionsOpen={ setIsOptionsOpen }
          setAutocompleteValue={ setAutocompleteValue }
        />
      )}
    </div>
  );
};
