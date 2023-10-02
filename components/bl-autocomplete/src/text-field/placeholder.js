const { cn } = BackendlessUI.CSSUtils;

export const Placeholder = props => {
  const { placeholder, autocompleteId, autocompleteValue, isAutocompleteActive } = props;

  return (
    <label
      htmlFor={ autocompleteId }
      className={ cn('placeholder', { ['placeholder__move-up']: isAutocompleteActive || autocompleteValue }) }>
      { placeholder }
    </label>
  );
};
