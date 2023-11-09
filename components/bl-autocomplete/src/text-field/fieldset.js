const { cn } = BackendlessUI.CSSUtils;

export const Fieldset = props => {
  const { placeholder, autocompleteValue, isAutocompleteActive } = props;

  return (
    <fieldset className="fieldset">
      <legend className={ cn('legend', { ['legend__with-label']: isAutocompleteActive || autocompleteValue }) }>
        { placeholder }
      </legend>
    </fieldset>
  );
};
