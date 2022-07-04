import { removeId } from './id';

export function getContextForDragEvent(data, draggedItem, previousArray) {
  return ({
    currentArray : removeId(data),
    draggableItem: removeId([draggedItem]),
    previousArray: removeId(previousArray),
  });
}

export function getContextForDeleteEvent(itemsArray, index) {
  const withoutDeletedItemArray = itemsArray.filter((_, i) => i !== index);

  return ({
    currentArray: withoutDeletedItemArray,
    deletedItem : itemsArray[index],
  });
}

export function getContextForAddEvent(itemsArray, newItem) {
  const arrayWithNewItem = [...itemsArray, newItem];

  return ({
    currentArray: arrayWithNewItem,
    addedItem   : newItem,
  });
}

export function getContextForEditEvent(itemsArray, index, label) {
  const editedArray = itemsArray.map((item, i) => {
    return index === i
      ? { ...item, label }
      : item;
  });

  return ({
    currentArray: editedArray,
    previousItem: itemsArray[index],
    currentItem : editedArray[index],
  });
}
