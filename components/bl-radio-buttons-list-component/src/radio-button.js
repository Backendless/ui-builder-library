import { Input } from './input';

export function RadioButton({ checked, label, value, handleChange }) {
  return (
    <label className="radio-button">
      <Input checked={ checked } value={ value } handleChange={ handleChange } />
      <span className="radio-button__label">
        { label }
      </span>
    </label>
  );
}
