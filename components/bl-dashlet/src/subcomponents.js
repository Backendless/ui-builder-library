import { useRef, useState } from 'react';

import { ContextMenuItemTypes, StyleVariants, useClickAway, useContextMenuPositionHandler } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function ContextMenu({ menuItems, contextMenuHandler, styleVariant }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contextMenuRef = useRef(null);

  const onContextMenuButtonClick = () => setIsMenuOpen(state => !state);

  const { sides, isChecked } = useContextMenuPositionHandler(contextMenuRef, isMenuOpen);

  useClickAway(contextMenuRef, () => setIsMenuOpen(false));

  return (
    <div className="dashlet__context-menu context-menu">
      <button className="context-menu__button" onClick={ onContextMenuButtonClick }>
        <ContextMenuButtonIcon styleVariant={ styleVariant }/>
      </button>

      { isMenuOpen && (
        <div
          ref={ contextMenuRef }
          className={ cn('context-menu__container', sides) }
          style={{ visibility: isChecked ? 'initial' : 'hidden' }}>
          <ul className="context-menu__list">

            { menuItems.map(({ label, type, content }) => (
              <ContextMenuItem
                label={ label }
                type={ type }
                content={ content }
                contextMenuHandler={ contextMenuHandler }
              />
            )) }

          </ul>
        </div>
      ) }
    </div>
  );
}

function ContextMenuItem({ content, label, type, contextMenuHandler }) {
  if (type === ContextMenuItemTypes.LINK) {
    return <ContextMenuLink content={ content } label={ label }/>;
  }

  if (type === ContextMenuItemTypes.ACTION) {
    return (
      <ContextMenuAction
        content={ content }
        label={ label }
        contextMenuHandler={ contextMenuHandler }
      />
    );
  }

  return null;
}

function ContextMenuLink({ content, label }) {
  return (
    <li>
      <a className="context-menu__item context-menu__item--link" href={ content } target="_blank" rel="noreferrer">
        { label }
      </a>
    </li>
  );
}

function ContextMenuAction({ content, label, contextMenuHandler }) {
  return (
    <li>
      <button
        className="context-menu__item context-menu__item--action"
        type="button"
        onClick={ () => contextMenuHandler({ action: content }) }>
        { label }
      </button>
    </li>
  );
}

function ContextMenuButtonIcon({ styleVariant }) {
  return (
    <svg className={ cn('context-menu__button-icon', StyleVariants[styleVariant]) } viewBox="0 0 24 24">
      <path
        d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
    </svg>
  );
}

export function CollapseButtonIcon({ isOpen, styleVariant }) {
  return (
    <svg
      className={ cn('dashlet__collapse-button-icon', StyleVariants[styleVariant]) }
      style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
      viewBox="0 0 24 24">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}
