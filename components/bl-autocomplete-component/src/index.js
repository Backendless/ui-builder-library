import { useCallback, useRef, useEffect } from 'react';

import { TextField } from './components/text-field';
import { Suggestions } from './components/suggestions';

import { validate } from './utils/validate';

import { actions } from './hooks/useAutocomplete';
import { useAutocomplete } from './hooks/useAutocomplete';
import { useOnClickOutside } from './hooks/useOnClickOutside';

export default function AutocompleteComponent({ component, eventHandlers }) {
  const { label, suggestions } = component;
  const { onAutocompleteChange, onButtonClearClick } = eventHandlers;
  
  const rootRef = useRef();
  const autocompleteRef = useRef();
  const [state, dispatch] = useAutocomplete(validate(suggestions));

  const autocompleteHeight = autocompleteRef.current?.getBoundingClientRect()?.height;
  
  const handleClickOutside = useCallback(() => {
    dispatch({ type: actions.HANDLE_AUTOCOMPLETE_DISABLE });
    dispatch({ type: actions.HANDLE_INPUT_VALUE, value: '' });
  }, [dispatch]);

  useOnClickOutside(rootRef, handleClickOutside);
  
  const autocompleteClasses = () => {
    const { autocompleteValue, isAutocompleteActive } = state;

    const classes = ['bl-customComponent-autocomplete'];

    if (autocompleteValue) {
      classes.push('has-clear-button');
    }

    if (isAutocompleteActive) {
      classes.push('autocomplete-focused');
    }

    return classes.join(' ');
  };

  return (
    <div
      ref={rootRef}
      className={autocompleteClasses()}>
      <TextField
        ref={autocompleteRef}
        label={label}
        state={state}
        dispatch={dispatch}
        onButtonClearClick={onButtonClearClick}
      />
      {state.isSuggestionsOpen && (
        <Suggestions
          state={state}
          autocompleteHeight={autocompleteHeight}
          dispatch={dispatch}
          onAutocompleteChange={onAutocompleteChange}
        />
      )}
    </div>
  );
};
