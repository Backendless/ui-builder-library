import { useCallback, useEffect, useState } from 'react';

import { openCascade, validate } from './helpers';
import { Cascade, CollapseButtonIcon } from './subcomponent';

const { cn } = BackendlessUI.CSSUtils;

export default function CascadeSelect({ component, eventHandlers, elRef }) {
  const { display, classList, style, cascade, placeholder } = component;
  const { onClickItem } = eventHandlers;

  const [itemsCascade, setItemsCascade] = useState();
  const [parentItems, setParentItems] = useState([]);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState({ name: placeholder });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    component.setCascade(cascade);
  }, [cascade]);

  const openCascadeHandler = useCallback(item => {
    setParentItems(state => openCascade(state, item));
  }, []);

  const openItemHandler = useCallback(item => {
    setSelected(item);
    setIsOpen(false);

    onClickItem({ item });
  }, []);

  const onClickInput = () => setIsOpen(state => !state);

  component.getSelected = () => selected;

  component.setCode = code => setSelected(state => items.find(item => item.code === code) || state);
  component.getCode = () => selected.code || '';

  component.getCascade = () => itemsCascade;
  component.setCascade = cascade => validate(cascade, setItemsCascade, setParentItems, setItems);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-cascadeSelect-component', classList) } style={ style }>
      <div
        className={ cn('cascade-select__input', { 'cascade-select__input--selected': selected.code }) }
        onClick={ onClickInput }>
        <span>{ selected.name }</span>
        <CollapseButtonIcon/>
      </div>
      <Cascade
        isOpen={ isOpen }
        selected={ selected }
        itemsCascade={ itemsCascade }
        parentItems={ parentItems }
        openCascadeHandler={ openCascadeHandler }
        openItemHandler={ openItemHandler }
      />
    </div>
  );
}
