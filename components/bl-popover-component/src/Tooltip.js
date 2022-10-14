import { useEffect, useMemo, useCallback } from 'react';
import { translatePopover } from './helpers';

export function Tooltip({ contentContainerElement, position, popoverContent }) {
  const root = useMemo(() => {
    const root = document.createElement('div');
    root.className = ('bl-customComponent-popover popover');

    return root;
  }, []);

  useEffect(() => {
    document.body.appendChild(root);

    return () => {
      document.body.removeChild(root);
    };
  }, []);

  const translateHandler = useCallback(() => {
    root.style.transform = 'translate3d(0px, 0px, 0px)';

    if (contentContainerElement) {
      const { rootTranslateLeft, rootTranslateTop } = translatePopover(contentContainerElement, root, position);

      root.style.transform = `translate3d(${ rootTranslateLeft }px, ${ rootTranslateTop }px, 0px)`;
    }
  }, []);

  useEffect(() => {
    translateHandler();

    window.addEventListener('resize', translateHandler, false);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={ `popover-arrow popover-arrow--${ position }` }></div>
      { popoverContent.render() }
    </>,
    root
  );
}
