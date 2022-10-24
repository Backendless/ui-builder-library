import { useEffect, useMemo, useCallback } from 'react';
import { translatePopover } from './helpers';

export function Tooltip({ contentElement, position, popoverContent }) {
  const root = useRoot();

  useEffect(() => {
    document.body.appendChild(root);

    return () => {
      document.body.removeChild(root);
    };
  }, []);

  const translateHandler = useCallback(() => {
    root.style.transform = 'translate3d(0px, 0px, 0px)';

    if (contentElement) {
      const { leftShift, topShift } = translatePopover(contentElement, root, position);

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
      <div className={ `popover-arrow popover-arrow--${ position }` }></div>
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
