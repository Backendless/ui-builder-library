export const Label = ({ label, state }) => {
  const { isAutocompleteActive, autocompleteValue } = state;
  const labelStyle = {
    transform: isAutocompleteActive || autocompleteValue
      ? 'translate(14px, -9px) scale(0.75)'
      : 'translate(14px, 16px) scale(1)',
  };

  return (
    <label
      htmlFor="autocomplete"
      style={ labelStyle }
      className="label">
      {label}
    </label>
  );
};
