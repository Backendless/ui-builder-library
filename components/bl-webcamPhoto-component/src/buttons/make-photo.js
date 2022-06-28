export function MakePhotoButton({ onClick, text, disabled }) {
  return (
    <button
      onClick={ onClick }
      className="photo-button"
      disabled={ disabled }>
      { text }
    </button>
  );
}
