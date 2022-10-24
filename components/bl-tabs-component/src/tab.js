const { cn } = BackendlessUI.CSSUtils;

export function Tab({ id, label, isActive, handleClick }) {
  return (
    <button className={ cn("tab", { "tab-active": isActive }) } onClick={ () => handleClick(id) }>
      { label }
    </button>
  )
}
