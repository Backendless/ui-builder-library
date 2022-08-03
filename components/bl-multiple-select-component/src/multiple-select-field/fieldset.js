const { cn } = BackendlessUI.CSSUtils;

export function Fieldset({ placeholder, multipleSelectValue, isMultipleSelectActive }) {
  return (
    <fieldset className={ cn("fieldset", { ["fieldset__active"]: isMultipleSelectActive }) }>
      <legend className={
        cn(
          "legend",
          { ["legend__with-label"]: isMultipleSelectActive || multipleSelectValue.length > 0 }
        ) }>
        { placeholder }
      </legend>
    </fieldset>
  );
}
