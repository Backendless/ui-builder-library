import { useRef } from 'react';

import { Title } from './title';

export function Item(props) {
  const { index, active, accordionId } = props;
  const { content } = props.item;
  const {
    titleBackgroundColor,
    contentBackgroundColor,
    contentColor,
    contentFontSize,
    contentPadding,
  } = props.component;

  const contentRef = useRef();

  const itemBackgroundColor = {
    backgroundColor: titleBackgroundColor,
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
      <Title options={ props }/>
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
