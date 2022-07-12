export const Fieldset = props => {
  const {
    placeholder,
    autocompleteValue,
    isAutocompleteActive,
  } = props;

  const legendStyle = {
    maxWidth: isAutocompleteActive || autocompleteValue
      ? '100%'
      : '0',
    transition: isAutocompleteActive || autocompleteValue
      ? 'max-width 100ms cubic-bezier(0, 0, 0.2, 1) 0ms'
      : 'max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  };

  return (
    <fieldset className="fieldset">
      <legend
        style={ legendStyle }
        className="legend">
        {placeholder}
      </legend>
    </fieldset>
  );
};
