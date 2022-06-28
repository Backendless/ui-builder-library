import { icons } from '../icons';
import { Checkbox } from './';

export const ListItem = ({
  id,
  value,
  label,
  isChecked,
  onChange,
}) => {
  const icon = isChecked ? icons.checked : icons.unchecked;

  return (
    <label
      htmlFor={id}
      className="list-item">
      <Checkbox
        id={id}
        icon={icon}
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      <span className="list-item__content">{label}</span>
    </label>
  )
};
