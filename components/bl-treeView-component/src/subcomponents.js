import { useMemo } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export function Branch(props) {
  const { itemsTree, parentItems, gap, selectedItemId, handlerItemClick, openHandler } = props;

  return (
    <ul className="list">
      { itemsTree.map(item => {
        return (
          <BranchItem
            item={ item }
            parentItems={ parentItems }
            gap={ gap }
            selectedItemId={ selectedItemId }
            handlerItemClick={ handlerItemClick }
            openHandler={ openHandler }
          />
        );
      }) }
    </ul>
  );
}

function BranchItem(props) {
  const { item, parentItems, gap, selectedItemId, handlerItemClick, openHandler } = props;
  const { value, label, children, levelOfNesting } = item;

  const nestingStyle = { marginLeft: gap * levelOfNesting + 'px' };

  if (children) {
    const { isOpen } = useMemo(() => parentItems.find(element => element.value === value), [parentItems]);

    return (
      <li className="container">
        <ParentItem
          selectedItemId={ selectedItemId }
          openHandler={ openHandler }
          nestingStyle={ nestingStyle }
          value={ value }
          label={ label }
          isOpen={ isOpen }
        />

        { isOpen && (
          <Branch
            itemsTree={ children }
            gap={ gap }
            parentItems={ parentItems }
            selectedItemId={ selectedItemId }
            openHandler={ openHandler }
            handlerItemClick={ handlerItemClick }
          />
        ) }
      </li>
    );
  }

  return (
    <Item
      selectedItemId={ selectedItemId }
      handlerItemClick={ handlerItemClick }
      nestingStyle={ nestingStyle }
      value={ value }
      label={ label }
    />
  );
}

function Item({ selectedItemId, handlerItemClick, nestingStyle, value, label }) {
  return (
    <li
      tabIndex={ selectedItemId === value ? 0 : -1 }
      className={ cn('list__item', { selected: selectedItemId === value }) }
      onClick={ () => handlerItemClick(value, label) }
      style={ nestingStyle }>
      { label }
    </li>
  );
}

function ParentItem({ selectedItemId, openHandler, nestingStyle, value, label, isOpen }) {
  return (
    <div
      tabIndex={ selectedItemId === value ? 0 : -1 }
      className={ cn('list__button', { selected: selectedItemId === value, open: isOpen }) }
      onClick={ () => openHandler(value, label) }
      style={ nestingStyle }>
      <ParentArrowIcon/>
      { label }
    </div>
  );
}

function ParentArrowIcon() {
  return (
    <svg className="list__icon" viewBox="0 0 24 24">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}
