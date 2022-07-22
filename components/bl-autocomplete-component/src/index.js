import { useCallback, useEffect, useRef, useState } from 'react';

import { useAutocompleteClassList, useOnClickOutside, validate } from './helpers';
import { Options } from './options';
import { TextField } from './text-field';

export default function AutocompleteComponent({ component, eventHandlers }) {
  const { disabled, placeholder, options, autocompleteVariant, classList } = component;

  const rootRef = useRef();
  const autocompleteRef = useRef();
  const [optionList, setOptionList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isOptionsOpen, setIsOptionsOpen]= useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [isAutocompleteActive, setIsAutocompleteActive] = useState(false);
  
  useEffect(() => {
    setOptionList(validate(options));
  }, [options]);

  const autocompleteHeight = autocompleteRef.current?.getBoundingClientRect()?.height;
  const filteredOptions = optionList.filter(({ label }) => (
    label.toLowerCase().includes(inputValue.toLowerCase())
  ));

  const classes = useAutocompleteClassList({
    disabled,
    classList,
    autocompleteValue,
    autocompleteVariant,
    isAutocompleteActive,
  });

  const handleClickOutside = useCallback(() => {
    setIsOptionsOpen(false);
    setIsAutocompleteActive(false);
    setInputValue('');
  }, []);

  useOnClickOutside(rootRef, handleClickOutside);

  return (
    <div
      ref={ rootRef }
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
