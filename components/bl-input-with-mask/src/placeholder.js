const { cn } = BackendlessUI.CSSUtils;

export const Placeholder = ({ placeholder, htmlFor, value, isFocused }) => {

  return (
    <label
      htmlFor={ htmlFor }
      className={ cn(
        'input-with-mask__label',
        {
          'input-with-mask__label--move-up': isFocused || value,
          'input-with-mask__label--focused': isFocused,
        }) }>
      { placeholder }
    </label>
  );
};
