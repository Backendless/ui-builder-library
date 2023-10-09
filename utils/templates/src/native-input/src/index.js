export default function NativeInput({ component, eventHandlers }) {
  const onChange = e => {
    const value = e.target.value;

    component.value = value;

    eventHandlers.onChange({ value });
  };

  return (
    <input
      className={ component.classList.join(' ') }
      value={ component.value || '' }
      onChange={ onChange }
    />
  );
}
