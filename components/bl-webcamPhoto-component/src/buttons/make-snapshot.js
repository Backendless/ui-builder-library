export function MakeSnapshotButton({ onClick, text, disabled }) {
  return (
    <button disabled={ disabled } className="snapshot-button" onClick={ onClick }>{ text }</button>
  );
}
