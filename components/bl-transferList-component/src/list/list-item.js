import { Checkbox } from './checkbox';

export function ListItem(props) {
  const { id, value, label, isChecked, onChange } = props;
  
  return (
    <label htmlFor={ id } className="list-item">
      <Checkbox
        id={ id }
        value={ value }
        isChecked={ isChecked }
        onChange={ onChange }
      />
      <span className="list-item__content">{ label }</span>
    </label>
  );
};
