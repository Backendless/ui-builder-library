import { useCallback, useEffect, useState } from 'react';

import { treeItemsValidator } from './helpers';
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

    const prepare = (treeItems, parentId) => {
      const validTreeItems = treeItems.map((item, index) => {
        const id = parentId ? `${parentId}-${index}` : String(index);
        let validItem = { ...item, levelOfNesting, id };

        if (item.children) {
          levelOfNesting++;

          validItem = {
            ...validItem,
            children: prepare(item.children, validItem.id),
          };

          setParentItems(state => [...state, { value: item.value, isOpen: false, id: validItem.id }]);
        }

        return validItem;
      });

      levelOfNesting--;

      return validTreeItems;
    };

    return prepare(treeItems);
  }, []);

  useEffect(() => {
    if (treeItemsValidator(treeItems)) {
      setItemsTree(prepareTree(treeItems));
    }
  }, [treeItems]);

  const openHandler = useCallback((id, value, label) => {
    setParentItems(state => state.map(item => (
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    )));

    handlerItemClick(id, value, label);
  }, []);

  const handlerItemClick = useCallback((id, value, label) => {
    onClick({ label, value });
    setSelectedItemId(id);
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
