import { getMapFromObjectsArray } from '../helpers';
import { Checkbox } from './checkbox';

export function ListHeader(props) {
  const { items, title, selected, setAllSelected } = props;

  const isAllChecked = items.length > 0 && items.length === selected.length;
  const isIndeterminated = selected.length > 0 && !isAllChecked;

  const handleToggleAll = ({ target: { checked } }) => {
    if (checked) {
      setAllSelected(prevState => {
        const prevStateMap = getMapFromObjectsArray(prevState);
        const selectedItems = items.filter(({ objectId }) => !prevStateMap[objectId]);

        return prevState.concat(selectedItems);
      });
    } else {
      setAllSelected(prevState => {         
        const prevStateMap = getMapFromObjectsArray(prevState);

        return prevState.filter(({ objectId }) => !prevStateMap[objectId]);
      });
    }
  };

  return (
    <div className="list__header">
      <Checkbox
        id="checkboxSelectAll"
        isChecked={ isAllChecked }
        isIndeterminated={ isIndeterminated }
        onChange={ handleToggleAll }
      />
      <div className="list__header-content">
        <div className="list__header-title">
          { title }
        </div>
        <div className="list__header-counter">
          { `${selected.length}/${items.length} selected` }
        </div>
      </div>
    </div>
  );
};
