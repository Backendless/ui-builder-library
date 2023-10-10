import { useCallback, useEffect, useRef, useState } from 'react';

import { prepareOnDeleteContext, prepareOnDragContext } from './helpers/context';
import { enrichWithUids } from './helpers/id';
import { AddItem } from './add-item';
import { ListContent } from './list-content';

export function List({ component, eventHandlers }) {
  const { onDrag, onDelete } = eventHandlers;
  const { itemsList, allowAdd } = component;

  const draggedItem = useRef(null);
  const previousList = useRef(null);

  const [isAdded, setIsAdded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(enrichWithUids(itemsList || []));
  }, [itemsList]);

  const dragStartHandler = useCallback((e, index) => {
    draggedItem.current = data[index];
    previousList.current = data;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }, [data, draggedItem]);

  const dragOverHandler = useCallback((e, index) => {
    e.preventDefault();
    const draggedOverItem = data[index];

    if (draggedItem.current.uid !== draggedOverItem.uid) {
      const items = data.filter(item => item.uid !== draggedItem.current.uid);
      items.splice(index, 0, draggedItem.current);

      setData(items);
    }
  }, [data, draggedItem]);

  const dragEndHandler = useCallback(() => {
    const onDragContext = prepareOnDragContext(data, draggedItem.current, previousList.current);

    onDrag(onDragContext);

    draggedItem.current = null;
    previousList.current = null;
  }, [data, draggedItem, previousList]);

  const onDeleteHandler = useCallback(index => {
    const onDeleteContext = prepareOnDeleteContext(itemsList, index);

    onDelete(onDeleteContext);
  }, [itemsList]);

  return (
    <ul>
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
          toggleIsAdded={ () => setIsAdded(!isAdded) }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      ) }
    </ul>
  );
}
