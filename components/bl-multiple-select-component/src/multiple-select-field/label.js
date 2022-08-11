const { cn } = BackendlessUI.CSSUtils;

export function Label(props) {
  const { selectId, placeholder, selectValue, isSelectActive } = props;

  return (
    <label
      htmlFor={ selectId }
      className={ cn("label", { ["label__move-up"]: isSelectActive || selectValue.length > 0 }) }>
      { placeholder }
    </label>
  );
}
