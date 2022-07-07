import { useCallback, useRef } from 'react';

import { Suggestions } from './components/suggestions';
import { TextField } from './components/text-field';
import { actions } from './hooks/useAutocomplete';
import { useAutocomplete } from './hooks/useAutocomplete';
import { useAutocompleteClassList } from './hooks/useAutocompleteClassList';
import { useOnClickOutside } from './hooks/useOnClickOutside';
import { validate } from './utils/validate';

export default function AutocompleteComponent({ component, eventHandlers }) {
  const { label, suggestions, classList } = component;
  const { onAutocompleteChange, onButtonClearClick } = eventHandlers;

  const rootRef = useRef();
  const autocompleteRef = useRef();
  const [state, dispatch] = useAutocomplete(validate(suggestions));

  const classesProps = {
    classList,
    autocompleteValue: state.autocompleteValue,
    isAutocompleteActive: state.isAutocompleteActive,
  };

  const classes = useAutocompleteClassList(classesProps);
  const autocompleteHeight = autocompleteRef.current?.getBoundingClientRect()?.height;
  
  const handleClickOutside = useCallback(() => {
    dispatch({ type: actions.HANDLE_AUTOCOMPLETE_DISABLE });
    dispatch({ type: actions.HANDLE_INPUT_VALUE, value: '' });
  }, [dispatch]);
  
  useOnClickOutside(rootRef, handleClickOutside);

  return (
    <div
      ref={ rootRef }
      className={ classes }>
      <TextField
        ref={ autocompleteRef }
        label={ label }
        state={ state }
        dispatch={ dispatch }
        onButtonClearClick={ onButtonClearClick }
      />
      {state.isSuggestionsOpen && (
        <Suggestions
          state={ state }
          autocompleteHeight={ autocompleteHeight }
          dispatch={ dispatch }
          onAutocompleteChange={ onAutocompleteChange }
        />
      )}
    </div>
  );
};
