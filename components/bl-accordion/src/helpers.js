import { useState } from 'react';

export function useItemsState(data, controlledAccordion, eventHandlers) {
  const { onOpenItem, onCloseItem } = eventHandlers;

  const [stateStore, setStateStore] = useState(() => {
    const stateStore = {};

    data?.forEach((item, index) => stateStore[index] = false);

    return stateStore;
  });

  const handleToggle = (item, index) => {
    const newStore = { ...stateStore };

    if (stateStore[index]) {
      onCloseItem({ item });
    } else {
      onOpenItem({ item });
    }

    if (controlledAccordion) {
      for (const key in newStore) {
        newStore[key] = false;
      }
    }

    newStore[index] = !stateStore[index];
    setStateStore(newStore);
  };

  const updateItemsState = valueCallback => {
    const newStore = { ...stateStore };

    for (const key in newStore) {
      newStore[key] = valueCallback(newStore[key]);
    }

    setStateStore(newStore);
  };

  return { stateStore, handleToggle, updateItemsState };
}
