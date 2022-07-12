import { useCallback, useRef, useState } from 'react';

import { useAutocompleteClassList, useOnClickOutside, validate } from './helpers';
import { Options } from './options';
import { TextField } from './text-field';

export default function AutocompleteComponent({ component, eventHandlers }) {
  const { disabled, placeholder, options, autocompleteVariant, classList } = component;
  const { onAutocompleteChange } = eventHandlers;

  const rootRef = useRef();
  const autocompleteRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const [isOptionsOpen, setIsOptionsOpen]= useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [isAutocompleteActive, setIsAutocompleteActive] = useState(false);

  const autocompleteHeight = autocompleteRef.current?.getBoundingClientRect()?.height;
  const optionsList = validate(options).filter(({ label }) => (
    label.toLowerCase().includes(inputValue.toLowerCase())
  ));

  const classesProps = {
    disabled,
    classList,
    autocompleteValue,
    autocompleteVariant,
    isAutocompleteActive,
  };

  const classes = useAutocompleteClassList(classesProps);

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
          optionsList={ optionsList }
          autocompleteHeight={ autocompleteHeight }
          setInputValue={ setInputValue }
          setIsOptionsOpen={ setIsOptionsOpen }
          setAutocompleteValue={ setAutocompleteValue }
          onAutocompleteChange={ onAutocompleteChange }
        />
      )}
    </div>
  );
};
