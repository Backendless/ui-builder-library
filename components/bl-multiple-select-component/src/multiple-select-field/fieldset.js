const { cn } = BackendlessUI.CSSUtils;

export function Fieldset({ placeholder, selectValue, isSelectActive }) {
  return (
    <fieldset className={ cn('fieldset', { ['fieldset__active']: isSelectActive }) }>
      <legend className={ cn('legend', { ['legend__with-label']: isSelectActive || selectValue.length }) }>
        { placeholder }
      </legend>
    </fieldset>
  );
}
