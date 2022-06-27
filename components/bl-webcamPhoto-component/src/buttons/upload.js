export function UploadButton({ onChange, reference, text, disabled }) {
  return (
    <label className="upload-button">
      { text }
      <input
        type="file"
        onChange={ onChange }
        ref={ reference }
        disabled={ disabled }
      />
    </label>
  );
}
