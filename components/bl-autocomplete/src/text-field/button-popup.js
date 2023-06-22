const { cn } = BackendlessUI.CSSUtils;

export function ButtonPopup({ disabled, isOptionsOpen, setIsOptionsOpen }) {
  const handleClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  
  return (
    <button
      tabIndex="-1"
      type="button"
      disabled={ disabled }
      onClick={ handleClick }
      className={ cn('button', { ['button__popup-up']: isOptionsOpen }) }>
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="icon">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>
  );
}