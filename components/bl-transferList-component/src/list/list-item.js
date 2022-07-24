import { Checkbox } from './checkbox';

export const ListItem = props => (
  <label
    htmlFor={ props.id }
    className="list-item">
    <Checkbox { ...props } />
    <span className="list-item__content">{ props.label }</span>
  </label>
);
