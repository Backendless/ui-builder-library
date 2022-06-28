export const Input = ({ props }) => {
  const {
    id,
    type = 'checkbox',
    value,
    tabIndex = -1,
    checked,
    onChange
  } = props;

  return (
    <input
      id={id}
      type={type}
      value={value}
      tabIndex={tabIndex}
      checked={checked}
      className="input"
      onChange={onChange}
    />
  );
};
