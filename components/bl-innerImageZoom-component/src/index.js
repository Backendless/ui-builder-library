import { useMemo, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function InnerImageZoomComponent({ component, elRef, eventHandlers }) {
  const { classList, display, source } = component;
  const { onMouseOver, onMouseOut, onMouseMove } = eventHandlers;

  const src = useMemo(() => {
    return source;
  }, [source]);

  const [state, setState] = useState('0% 0%');

  const style = useMemo(() => {
    return {
      backgroundImage: `url(${src})`,
      backgroundPosition: state,
    };
  }, [src, state]);

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = ((event.pageX - left - window.pageXOffset) / width) * 100;
    const y = ((event.pageY - top - window.pageYOffset) / height) * 100;
    setState(`${x}% ${y}%`);
    onMouseMove({ event });
  };

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-innerImageZoom', ...classList) }>
      <figure
        className="zoom-content"
        style={ style }
        onMouseOver={ onMouseOver }
        onMouseMove={ handleMouseMove }
        onMouseOut={ onMouseOut }>
        <img src={ src } className="img" />
      </figure>
    </div>
  );
}
