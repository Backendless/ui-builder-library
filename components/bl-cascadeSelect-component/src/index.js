import { useState, useEffect, useCallback } from 'react';
import { CollapseButtonIcon, Cascade } from './subcomponent';
import { openCascade, validate } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function CascadeSelect({ component, eventHandlers }) {
  const { display, classList, style, cascade, placeholder } = component;
  const { onClickItem } = eventHandlers;

  const [itemsCascade, setItemsCascade] = useState();
  const [parentItems, setParentItems] = useState([]);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState({ name: placeholder });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    validate(cascade, setItemsCascade, setParentItems, setItems);
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

  component.setCode = (code) => setSelected(state => items.find(item => item.code === code) || state);
  component.getCode = () => selected.code || '';

  component.getCascade = () => itemsCascade;
  component.setCascade = (cascade) => validate(cascade, setItemsCascade, setParentItems, setItems);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-cascadeSelect-component', ...classList) } style={ style }>
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
