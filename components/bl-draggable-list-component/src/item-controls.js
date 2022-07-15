import { DeleteIcon, DoneIcon, EditIcon } from './icons';

export function ItemControls({ allowEdit, isEdit, handleEdit, handleDone, allowDelete, onDelete, index }) {
  return (
    <div>
      { allowEdit && !isEdit && <button onClick={ handleEdit }>
        <EditIcon/>
      </button>
      }
      { allowEdit && isEdit && <button onClick={ handleDone }>
        <DoneIcon/>
      </button>
      }
      { allowDelete && <button onClick={ () => onDelete(index) }>
        <DeleteIcon/>
      </button>
      }
    </div>
  );
}
