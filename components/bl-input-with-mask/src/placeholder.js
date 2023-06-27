const { cn } = BackendlessUI.CSSUtils;

export const Placeholder = ({ placeholder, htmlFor, value, isFocused }) => {

  return (
    <label
      htmlFor={ htmlFor }
      className={ cn('placeholder', { 'placeholder__move-up': isFocused || value }) }>
      { placeholder }
    </label>
  );
};
