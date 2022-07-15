import { useCallback, useState } from 'react';

import { AddIcon, DoneIcon } from './icons';
import { prepareContext, ContextTypes } from './helpers/context';
import { validate } from './helpers/validate';
import { EditControl } from './edit-control';

const initialItemState = { label: '', value: '' };

export function AddItem({ isAdded, toggleIsAdded, component, eventHandlers }) {
  const { itemsList } = component;
  const { onAdd } = eventHandlers;
  const [newItem, setNewItem] = useState(initialItemState);

  const handleChange = useCallback(event => {
    const { name, value } = event.target;

    setNewItem({ ...newItem, [name]: value });
  }, [newItem]);

  const handleDone = useCallback(() => {
    if (validate(newItem)) {
      const onAddContext = prepareContext(ContextTypes.onAdd, [itemsList, newItem]);

      onAdd(onAddContext);
      setNewItem(initialItemState);
      toggleIsAdded();
    }
  }, [itemsList, newItem]);

  if (!isAdded) {
    return (
      <li>
        <button className="add-item" onClick={ toggleIsAdded }>
          <AddIcon/>
        </button>
      </li>
    );
  }

  return (
    <li>
      <EditControl item={ newItem } onChange={ handleChange }/>
      <button onClick={ handleDone }>
        <DoneIcon/>
      </button>
    </li>
  );
}
