import { omitUids } from './id';

export const ContextTypes = {
  onDelete: 'onDelete',
  onDrag  : 'onDrag',
  onEdit  : 'onEdit',
  onAdd   : 'onAdd'
};

const ContextPreparerMap = {
  [ContextTypes.onDelete]: prepareOnDeleteContext,
  [ContextTypes.onDrag]  : prepareOnDragContext,
  [ContextTypes.onEdit]  : prepareOnEditContext,
  [ContextTypes.onAdd]   : prepareOnAddContext,
};

export function prepareContext(type, args) {
  return ContextPreparerMap[type](...args);
}

function prepareOnDragContext(itemsList, draggedItem, previousList) {
  return ({
    currentList  : omitUids(itemsList),
    draggableItem: omitUids([draggedItem]),
    previousList : omitUids(previousList),
  });
}

function prepareOnDeleteContext(itemsList, index) {
  const withoutDeletedItemList = itemsList.filter((_, i) => i !== index);

  return ({
    currentList: withoutDeletedItemList,
    deletedItem: itemsList[index],
  });
}

function prepareOnAddContext(itemsList, newItem) {
  const listWithNewItem = [...itemsList, newItem];

  return ({
    currentList: listWithNewItem,
    addedItem  : newItem,
  });
}

function prepareOnEditContext(itemsList, index, editedItem) {
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
