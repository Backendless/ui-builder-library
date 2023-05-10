import { useCallback, useEffect, useState } from 'react';

import { translatePopover } from './helpers';

export function Tooltip({ root, targetRef, position, popoverContent, eventHandlers }) {
  const [validPosition, setValidPosition] = useState(position);
  const { onClickOutside } = eventHandlers;

  useEffect(() => {
    document.body.appendChild(root);

    return () => {
      document.body.removeChild(root);
    };
  }, []);

  const translateHandler = useCallback(() => {
    root.style.transform = 'translate3d(0px, 0px, 0px)';

    if (targetRef) {
      const { leftShift, topShift, newPosition } = translatePopover(targetRef, root, position);

      setValidPosition(newPosition);

      root.style.transform = `translate3d(${ leftShift }px, ${ topShift }px, 0px)`;
    }
  }, [position, targetRef]);

  useEffect(() => {
    translateHandler();

    window.addEventListener('resize', translateHandler, false);

    return () => window.removeEventListener('resize', translateHandler, false);
  }, [translateHandler]);

  useClickOutside(root, targetRef, onClickOutside);

  return ReactDOM.createPortal(
    <>
      <div className={ `popover-arrow popover-arrow--${ validPosition }` }></div>
      { popoverContent.render() }
    </>,
    root
  );
}

const useClickOutside = (ref, targetRef, onClickOutside) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref && !(ref.contains(event.target) || targetRef.contains(event.target))) {
        onClickOutside({ isOpen: true });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, targetRef]);
};
