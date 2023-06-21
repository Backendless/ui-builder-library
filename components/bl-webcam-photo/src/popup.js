import { useCallback } from 'react';

export function Popup({ options, component }) {
  const { title, description, link } = options;

  const handleClick = useCallback(event => {
    event.stopPropagation();
  }, []);

  return (
    <div className="popup" onClick={ handleClick }>
      <p className="popup__title">{ title }</p>
      <p className="popup__description">{ description }</p>

      { link && (
        <a className="popup__link" href={ link } target="_blank">{ component.popupLinkLabel }</a>
      ) }
    </div>
  );
}
