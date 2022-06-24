import { icons } from '../icons';

import Checkbox from './Checkbox';

const ListItem = ({
  id,
  item,
  isChecked,
  onChange,
}) => {
  const icon = isChecked ? icons.checked : icons.unchecked;

  return (
    <label
    htmlFor={ id }
    className="list-item">
      <Checkbox
        id={id}
        icon={icon}
        value={item}
        checked={isChecked}
        onChange={onChange}
      />
      <span className="list-item__content">{item}</span>
    </label>
  );
};

export default ListItem;
