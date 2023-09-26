export function FormField(props) {
  const { visibility, label, type, name, placeholder } = props;

  if (!visibility) {
    return null;
  }

  return (
    <div className="form-field">
      <label htmlFor={ name }>{ label }</label>
      <input name={ name } type={ type } placeholder={ placeholder } required/>
    </div>
  );
}
