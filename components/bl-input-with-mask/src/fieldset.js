const { cn } = BackendlessUI.CSSUtils;

export const Fieldset = ({ isFocused, value, placeholder }) => {

  return (
    <fieldset className="input-with-mask__fieldset">
      <legend className={ cn(
        'input-with-mask__legend',
        { 'input-with-mask__legend--with-label': isFocused || value }
      ) }>
        { placeholder }
      </legend>
    </fieldset>
  );
};
