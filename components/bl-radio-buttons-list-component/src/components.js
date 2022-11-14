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

function Input({ value, checked, handleChange }) {
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

function CheckedIcon() {
  return (
    <svg class="input__icon-filling" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={ `M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535
        15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z` }
      />
    </svg>
  )
}

function UncheckedIcon() {
  return (
    <svg class="input__icon__icon-ring" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={ `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42
        0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z` }
      />
    </svg>
  )
}
