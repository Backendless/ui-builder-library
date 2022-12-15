const { cn } = BackendlessUI.CSSUtils;

export function Cascade(props) {
  const { isOpen, itemsCascade, parentItems, levelOfNesting, openItemHandler, openCascadeHandler, selected } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      className="cascade-select__list"
      style={ { top: levelOfNesting ? 0 : '100%', left: levelOfNesting ? 100 + '%' : 0 } }>
      { itemsCascade.map(item => (
        <CascadeItem
          item={ item }
          openCascadeHandler={ openCascadeHandler }
          parentItems={ parentItems }
          openItemHandler={ openItemHandler }
          selected={selected}
        />
      )) }
    </ul>
  );
}

export function CascadeItem({ item, parentItems, openItemHandler, openCascadeHandler, selected }) {
  if (item.children) {
    const { isOpen } = parentItems.find(parent => parent.code === item.code);

    return (
      <li>
        <div
          className={cn('cascade-select__item', {'cascade-select__item--open': isOpen})}
          onClick={ () => openCascadeHandler(item) }>
          { item.name }
          <svg
            className="cascade-select__collapse-icon"
            viewBox="0 0 24 24">
            <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
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
            selected={selected}
          />
        ) }
      </li>
    );
  }

  return (
    <li
      className={cn('cascade-select__item', {'cascade-select__item--open': item.code === selected.code})}
      onClick={ () => openItemHandler(item) }>
      { item.name }
    </li>
  );
}

export function CollapseButtonIcon() {
  return (
    <svg
      className="cascade-select__collapse-button-icon"
      viewBox="0 0 24 24">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}
