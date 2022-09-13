export function ColorCharacter(props) {
  const { inputMarker, inputValue, onChange, key } = props;

  return (
    <label className="color-character" key={ key }>
      <span>{ inputMarker }</span>
      <input type="number" min="0" value={ inputValue } onChange={ onChange }/>
    </label>
  );
}
