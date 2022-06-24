const Checkbox = ({
  id,
  type = 'checkbox',
  icon,
  value,
  checked,
  tabIndex = -1,
  onChange,
}) => (
  <div className="checkbox__container">
    <input
      id={id}
      type={type}
      value={value}
      tabIndex={tabIndex}
      checked={checked}
      className="checkbox__input"
      onChange={onChange}
    />
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="checkbox__icon">
      <path d={icon} />
    </svg>
  </div>
);

export default Checkbox;
