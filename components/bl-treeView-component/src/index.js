import { useState, useEffect, useCallback } from 'react';
import { Branch } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function TreeView({ component, eventHandlers }) {
  const { display, style, classList, treeItems, gap } = component;
  const { onClick } = eventHandlers;

  const [itemsTree, setItemsTree] = useState([]);
  const [parentItems, setParentItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');

  component.closeAll = () => setParentItems(state => state.map(item => ({ ...item, isOpen: false })));
  component.openAll = () => setParentItems(state => state.map(item => ({ ...item, isOpen: true })));

  const prepareTree = useCallback(treeItems => {
    let levelOfNesting = 0;

    const prepare = (treeItems) => {
      const validTreeItems = treeItems.map(item => {
        let validItem = { ...item, levelOfNesting };

        if (item.children) {
          levelOfNesting++;
          validItem = {
            ...validItem,
            children: prepare(item.children)
          };

          setParentItems(state => [...state, { value: item.value, isOpen: false }]);
        }

        return validItem;
      });

      levelOfNesting--;

      return validTreeItems;
    };

    return prepare(treeItems);
  }, []);

  useEffect(() => {
    if (treeItems) {
      setItemsTree(prepareTree(treeItems));
    }
  }, [treeItems]);

  const openHandler = useCallback((value, label) => {
    setParentItems(state => state.map(item => (
      item.value === value ? { ...item, isOpen: !item.isOpen } : item
    )));
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
