import { Input } from './input';

export function RadioButton({ id, isSelected, label, value, handleChange }) {
  return (
    <label className="radio-button">
      <Input id={ id } isSelected={ isSelected } value={ value } handleChange={ handleChange } />
      <span className="radio-button__label">
        { label }
      </span>
    </label>
  );
}
