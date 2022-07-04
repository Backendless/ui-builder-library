import { useCallback, useEffect, useRef, useState } from 'react';

import { ListContent } from './list-content';
import { AddItem } from './add-item';
import { getContextForDeleteEvent, getContextForDragEvent } from '../utils/context';
import { enrichWithUids } from '../utils/id';

export function List({ component, eventHandlers }) {
  const { onDrag, onDelete } = eventHandlers;
  const { itemsArray, allowAdd } = component;
  const draggedItem = useRef(null);
  const previousArray = useRef(null);
  const [isAdded, setIsAdded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (itemsArray) {
      const arrayWithUid = enrichWithUids(itemsArray);
      setData(arrayWithUid);
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

    if (draggedItem.current.uid === draggedOverItem.uid) {
      return;
    }

    const items = data.filter(item => item.uid !== draggedItem.current.uid);
    items.splice(index, 0, draggedItem.current);

    setData(items);
  }, [data, draggedItem]);

  const dragEndHandler = useCallback(() => {
    const contextForDragEvent = getContextForDragEvent(data, draggedItem.current, previousArray.current);
    onDrag(contextForDragEvent);

    draggedItem.current = null;
    previousArray.current = null;
  }, [data, draggedItem, previousArray]);

  const onDeleteHandler = useCallback(index => {
    const contextForDeleteEvent = getContextForDeleteEvent(itemsArray, index);
    onDelete(contextForDeleteEvent);
  }, [itemsArray]);

  const handleAdded = useCallback(() => {
    setIsAdded(!isAdded);
  }, [isAdded]);

  return (
    <ul onDragOver={ e => e.preventDefault }>
      <ListContent
        data={ data }
        onDragStart={ dragStartHandler }
        onDragEnd={ dragEndHandler }
        onDragOver={ dragOverHandler }
        component={ component }
        onDelete={ onDeleteHandler }
        eventHandlers={ eventHandlers }
      />
      { allowAdd && (
        <AddItem
          isAdded={ isAdded }
          toggleIsAdded={ handleAdded }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      ) }
    </ul>
  );
}
