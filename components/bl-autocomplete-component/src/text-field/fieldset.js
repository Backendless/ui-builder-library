export const Fieldset = props => {
  const {
    placeholder,
    autocompleteValue,
    isAutocompleteActive,
  } = props;

  const legendClasses = () => {
    const classList = ['legend'];

    if (isAutocompleteActive || autocompleteValue) {
      classList.push('legend__with-label');
    }

    return classList.join(' ');
  };

  return (
    <fieldset className="fieldset">
      <legend className={ legendClasses() }>
        { placeholder }
      </legend>
    </fieldset>
  );
};
