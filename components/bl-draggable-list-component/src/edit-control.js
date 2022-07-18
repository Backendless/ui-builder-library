export function EditControl({ item, onChange }) {
  return (
    <div>
      <input placeholder="Label" type="text" name="label" value={ item.label } onChange={ onChange }/>
      <input placeholder="Value" type="text" name="value" value={ item.value } onChange={ onChange }/>
    </div>
  );
}
