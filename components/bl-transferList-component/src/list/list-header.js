// import { getToggleAllIcon } from '../helpers/get-toggle-all-icon';
import { Checkbox } from './checkbox';

export const ListHeader = props => {
  const { items, title, selected, iconColor, setAllSelected } = props;

  const isAllChecked = items.length > 0 && items.length === selected.length;
  const isIndeterminated = selected.length > 0 && !isAllChecked;

  const handleToggleAll = ({ target: { checked } }) => {
    if (checked) {
      setAllSelected(prevState => {
        const selectedItems = items.filter(item => !prevState.includes(item));

        return prevState.concat(selectedItems);
      });
    } else {
      setAllSelected(prevState => prevState.filter(item => !items.includes(item)));
    }
  };

  return (
    <div className="list__header">
      <Checkbox
        id="checkboxSelectAll"
        isChecked={ isAllChecked }
        iconColor={ iconColor }
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
