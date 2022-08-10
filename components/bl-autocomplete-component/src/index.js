import { useCallback, useEffect, useRef, useState } from 'react';

import { useOnClickOutside, validate } from './helpers';
import { Options } from './options';
import { TextField } from './text-field';

const { cn } = BackendlessUI.CSSUtils;

export default function AutocompleteComponent({ component, eventHandlers }) {
  const { disabled, placeholder, options, autocompleteVariant, classList } = component;

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

  const classes = cn(
    'bl-customComponent-autocomplete',
    autocompleteVariant,
    classList,
    {
      disabled,
      ['has-clear-button']: autocompleteValue,
      ['autocomplete-focused']: isAutocompleteActive,
    }
  );

  const handleClickOutside = useCallback(() => {
    setIsOptionsOpen(false);
    setIsAutocompleteActive(false);
    setInputValue('');
  }, []);

  useOnClickOutside(rootRef, handleClickOutside);

  return (
    <div ref={ rootRef } className={ classes }>
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
