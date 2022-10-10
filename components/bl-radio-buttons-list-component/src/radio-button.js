import { Input } from './input';

export function RadioButton({ isChecked, label, value, handleChange }) {
  return (
    <label className="radio-button">
      <Input isChecked={ isChecked } value={ value } handleChange={ handleChange } />
      <span className="radio-button__label">
        { label }
      </span>
    </label>
  );
}
