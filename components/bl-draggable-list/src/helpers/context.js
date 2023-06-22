import { omitUids } from './id';

export function prepareOnDragContext(itemsList, draggedItem, previousList) {
  return ({
    currentList  : omitUids(itemsList),
    draggableItem: omitUids([draggedItem])[0],
    previousList : omitUids(previousList),
  });
}

export function prepareOnDeleteContext(itemsList, index) {
  const withoutDeletedItemList = itemsList.filter((_, i) => i !== index);

  return ({
    currentList: withoutDeletedItemList,
    deletedItem: itemsList[index],
  });
}

export function prepareOnAddContext(itemsList, newItem) {
  const listWithNewItem = [...itemsList, newItem];

  return ({
    currentList: listWithNewItem,
    addedItem  : newItem,
  });
}

export function prepareOnEditContext(itemsList, index, editedItem) {
  const editedList = itemsList.map((item, i) => {
    return index === i
      ? editedItem
      : item;
  });

  return ({
    currentList : editedList,
    previousItem: itemsList[index],
    currentItem : editedList[index],
  });
}
