const { cn } = BackendlessUI.CSSUtils;

export function Label(props) {
  const { multipleSelectId, placeholder, multipleSelectValue, isMultipleSelectActive } = props;

  return (
    <label
      htmlFor={ multipleSelectId }
      className={ cn("label", { ["label__move-up"]: isMultipleSelectActive || multipleSelectValue.length > 0 }) }>
      { placeholder }
    </label>
  );
}
