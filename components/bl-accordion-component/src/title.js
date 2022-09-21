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
      <i className="material-icons-round" aria-hidden="true">keyboard_arrow_right</i>
      { title }
    </div>
  );
}
