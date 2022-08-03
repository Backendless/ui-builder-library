const { cn } = BackendlessUI.CSSUtils;

export function DropDownButton({ isOptionsOpen }) {
  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={ cn("drop-down-button", { ["drop-down-button__up"]: isOptionsOpen }) }>
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}
