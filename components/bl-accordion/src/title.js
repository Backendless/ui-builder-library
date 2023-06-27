export function Title({ options }) {
  const { index, onToggle, active, accordionId } = options;
  const { title } = options.item;
  const { titleColor, titleFontSize, titlePadding } = options.component;

  const titleStyles = {
    color   : titleColor,
    fontSize: titleFontSize,
    padding : titlePadding,
  };

  return (
    <div
      className="title"
      id={ `item-${ accordionId }-${ index }-title` }
      style={ titleStyles }
      onClick={ onToggle }
      aria-expanded={ active }
      aria-controls={ `item-${ accordionId }-${ index }-content` }
      role="button"
      tabIndex="0">
      <CollapseIcon/>
      { title }
    </div>
  );
}

function CollapseIcon() {
  return (
    <svg className="collapse-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
    </svg>
  );
}
