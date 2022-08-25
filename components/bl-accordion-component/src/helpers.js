import { useState } from 'react';

export function useItemsState(accordionData, onClick, controlledAccordion) {
  const [stateStore, setStateStore] = useState(() => {
    const stateStore = {};

    if (!Array.isArray(accordionData)) {
      return stateStore;
    }

    accordionData.forEach((item, index) => stateStore[index] = false);

    return stateStore;
  });

  const handleToggle = (item, index) => {
    const newStore = { ...stateStore };

    if (controlledAccordion) {
      Object.keys(newStore).forEach(index => newStore[index] = false);
    }

    newStore[index] = !stateStore[index];
    setStateStore(newStore);

    if (onClick) {
      onClick({ item });
    }
  };

  const updateItemsState = valueCallback => {
    const newStore = { ...stateStore };

    Object.keys(newStore).forEach(index => newStore[index] = valueCallback(newStore[index]));
    setStateStore(newStore);
  };

  return { stateStore, handleToggle, updateItemsState };
}
