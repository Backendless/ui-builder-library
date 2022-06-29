import { icons } from '../icons';
import { Checkbox } from './';

export const ListItem = ({
  id,
  value,
  label,
  iconColor,
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
        iconColor={iconColor}
        onChange={onChange}
      />
      <span className="list-item__content">{label}</span>
    </label>
  );
};
