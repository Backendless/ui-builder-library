import { icons } from '../helpers/icons';
import { Checkbox } from './checkbox';

export const ListItem = props => {
  const {
    id,
    value,
    label,
    iconColor,
    isChecked,
    onChange,
  } = props;

  const icon = isChecked ? icons.checked : icons.unchecked;

  return (
    <label
      htmlFor={ id }
      className="list-item">
      <Checkbox
        id={ id }
        value={ value }
        checked={ isChecked }
        iconColor={ iconColor }
        icon={ icon }
        onChange={ onChange }
      />
      <span className="list-item__content">{label}</span>
    </label>
  );
};
