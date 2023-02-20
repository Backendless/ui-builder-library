import { useMemo, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function InnerImageZoomComponent({ component, elRef, eventHandlers }) {
  const { classList, style, display, source, zoomIn } = component;
  const { onMouseOver, onMouseOut, onMouseMove } = eventHandlers;

  const src = useMemo(() => source, [source]);
  const zoom = useMemo(() => Math.max(1, zoomIn), [zoomIn]);

  const [zoomPosition, setZoomPosition] = useState('0% 0%');

  const figureStyle = useMemo(() => ({
    backgroundImage: `url(${src})`,
    backgroundPosition: zoomPosition,
    backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
  }), [src, zoomPosition, zoom]);

  const handleMouseMove = event => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = (event.pageX - left - window.pageXOffset) / width * 100;
    const y = (event.pageY - top - window.pageYOffset) / height * 100;

    setZoomPosition(`${x}% ${y}%`);
    onMouseMove({ event });
  };

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-innerImageZoom', ...classList) } style={ style }>
      <figure
        className="zoom-content"
        style={ figureStyle }
        onMouseOver={ onMouseOver }
        onMouseMove={ handleMouseMove }
        onMouseOut={ onMouseOut }>
        <img src={ src } className="img" />
      </figure>
    </div>
  );
}
