import { ButtonClear } from './button-clear';
import { ButtonPopup } from './button-popup';

export function ButtonContainer(props) {
  const {
    disabled,
    isOptionsOpen,
    autocompleteValue,
    setInputValue,
    setIsOptionsOpen,
    setAutocompleteValue,
    onButtonClearClick,
  } = props;

  return (
    <div className="button-container">
      { autocompleteValue &&
        <ButtonClear
          disabled={ disabled }
          setInputValue={ setInputValue }
          onButtonClearClick={ onButtonClearClick }
          setAutocompleteValue={ setAutocompleteValue }
        />
      }
      <ButtonPopup
        disabled={ disabled }
        isOptionsOpen={ isOptionsOpen }
        setIsOptionsOpen={ setIsOptionsOpen }
      />
    </div>
  );
};
