import { useMemo } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export function Branch(props) {
  const { itemsTree, parentItems, gap, selectedItemId, handlerItemClick, openHandler } = props;

  return (
    <ul className="list">
      { itemsTree.map(item => {
        return (
          <BranchItem
            key={ item.id }
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
  const { value, label, children, levelOfNesting, id } = item;

  const nestingStyle = { marginLeft: gap * levelOfNesting + 'px' };

  if (children) {
    const { isOpen } = useMemo(() => parentItems.find(element => element.id === id), [parentItems]);

    return (
      <li className="container">
        <ParentItem
          selectedItemId={ selectedItemId }
          openHandler={ openHandler }
          nestingStyle={ nestingStyle }
          id={ id }
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
      id={ id }
      value={ value }
      label={ label }
    />
  );
}

function Item({ selectedItemId, handlerItemClick, nestingStyle, id, value, label }) {
  const onEnter = event => {
    if (event.key === 'Enter') {
      handlerItemClick(id, value, label);
    }
  };

  return (
    <li
      tabIndex={ 0 }
      className={ cn('list__item', { selected: selectedItemId === id }) }
      onClick={ () => handlerItemClick(id, value, label) }
      onKeyDown={ onEnter }
      style={ nestingStyle }>
      { label }
    </li>
  );
}

function ParentItem({ selectedItemId, openHandler, nestingStyle, id, value, label, isOpen }) {
  const onEnter = event => {
    if (event.key === 'Enter') {
      openHandler(id, value, label);
    }
  };

  return (
    <div
      tabIndex={ 0 }
      className={ cn('list__button', { selected: selectedItemId === id, open: isOpen }) }
      onClick={ () => openHandler(id, value, label) }
      onKeyDown={ onEnter }
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
