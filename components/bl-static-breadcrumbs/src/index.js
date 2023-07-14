const { cn } = BackendlessUI.CSSUtils;

export default function StaticBreadcrumbsComponent({ component, eventHandlers, elRef }) {
  const { classList, display, style, options } = component;
  const { onItemClick, onMouseOver, onMouseOut } = eventHandlers;

  const onClick = item => {
    const { pageName, pageData } = item;

    BackendlessUI.Navigator.goToPage(pageName, pageData);
    onItemClick({ item });
  };

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-staticBreadcrumbs', classList) } style={ style }>
      { options?.map(item => (
        <div className="item">
          <span
            className="label"
            onClick={ () => onClick(item) }
            onMouseOver={ () => onMouseOver({ item }) }
            onMouseOut={ () => onMouseOut({ item }) }>
            { item.label }
          </span>
        </div>
      )) }
    </div>
  );
}
