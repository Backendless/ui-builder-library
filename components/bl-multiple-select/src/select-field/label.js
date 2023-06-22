const { cn } = BackendlessUI.CSSUtils;

export function Label({ selectId, placeholder, selectValue, isSelectActive }) {

  return (
    <label
      htmlFor={ selectId }
      className={ cn("label", { "label__move-up": isSelectActive || selectValue.length }) }>
      { placeholder }
    </label>
  );
}
