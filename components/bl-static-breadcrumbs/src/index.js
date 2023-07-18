const { cn } = BackendlessUI.CSSUtils;

export default function StaticBreadcrumbsComponent({ component, eventHandlers, elRef }) {
  const { classList, display, style, options } = component;
  const { onItemClick, onMouseOver, onMouseOut } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-staticBreadcrumbs', classList) } style={ style }>
      { options?.map(item => (
        <div className="breadcrumbs-item">
          <span
            className="breadcrumbs-item-label"
            onClick={ () => onItemClick({ item }) }
            onMouseOver={ () => onMouseOver({ item }) }
            onMouseOut={ () => onMouseOut({ item }) }>
            { item.label }
          </span>
        </div>
      )) }
    </div>
  );
}
