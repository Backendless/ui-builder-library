export const Placeholder = props => {
  const {
    placeholder,
    autocompleteId,
    autocompleteValue,
    isAutocompleteActive,
  } = props;

  const classes = () => {
    const classesList = ['placeholder'];

    if (isAutocompleteActive || autocompleteValue) {
      classesList.push('placeholder__move-up');
    }

    return classesList.join(' ');
  };

  return (
    <label
      htmlFor={ autocompleteId }
      className={ classes() }>
      { placeholder }
    </label>
  );
};
