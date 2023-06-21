const { cn } = BackendlessUI.CSSUtils;

export function TabControl({ tabs, currentTabId, setCurrentTabId, onChange }) {
  const onTabChange = id => {
    setCurrentTabId(id);
    onChange({ currentTabId: id });
  };

  return (
    <div className="tabs">
      { tabs.map(({ id, label }) => (
        <button key={ id } className={ cn("tab", { "tab-active": currentTabId === id }) } onClick={ () => onTabChange(id) }>
          { label }
        </button>
      )) }
    </div>
  )
}
