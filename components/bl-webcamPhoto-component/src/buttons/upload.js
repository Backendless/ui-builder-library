export function UploadButton({ onChange, inputRef, text, disabled }) {
  return (
    <label className="upload-button">
      { text }
      <input type="file" onChange={ onChange } ref={ inputRef } disabled={ disabled }/>
    </label>
  );
}
