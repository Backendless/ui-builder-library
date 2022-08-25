import { useRef } from 'react';

export function Item(props) {
  const { index, onToggle, active, accordionId } = props;
  const { title, content } = props.item;
  const {
    titleBackgroundColor,
    titleColor,
    titleFontSize,
    titlePadding,
    contentBackgroundColor,
    contentColor,
    contentFontSize,
    contentPadding,
  } = props.component;

  const contentRef = useRef();

  const itemBackgroundColor = {
    backgroundColor: titleBackgroundColor,
  };

  const titleStyles = {
    color   : titleColor,
    fontSize: titleFontSize,
    padding : titlePadding,
  };

  const contentHeight = {
    height: active ? contentRef.current.scrollHeight : '',
  };

  const contentStyles = {
    backgroundColor: contentBackgroundColor,
    color          : contentColor,
    fontSize       : contentFontSize,
    padding        : contentPadding,
  };

  return (
    <div className={ `item ${ active ? 'active' : '' }` } style={ itemBackgroundColor }>
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
      <div
        ref={ contentRef }
        className={ `content-wrapper ${ active ? 'open' : '' }` }
        id={ `item-${ accordionId }-${ index }-content` }
        style={ contentHeight }
        aria-labelledby={ `item-${ accordionId }-${ index }-title` }
        role="region">
        <div className="content" style={ contentStyles }>{ content }</div>
      </div>
    </div>
  );
}
