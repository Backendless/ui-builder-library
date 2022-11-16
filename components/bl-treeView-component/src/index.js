import { useState, useEffect, useCallback } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function TreeView({ component, eventHandlers }) {
  const { display, style, classList, unprocessedTree, gap } = component;
  const { onClick } = eventHandlers;

  const [itemsTree, setItemsTree] = useState([]);
  const [parentItems, setParentItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');

  component.closeAll = () => setParentItems(state => state.map(item => ({ ...item, isOpen: false })));
  component.openAll = () => setParentItems(state => state.map(item => ({ ...item, isOpen: true })));

  const validateTree = useCallback(unprocessedTree => {
    let levelOfNesting = 0;

    const validate = (unprocessedTree) => {
      const validTreeItems = unprocessedTree.map(item => {
        let validItem = { ...item, levelOfNesting };

        if (item.children) {
          levelOfNesting++;
          validItem = {
            ...validItem,
            children: validate(item.children)
          };

          setParentItems(state => [...state, { value: item.value, isOpen: false }]);
        }

        return validItem;
      });

      levelOfNesting--;

      return validTreeItems;
    };

    return validate(unprocessedTree);
  }, []);

  useEffect(() => {
    if (unprocessedTree) {
      setItemsTree(validateTree(unprocessedTree));
    }
  }, [unprocessedTree]);

  const openHandler = useCallback((value, label) => {
    setParentItems(state => state.map(item => item.value === value ? { ...item, isOpen: !item.isOpen } : item));
    handlerItemClick(value, label);
  }, []);

  const handlerItemClick = useCallback((value, label) => {
    onClick({ label, value });
    setSelectedItemId(value);
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-treeView', classList) } style={ style }>
      <Branch
        itemsTree={ itemsTree }
        gap={ gap }
        parentItems={ parentItems }
        selectedItemId={ selectedItemId }
        openHandler={ openHandler }
        handlerItemClick={ handlerItemClick }
      />
    </div>
  );
}

function Branch(props) {
  const { itemsTree, parentItems, gap, selectedItemId, handlerItemClick, openHandler } = props;

  return (
    <ul className="list">
      { itemsTree.map(item => {
        const { value, label, children, levelOfNesting } = item;
        const nestingStyle = { marginLeft: gap * levelOfNesting + 'px' };

        if (children) {
          const { isOpen } = parentItems.find(element => element.value === value);

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
      }) }
    </ul>
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
      <ButtonIcon/>
      { label }
    </div>
  );
}

function ButtonIcon() {
  return (
    <svg className="list__icon" viewBox="0 0 24 24">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}
