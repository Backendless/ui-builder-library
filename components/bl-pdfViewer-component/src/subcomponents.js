const { cn } = BackendlessUI.CSSUtils;

export function Controls(props) {
  const { pageIndex, setPageIndex, inputRef, handlerPageChange, numPages, disabled } = props;

  return (
    <div className={ cn('controls', { 'disabled': disabled }) }>
      <button
        className="controls-button"
        onClick={ () => setPageIndex(state => state - 1) }
        disabled={ pageIndex === 1 || disabled }>
        <PrevButtonIcon/>
      </button>
      <div className="pages-info">
        <input
          ref={ inputRef }
          className="page-input"
          disabled={ disabled }
          value={ pageIndex }
          onChange={ handlerPageChange }
        />
        <span>/{ numPages }</span>
      </div>
      <button
        className="controls-button"
        onClick={ () => setPageIndex(state => state + 1) }
        disabled={ pageIndex === numPages || disabled }>
        <NextButtonIcon/>
      </button>
    </div>
  );
}

function NextButtonIcon() {
  return (
    <svg
      className="controls-button-icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
    </svg>
  );
}

function PrevButtonIcon() {
  return (
    <svg
      className="controls-button-icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
    </svg>
  );
}
