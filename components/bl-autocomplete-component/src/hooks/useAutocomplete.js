import { useMemo, useReducer } from 'react';

export const actions = {
  HANDLE_SUGGESTIONS_OPEN: 'HANDLE_SUGGESTIONS_OPEN',
  HANDLE_INPUT_VALUE: 'HANDLE_INPUT_VALUE',
  HANDLE_AUTOCOMPLETE_VALUE: 'HANDLE_AUTOCOMPLETE_VALUE',
  HANDLE_AUTOCOMPLETE_ACTIVE: 'HANDLE_AUTOCOMPLETE_ACTIVE',
  HANDLE_AUTOCOMPLETE_DISABLE: 'HANDLE_AUTOCOMPLETE_DISABLE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.HANDLE_SUGGESTIONS_OPEN:
      return {
        ...state,
        isSuggestionsOpen: action.value,
      };
    case actions.HANDLE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.value,
      };
    case actions.HANDLE_AUTOCOMPLETE_VALUE:
      return {
        ...state,
        inputValue: '',
        autocompleteValue: action.value,
      };
    case actions.HANDLE_AUTOCOMPLETE_ACTIVE:
      return {
        ...state,
        isAutocompleteActive: true,
      };
    case actions.HANDLE_AUTOCOMPLETE_DISABLE:
      return {
        ...state,
        isAutocompleteActive: false,
        isSuggestionsOpen: false,
      };

    default:
      return state;
  }
};

const initialState = {
  isSuggestionsOpen: false,
  isAutocompleteActive: false,
  inputValue: '',
  autocompleteValue: null,
};

export const useAutocomplete = suggestions => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const autocompleteState = useMemo(() => {
    const filteredSuggestions = suggestions.filter(({ label }) => (
      label.toLowerCase().includes(state.inputValue.toLowerCase())
    ));

    return {
      ...state,
      suggestions: filteredSuggestions,
    };
  }, [state, suggestions]);

  return [autocompleteState, dispatch];
};
