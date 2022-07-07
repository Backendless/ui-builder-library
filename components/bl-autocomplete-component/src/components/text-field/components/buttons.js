import { actions } from '../../../hooks/useAutocomplete';

export const Buttons = ({ state, dispatch, onButtonClearClick }) => {
  const { isSuggestionsOpen } = state;

  const popupButtonClasses = () => {
    const classes = ['button'];

    if (isSuggestionsOpen) {
      classes.push('button__popup-up');
    }

    return classes.join(' ');
  };

  const handleClick = () => {
    dispatch({ type: actions.HANDLE_SUGGESTIONS_OPEN, value: !isSuggestionsOpen });
  };

  const handleInputClear = () => {
    dispatch({ type: actions.HANDLE_AUTOCOMPLETE_VALUE, value: null });
    dispatch({ type: actions.HANDLE_INPUT_VALUE, value: '' });
    
    if (onButtonClearClick) {
      onButtonClearClick({ autocompleteValue: null });
    }
  };

  return (
    <div className="button-container">
      {state.autocompleteValue && (
        <button
          tabIndex="-1"
          type="button"
          onClick={ handleInputClear }
          className="button button__clear">
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="icon">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      )}
      <button
        tabIndex="-1"
        type="button"
        onClick={ handleClick }
        className={ popupButtonClasses() }>
        <svg
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="icon">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
    </div>
  );
};
