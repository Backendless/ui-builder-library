import { useCallback, useEffect, useRef, useState } from 'react';

import { addId, removeId } from '../utils/id';
import { AddItem } from './add-item';
import { ListItem } from './item';

export function List({ component, eventHandlers }) {
  const { onDrag, onDelete } = eventHandlers;
  const { itemsArray, allowAdd } = component;
  const draggedItem = useRef(null);
  const previousArray = useRef(null);
  const [isAdded, setIsAdded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (itemsArray) {
      if (Array.isArray(itemsArray)) {
        const arrayWithId = addId(itemsArray);
        setData(arrayWithId);
      } else {
        try {
          const parseArray = JSON.parse(itemsArray);
          setData(addId(parseArray));
        } catch {
          console.error('Not valid array');
        }
      }
    }
  }, [itemsArray]);

  const dragStartHandler = useCallback((e, index) => {
    draggedItem.current = data[index];
    previousArray.current = data;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }, [data, draggedItem]);

  const dragOverHandler = useCallback((e, index) => {
    e.preventDefault();
    const draggedOverItem = data[index];

    if (draggedItem.current.uniqId === draggedOverItem.uniqId) {
      return;
    }

    const items = data.filter(item => item.uniqId !== draggedItem.current.uniqId);
    items.splice(index, 0, draggedItem.current);

    setData(items);
  }, [data, draggedItem]);

  const dragEndHandler = useCallback(() => {
    onDrag({
      currentArray : removeId(data),
      draggableItem: removeId([draggedItem.current]),
      previousArray: removeId(previousArray.current),
    });

    draggedItem.current = null;
    previousArray.current = null;
  }, [data, draggedItem, previousArray]);

  const onDeleteHandler = useCallback(index => {
    const withoutDeletedItemArray = itemsArray.filter((_, idx) => idx !== index);

    onDelete({
      currentArray: withoutDeletedItemArray,
      deletedItem : itemsArray[index],
    });
  }, [itemsArray]);

  const handleAdded = useCallback(() => {
    setIsAdded(!isAdded);
  }, [isAdded]);

  return (
    <ul onDragOver={ e => e.preventDefault }>
      { data.length
        ? data.map((item, index) => (
            <ListItem
              key={ item.uniqId }
              item={ item }
              index={ index }
              onDragStart={ dragStartHandler }
              onDragEnd={ dragEndHandler }
              onDragOver={ dragOverHandler }
              component={ component }
              onDelete={ onDeleteHandler }
              eventHandlers={ eventHandlers }
            />
          )
        )
        : <li className="empty">Empty</li>
      }
      {
        allowAdd && <AddItem
          isAdded={ isAdded }
          toggleIsAdded={ handleAdded }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      }
    </ul>
  );
}
