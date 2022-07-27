export const Fieldset = ({ placeholder, multipleSelectValue, isMultipleSelectActive }) => {
  const legendClasses = () => {
    const classList = ['legend'];

    if (isMultipleSelectActive || multipleSelectValue.length > 0) {
      classList.push('legend__with-label');
    }

    return classList.join(' ');
  };

  const fieldsetClasses = () => {
    const classList = ['fieldset'];

    if (isMultipleSelectActive) {
      classList.push('fieldset__active');
    }

    return classList.join(' ');
  };

  return (
    <fieldset className={ fieldsetClasses() }>
      <legend className={ legendClasses() }>
        { placeholder }
      </legend>
    </fieldset>
  );
};
