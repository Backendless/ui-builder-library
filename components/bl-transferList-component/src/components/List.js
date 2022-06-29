import { icons } from '../icons';
import { actions } from '../hooks/useTransferList';

import { Checkbox, ListItem } from './';

export const List = ({
  title,
  iconColor,
  enableSelectAll,
  items,
  selected,
  dispatch,
}) => {
  const isAllChecked = items.length > 0 && items.length === selected.length;
  const isIndeterminated = selected.length > 0 && !isAllChecked;

  const handleToggleItem = ({ target: { value, checked } }) => {
    const item = items.find(item => item.value === value);

    if (checked) {
      dispatch({ type: actions.SELECT_ITEMS, items: [item] });
    } else {
      dispatch({ type: actions.UNSELECT_ITEMS, items: [item] });
    }
  };

  const handleToggleAll = ({ target: { checked } }) => {
    if (checked) {
      dispatch({ type: actions.SELECT_ITEMS, items });
    } else {
      dispatch({ type: actions.UNSELECT_ITEMS, items });
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
            checked={isAllChecked}
            iconColor={iconColor}
            icon={setToggleAllIcon()}
            onChange={handleToggleAll}
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
        {items.map((item) => {
          const isChecked = selected.some(({ objectId }) => item.objectId === objectId);

          return (
            <ListItem
              key={item.objectId}
              id={item.objectId}
              value={item.value}
              label={item.label}
              iconColor={iconColor}
              isChecked={isChecked}
              onChange={handleToggleItem}
            />
          )
        })}
      </div>
    </div>
  );
};
