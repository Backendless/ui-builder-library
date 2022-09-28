import { useCallback, useState } from 'react';

import { DraggableIcon } from './icons';
import { prepareOnEditContext } from './helpers/context';
import { ItemControls } from './item-controls';
import { EditControl } from './edit-control';
import { validate } from './helpers/validate';

export function ListItem({ item, onDragStart, onDragEnd, onDragOver, index, component, onDelete, eventHandlers }) {
  const { itemsList, allowEdit, allowDelete } = component;
  const { onEdit } = eventHandlers;

  const { label, value } = item;

  const [isEdit, setIsEdit] = useState(false);
  const [itemState, setItemState] = useState({ label, value });

  const handleChange = useCallback(event => {
    const { name, value } = event.target;

    setItemState({ ...itemState, [name]: value });
  }, [itemState]);

  const handleEdit = useCallback(() => {
    setIsEdit(true);
  }, [item]);

  const handleDone = useCallback(() => {
    if (validate(itemState)) {
      const onEditContext = prepareOnEditContext(itemsList, index, itemState);

      onEdit(onEditContext);
    }

    setIsEdit(false);
  }, [itemsList, itemState, index]);

  return (
    <li onDragOver={ e => onDragOver(e, index) }>
      <div
        className="content"
        draggable={ !isEdit }
        onDragStart={ e => onDragStart(e, index) }
        onDragEnd={ onDragEnd }>
        <DraggableIcon/>
        { isEdit
          ? <EditControl item={ itemState } onChange={ handleChange }/>
          : <div>
              <span style={ { 'display': 'inline-block', 'min-width': '100px' } }>{ item.label }</span>
              { showValues && (
                <span style={ { 'margin-left': '10px' } }>{ item.value }</span>
              ) }
            </div>
        }
      </div>
      <ItemControls
        allowEdit={ allowEdit }
        isEdit={ isEdit }
        handleEdit={ handleEdit }
        handleDone={ handleDone }
        allowDelete={ allowDelete }
        onDelete={ onDelete }
        index={ index }
      />
    </li>
  );
}
