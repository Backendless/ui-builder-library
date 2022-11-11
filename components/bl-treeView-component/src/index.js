import { useState, useEffect, useCallback } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function TreeView({ component, eventHandlers }) {
  const { display, style, classList, data, space } = component;
  const { onClick } = eventHandlers;

  const [itemsTree, setItemsTree] = useState([]);
  const [isOpenItems, setIsOpenItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');

  component.closeAll = () => setIsOpenItems(state => state.map(item => ({ ...item, isOpen: false })));
  component.openAll = () => setIsOpenItems(state => state.map(item => ({ ...item, isOpen: true })));

  const validateTree = data => {
    let levelOfNesting = 0;

    const validate = (data) => {
      const validData = data.map(item => {
        let validItem = { ...item, id: BackendlessUI.UUID.short(), levelOfNesting };

        if (item.children) {
          levelOfNesting++;
          validItem = {
            ...validItem,
            children: validate(item.children)
          };

          setIsOpenItems(state => [...state, { id: validItem.id, isOpen: false }]);
        }

        return validItem;
      });

      levelOfNesting--;

      return validData;
    };

    return validate(data);
  };

  useEffect(() => {
    if (data) {
      setItemsTree(validateTree(data));
    }
  }, [data]);

  const openHandler = useCallback(isOpenItem => {
    setSelectedItemId(isOpenItem.id);
    setIsOpenItems(state => state.map(item => item.id === isOpenItem.id ? { ...item, isOpen: !item.isOpen } : item));
  }, []);

  const handlerItemClick = useCallback((id, action) => {
    onClick({ action });
    setSelectedItemId(id);
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-treeView', classList) } style={ style }>
      <Item
        itemsTree={ itemsTree }
        space={ space }
        isOpenItems={ isOpenItems }
        selectedItemId={ selectedItemId }
        openHandler={ openHandler }
        handlerItemClick={ handlerItemClick }
      />
    </div>
  );
}

function Item(props) {
  const {
    itemsTree, isOpenItems, space, selectedItemId,
    handlerItemClick, openHandler
  } = props;

  return (
    <ul className="list">
      { itemsTree.map(item => {
        const { id, label, children, levelOfNesting, action } = item;
        const nestingStyle = { marginLeft: space * levelOfNesting + 'px' };

        if (children) {
          const isOpenItem = isOpenItems.find(element => element.id === id);

          return (
            <li className="container">
              <div
                tabIndex={ selectedItemId === id ? 0 : -1 }
                className={ cn('list__button', { selected: selectedItemId === id, open: isOpenItem.isOpen }) }
                onClick={ () => openHandler(isOpenItem) }
                style={ nestingStyle }>
                <ButtonIcon/>
                { label }
              </div>

              { isOpenItem.isOpen && (
                <Item
                  validData={ children }
                  space={ space }
                  isOpenItems={ isOpenItems }
                  selectedItemId={ selectedItemId }
                  openHandler={ openHandler }
                  handlerItemClick={ handlerItemClick }
                />
              ) }
            </li>
          );
        }

        return (
          <li
            tabIndex={ selectedItemId === id ? 0 : -1 }
            className={ cn('list__item', { selected: selectedItemId === id }) }
            onClick={ () => handlerItemClick(id, action) }
            style={ nestingStyle }>
            { label }
          </li>
        );
      }) }
    </ul>
  );
}

function ButtonIcon() {
  return (
    <svg className="list__icon" viewBox="0 0 24 24">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}
