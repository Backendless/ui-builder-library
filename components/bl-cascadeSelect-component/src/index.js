import { useState, useEffect, useCallback } from 'react';
import { CollapseButtonIcon, Cascade } from './subcomponent';
import { prepareCascade, isCyclic } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function CascadeSelect({ component, eventHandlers, settings, instanceId }) {
  const { display, classList, style, cascade } = component;

  const [selected, setSelected] = useState({ name: 'Select a...' });
  const [itemsCascade, setItemsCascade] = useState();
  const [parentItems, setParentItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  console.log(parentItems);

  useEffect(() => {
    const [detected, locate] = isCyclic(cascade);

    if (detected) {
      throw new Error('cascade have cycling object in ' + locate);
    }

    if (cascade) {
      setItemsCascade(prepareCascade(cascade, setParentItems));
    }
  }, [cascade]);

  const openCascadeHandler = (item) => {
    setParentItems(state => state.map(parentItem => (
      item.code === parentItem.code ? { ...parentItem, isOpen: !item.isOpen } : parentItem
    )));
  };

  const openItemHandler = (item) => {
    setSelected(item);
    setIsOpen(false);
    // setParentItems(state => state.map(parentItem => ({ ...parentItem, isOpen: false })));
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-cascadeSelect-component', ...classList) } style={ style }>
      <div className={ cn('cascade-select__input', { 'cascade-select__input--selected': selected.code }) }
           onClick={ () => setIsOpen(state => !state) }>
        <span>{ selected.name }</span>
        <CollapseButtonIcon/>
      </div>
      <Cascade
        isOpen={ isOpen }
        itemsCascade={ itemsCascade }
        parentItems={ parentItems }
        openCascadeHandler={ openCascadeHandler }
        openItemHandler={ openItemHandler }
        selected={selected}
      />
    </div>
  );
}
