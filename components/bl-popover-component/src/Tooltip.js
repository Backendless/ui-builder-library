import { useEffect, useMemo, useCallback, useState } from 'react';
import { translatePopover } from './helpers';

export function Tooltip({ targetRef, position, popoverContent }) {
  const [validPosition, setValidPosition] = useState(position);
  const root = useRoot();

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
  }, []);

  useEffect(() => {
    translateHandler();

    window.addEventListener('resize', translateHandler, false);

    return () => window.removeEventListener('resize', translateHandler, false);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={ `popover-arrow popover-arrow--${ validPosition }` }></div>
      { popoverContent.render() }
    </>,
    root
  );
}

const useRoot = () => useMemo(() => {
  const root = document.createElement('div');
  root.className = ('bl-customComponent-popover popover');

  return root;
}, []);
