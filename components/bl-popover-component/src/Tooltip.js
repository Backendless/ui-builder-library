import { useCallback, useEffect, useRef, useState } from 'react';

import { translatePopover } from './helpers';

export function Tooltip({ targetRef, position, popoverContent }) {
  const [validPosition, setValidPosition] = useState(position);
  const [style, setStyle] = useState({ opacity: 0 });
  const root = useRef();

  const translateHandler = useCallback(() => {
    if (targetRef && root.current) {
      const { style, newPosition } = translatePopover(targetRef, root.current, position);

      setValidPosition(newPosition);
      setStyle({ ...style, opacity: 1 });
    }
  }, [position, targetRef]);

  useEffect(() => {
    translateHandler();

    window.addEventListener('resize', translateHandler, false);

    return () => window.removeEventListener('resize', translateHandler, false);
  }, [translateHandler]);

  return (
    <div ref={ root } className="bl-customComponent-popover popover" style={ style }>
      <div className={ `popover-arrow popover-arrow--${ validPosition }` }></div>
      { popoverContent.render() }
    </div>
  );
}
