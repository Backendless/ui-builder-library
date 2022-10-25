import { CheckedIcon } from './checked-icon';
import { UncheckedIcon } from './unchecked-icon';

export function Input({ value, checked, handleChange }) {
  return (
    <div className="input">
      <input
        id={ `${ value }-radio-button` }
        type="radio"
        value={ value }
        checked={ checked }
        onChange={() => handleChange(value) }
        className="input__radio"
      />
      <div class="input__icon">
        { checked && <CheckedIcon /> }
        <UncheckedIcon />
      </div>
    </div>
  )
}
