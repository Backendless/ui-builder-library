import { useCallback, useState } from 'react';

import { AddSVG, DoneSVG } from '../svg/index';
import { getContextForAddEvent } from '../utils/context';

export function AddItem({ isAdded, toggleIsAdded, component, eventHandlers }) {
  const { itemsArray } = component;
  const { onAdd } = eventHandlers;
  const [newItem, setNewItem] = useState({ label: '', value: '' });

  const handleChange = useCallback(event => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  }, [event, newItem]);

  const handleDone = useCallback(() => {
    if (newItem.label.trim() && newItem.value.trim()) {
      const contextForAddEvent = getContextForAddEvent(itemsArray, newItem);
      onAdd(contextForAddEvent);

      const defaultItemState = { label: '', value: '' };
      setNewItem(defaultItemState);
      toggleIsAdded();
    }
  }, [itemsArray, newItem, itemsArray]);

  if (!isAdded) {
    return (
      <li>
        <button className="add-item" onClick={ toggleIsAdded }>
          <AddSVG/>
        </button>
      </li>
    );
  }

  return (
    <li>
      <div className="input-container">
        <input
          type="text"
          name="label"
          value={ newItem.label }
          placeholder="Label"
          onChange={ handleChange }
        />
        <input
          type="text"
          name="value"
          value={ newItem.value }
          placeholder="Value"
          onChange={ handleChange }
        />
      </div>
      <button onClick={ handleDone }>
        <DoneSVG/>
      </button>
    </li>
  );
}
