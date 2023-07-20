import { useMemo } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function StaticBreadcrumbsComponent({ component, eventHandlers, elRef }) {
  const { classList, display, style, options } = component;
  const { onItemClick, onMouseOver, onMouseOut } = eventHandlers;

  const validOptions = useMemo(() => {
    if (Array.isArray(options)) {
      return options;
    }

    if (options !== undefined) {
      console.error('Breadcrumbs options must be an array with option signature: {label: String, pageName: String}.');
    }

    return [];
  }, [options]);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-staticBreadcrumbs', classList) } style={ style }>
      { validOptions.map(({ label, pageName }) => (
        <div className="breadcrumbs-item" key={ pageName }>
          <span
            className="breadcrumbs-item-label"
            onClick={ () => onItemClick({ label, pageName }) }
            onMouseOver={ () => onMouseOver({ label, pageName }) }
            onMouseOut={ () => onMouseOut({ label, pageName }) }>
            { label }
          </span>
        </div>
      )) }
    </div>
  );
}
