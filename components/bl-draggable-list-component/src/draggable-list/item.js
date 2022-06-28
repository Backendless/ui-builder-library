import { useCallback, useState } from 'react';

import { DeleteSVG, DoneSVG, DraggableSVG, EditSVG } from '../svg/index';

export function ListItem({ item, onDragStart, onDragEnd, onDragOver, index, component, onDelete, eventHandlers }) {
  const { itemsArray, allowEdit, allowDelete } = component;
  const { onEdit } = eventHandlers;
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = useCallback(event => {
    setInputValue(event.target.value);
  }, [event]);

  const handleEdit = useCallback(() => {
    setIsEdit(true);
    setInputValue(item.label);
  }, [item]);

  const handleDone = useCallback(() => {
    if (inputValue.trim().length) {
      const editedArray = itemsArray.map((item, idx) => {
        return index === idx
          ? { ...item, label: inputValue }
          : item;
      });

      onEdit({
        currentArray: editedArray,
        previousItem: itemsArray[index],
        currentItem : editedArray[index],
      });
    }

    setIsEdit(false);
  }, [itemsArray, inputValue, index]);

  return (
    <li onDragOver={ e => onDragOver(e, index) }>
      <div
        className="content"
        draggable={ !isEdit }
        onDragStart={ e => onDragStart(e, index) }
        onDragEnd={ onDragEnd }
      >
        <DraggableSVG/>
        { isEdit
          ? <input
            type="text"
            value={ inputValue }
            onChange={ event => handleChangeInput(event) }
          />
          : <span>{ item.label }</span>
        }
      </div>
      <div className="svg-container">
        { allowEdit && !isEdit && <button onClick={ handleEdit }>
          <EditSVG/>
        </button>
        }
        { allowEdit && isEdit && <button onClick={ handleDone }>
          <DoneSVG/>
        </button>
        }
        { allowDelete && <button onClick={ () => onDelete(index) }>
          <DeleteSVG/>
        </button>
        }
      </div>
    </li>
  );
}
