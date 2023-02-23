import { useState } from 'react';

import useStyles from './helpers';

const { cn } = BackendlessUI.CSSUtils;
const DEFAULT_ZOOM_POSITION = '0% 0%';

export default function InnerImageZoomComponent({ component, elRef, eventHandlers }) {
  const { classList, style, display, source, zoomIn } = component;
  const { onMouseOver, onMouseOut, onMouseMove } = eventHandlers;

  const zoom = Math.max(100, zoomIn);
  const [zoomPosition, setZoomPosition] = useState(DEFAULT_ZOOM_POSITION);
  const figureStyle = useStyles(source, zoomPosition, zoom);

  const handleMouseMove = event => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = (event.pageX - left - window.scrollX) / width * 100;
    const y = (event.pageY - top - window.scrollY) / height * 100;

    setZoomPosition(`${ x }% ${ y }%`);
    onMouseMove({ event });
  };

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-innerImageZoom', ...classList) } style={ style }>
      <figure
        className="zoom-content"
        style={ figureStyle.figure }
        onMouseOver={ onMouseOver }
        onMouseMove={ handleMouseMove }
        onMouseOut={ onMouseOut }>
        <img src={ source } className="img" />
      </figure>
    </div>
  );
}
