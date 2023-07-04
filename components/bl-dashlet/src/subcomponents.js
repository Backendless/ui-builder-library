import { useEffect, useRef, useState } from 'react';

import { ContextBlockItemTypes, StyleVariants } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function ContextMenu({ contextBlocks, contextBlocksHandler, styleVariant }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contextMenuRef = useRef(null);

  const onContextMenuButtonClick = () => setIsMenuOpen(state => !state);

  const { sides, isChecked } = useContextMenuPositionHandler(contextMenuRef, isMenuOpen);

  useClickOutsideHandler(contextMenuRef, () => setIsMenuOpen(false));

  return (
    <div className="dashlet__context-menu context-menu">
      <button className="context-menu__button" onClick={ onContextMenuButtonClick }>
        <ContextBlockButtonIcon styleVariant={ styleVariant }/>
      </button>

      { isMenuOpen && (
        <div
          ref={ contextMenuRef }
          className={ cn('context-menu__container', sides) }
          style={{ visibility: isChecked ? 'initial' : 'hidden' }}>
          <ul className="context-menu__list">

            { contextBlocks.map(({ label, type, content }) => (
              <ContextBlockItem
                label={ label }
                type={ type }
                content={ content }
                contextBlocksHandler={ contextBlocksHandler }
              />
            )) }

          </ul>
        </div>
      ) }
    </div>
  );
}

function useClickOutsideHandler(ref, handler) {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

function useContextMenuPositionHandler(contextMenuRef, isMenuOpen) {
  const [sides, setSides] = useState({ left: false, top: false });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (contextMenuRef.current && isMenuOpen) {
      const { bottom, right } = contextMenuRef.current.getBoundingClientRect();

      if (right > window.innerWidth) {
        sides.left = true;
      }

      if (bottom > window.innerHeight) {
        sides.top = true;
      }

      setIsChecked(true);
    } else {
      setSides({ left: false, top: false });
      setIsChecked(false);
    }
  }, [contextMenuRef, isMenuOpen]);

  return { sides, isChecked };
}

function ContextBlockItem({ content, label, type, contextBlocksHandler }) {
  if (type === ContextBlockItemTypes.LINK) {
    return <ContextBlockLink content={ content } label={ label }/>;
  }

  if (type === ContextBlockItemTypes.ACTION) {
    return (
      <ContextBlockAction
        content={ content }
        label={ label }
        contextBlocksHandler={ contextBlocksHandler }
      />
    );
  }

  return null;
}

function ContextBlockLink({ content, label }) {
  return (
    <li>
      <a className="context-menu__item context-menu__item--link" href={ content } target="_blank" rel="noreferrer">
        { label }
      </a>
    </li>
  );
}

function ContextBlockAction({ content, label, contextBlocksHandler }) {
  return (
    <li>
      <button
        className="context-menu__item context-menu__item--action"
        type="button"
        onClick={ () => contextBlocksHandler({ action: content }) }>
        { label }
      </button>
    </li>
  );
}

function ContextBlockButtonIcon({ styleVariant }) {
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
