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
      Object.keys(newStore).forEach(index => newStore[index] = false);
    }

    newStore[index] = !stateStore[index];
    setStateStore(newStore);
  };

  const updateItemsState = valueCallback => {
    const newStore = { ...stateStore };

    Object.keys(newStore).forEach(index => newStore[index] = valueCallback(newStore[index]));
    setStateStore(newStore);
  };

  return { stateStore, handleToggle, updateItemsState };
}
