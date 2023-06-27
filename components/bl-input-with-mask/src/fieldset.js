const { cn } = BackendlessUI.CSSUtils;

export const Fieldset = ({ isFocused, value, placeholder }) => {

  return (
    <fieldset className="fieldset">
      <legend className={ cn('legend', { 'legend__with-label': isFocused || value }) }>
        { placeholder }
      </legend>
    </fieldset>
  );
};
