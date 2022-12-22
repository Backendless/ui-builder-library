import { findParentItem } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function Cascade(props) {
  const { isOpen, itemsCascade, parentItems, levelOfNesting, openItemHandler, openCascadeHandler, selected } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      className="cascade-select__list"
      style={ { top: levelOfNesting ? 0 : '100%', left: levelOfNesting ? '100%' : 0 } }>
      { itemsCascade.map(item => (
        <CascadeItem
          item={ item }
          openCascadeHandler={ openCascadeHandler }
          parentItems={ parentItems }
          openItemHandler={ openItemHandler }
          selected={ selected }
        />
      )) }
    </ul>
  );
}

export function CascadeItem({ item, parentItems, openItemHandler, openCascadeHandler, selected }) {
  if (item.children) {
    const { isOpen } = findParentItem(parentItems, item);

    return (
      <li>
        <div
          tabIndex={ 0 }
          className={ cn('cascade-select__item', { open: isOpen }) }
          onClick={ () => openCascadeHandler(item) }>
          { item.name }
          <svg className="cascade-select__collapse-icon" viewBox="0 0 24 24">
            <path d="M13.83,19a1,1,0,0,1-.78-.37l-4.83-6a1,1,0,0,1,0-1.27l5-6a1,1,0,0,1,1.54,1.28L10.29,12l4.32,5.36A1,1,0,0,1,13.83,19Z"/>
          </svg>
        </div>

        { isOpen && (
          <Cascade
            isOpen={ isOpen }
            itemsCascade={ item.children }
            parentItems={ parentItems }
            openCascadeHandler={ openCascadeHandler }
            openItemHandler={ openItemHandler }
            levelOfNesting={ item.levelOfNesting + 1 }
            selected={ selected }
          />
        ) }
      </li>
    );
  }

  return (
    <li
      tabIndex={ 0 }
      className={ cn('cascade-select__item', { open: item.code === selected.code }) }
      onClick={ () => openItemHandler(item) }>
      { item.name }
    </li>
  );
}

export function CollapseButtonIcon() {
  return (
    <svg className="cascade-select__collapse-input-icon" viewBox="0 0 24 24">
      <path d="M13.83,19a1,1,0,0,1-.78-.37l-4.83-6a1,1,0,0,1,0-1.27l5-6a1,1,0,0,1,1.54,1.28L10.29,12l4.32,5.36A1,1,0,0,1,13.83,19Z"/>
    </svg>
  );
}
