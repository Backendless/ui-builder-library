export function ControlButton({ buttonName, onClick }) {
  return (
    <button className="material-icons-round" onClick={ onClick } aria-hidden="true">
      { buttonName }
    </button>
  );
}
