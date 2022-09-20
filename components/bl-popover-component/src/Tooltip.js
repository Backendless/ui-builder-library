import { useEffect, useMemo } from 'react';
import { translatePopover } from './helpers';

export function Tooltip({ buttonElement, title, text, position }) {
  const root = useMemo(() => {
    return document.createElement('div');
  }, []);

  root.className = ('bl-customComponent-popover popover');

  useEffect(() => {
    document.body.appendChild(root);

    return () => {
      document.body.removeChild(root);
    };
  }, []);

  const translateHandler = () => {
    root.style.transform = 'translate3d(0px, 0px, 0px)';

    if (buttonElement) {
      const { rootTranslateLeft, rootTranslateTop } = translatePopover(buttonElement, root, position);

      root.style.transform = `translate3d(${ rootTranslateLeft }px, ${ rootTranslateTop }px, 0px)`;
    }
  };

  useEffect(() => {
    translateHandler()
    window.addEventListener('resize', translateHandler, false);
  },[]);

  return ReactDOM.createPortal(
    <>
      <div className={ `popover-arrow popover-arrow--${ position }` }></div>
      <h3 className="popover-title">{ title }</h3>
      <p className="popover-text">{ text }</p>
    </>,
    root
  );
}
