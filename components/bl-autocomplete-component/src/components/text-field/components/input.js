import { forwardRef } from 'react';

import { actions } from '../../../hooks/useAutocomplete';

export const Input = forwardRef(
  ({
    state,
    dispatch,
  }, ref) => {
  const { inputValue, autocompleteValue, isSuggestionsOpen } = state;
  let value;

  if (!autocompleteValue) {
    value = inputValue;
  } else if (!inputValue && autocompleteValue) {
    value = autocompleteValue?.label;
  } else {
    value = inputValue;
  }

  const handleChange = ({ target: { value } }) => {
    dispatch({ type: actions.HANDLE_INPUT_VALUE, value });
    dispatch({ type: actions.HANDLE_SUGGESTIONS_OPEN, value: true });
  };

  return (
    <div
      onClick={ () => dispatch({ type: actions.HANDLE_SUGGESTIONS_OPEN, value: !isSuggestionsOpen }) }
      className="input__container">
      <input
        ref={ ref }
        type="text"
        id="autocomplete"
        autoComplete="off"
        value={ value }
        onChange={ handleChange }
        className="input__field"
      />
    </div>
  );}
);
