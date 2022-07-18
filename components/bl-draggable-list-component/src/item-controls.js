import { DeleteIcon, DoneIcon, EditIcon } from './icons';

export function ItemControls({ allowEdit, isEdit, handleEdit, handleDone, allowDelete, onDelete, index }) {
  return (
    <div>
      { allowEdit && (
        <button onClick={ isEdit ? handleDone : handleEdit }>
          { isEdit ? <DoneIcon/> : <EditIcon/> }
        </button>
      ) }

      { allowDelete && (
        <button onClick={ () => onDelete(index) }><DeleteIcon/></button>
      ) }
    </div>
  );
}
