export function ColorCharacter(props) {
  const { inputMarker, inputValue, onChange } = props;

  return (
    <label className="color-character">
      <span>{ inputMarker }</span>
      <input type="number" min="0" value={ inputValue } onChange={ onChange }/>
    </label>
  );
}
