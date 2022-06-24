import { icons } from '../icons';

import Checkbox from './Checkbox';
import ListItem from './ListItem';

const List = ({
  title,
  enableSelectAll,
  items,
  selected,
  dispatch,
}) => {
  const isAllChecked = items.length > 0 && items.length === selected.length;
  const isIndeterminated = selected.length > 0 && !isAllChecked;

  const handleToggleItem = ({ target: { value, checked } }) => {
    if (checked) {
      dispatch({ type: 'selectItems', items: [value] });
    } else {
      dispatch({ type: 'unselectItems', items: [value] });
    }
  };

  const handleToggleAll = ({ target: { checked } }) => {
    if (checked) {
      dispatch({ type: 'selectItems', items });
    } else {
      dispatch({ type: 'unselectItems', items });
    }
  };

  const setToggleAllIcon = () => {
    if (isAllChecked) {
      return icons.checked;
    } else if (isIndeterminated) {
      return icons.indeterminated;
    } else {
      return icons.unchecked;
    }
  };

  return (
    <div className="list">
      {enableSelectAll && (
        <div className="list__header">
          <Checkbox
            id="checkboxSelectAll"
            checked={ isAllChecked }
            icon={ setToggleAllIcon() }
            onChange={ handleToggleAll }
          />
          <div className="list__header-content">
            <div className="list__header-title">
              {title}
            </div>
            <div className="list__header-counter">
              {`${selected.length}/${items.length} selected`}
            </div>
          </div>
        </div>
      )}
      <div className="list__items">
        {items.map((item, index) => {
          const isChecked = selected.includes(item)
          const id = `${item}-${index}`

          return (
            <ListItem
              key={id}
              id={id}
              item={item}
              isChecked={isChecked}
              onChange={handleToggleItem}
            />
          )
        })}
      </div>
    </div>
  );
};

export default List;
