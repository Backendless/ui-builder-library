import { actions } from '../../../hooks/useAutocomplete';

export const Suggestion = ({ dispatch, item, onAutocompleteChange }) => {
  const handleClick = (value) => {
    dispatch({ type: actions.HANDLE_AUTOCOMPLETE_VALUE, value });
    dispatch({ type: actions.HANDLE_SUGGESTIONS_OPEN, value: false });
    
    if (onAutocompleteChange) {
      onAutocompleteChange({ autocompleteValue: value });
    }
  };

  return (
    <div
      onClick={() => handleClick(item)}
      className="suggestion">
      {item.label}
    </div>
  );
};
