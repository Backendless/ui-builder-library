export const Checkbox = props => {
  const {
    id,
    icon,
    value,
    checked,
    iconColor,
    onChange,
  } = props;

  return (
    <div className="checkbox">
       <input
        id={ id }
        type="checkbox"
        value={ value }
        checked={ checked }
        tabIndex="-1"
        className="checkbox__input"
        onChange={ onChange }
      />
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill={ iconColor }
        className="checkbox__icon">
        <path d={ icon } />
      </svg>
    </div>
  );
};
