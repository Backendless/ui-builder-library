import { useRef, forwardRef } from 'react';

import { actions } from '../../hooks/useAutocomplete';
import { Input, Buttons, Fieldset, Label } from './components';

export const TextField = forwardRef(({
  label,
  state,
  dispatch,
  onButtonClearClick,
}, ref) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
    dispatch({ type: actions.HANDLE_AUTOCOMPLETE_ACTIVE })
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className="autocomplete">
      <Label
        label={label}
        state={state}
      />
      <div className="autocomplete__text-field">
        <Input
          ref={inputRef}
          state={state}
          dispatch={dispatch}
        />
        <Buttons
          state={state}
          dispatch={dispatch}
          onButtonClearClick={onButtonClearClick}
        />
        <Fieldset
          label={label}
          state={state}
        />
      </div>
    </div>
  );
});
