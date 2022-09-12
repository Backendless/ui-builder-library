const { cn } = BackendlessUI.CSSUtils;

export function Controls(props) {
  const { pageNumber, setPageNumber, inputRef, handlerPageChange, numPages } = props;

  return (
    <div className="controls">
      <button
        className={ cn('controls-button', { disabled: pageNumber === 1 }) }
        onClick={ () => setPageNumber(state => state - 1) }
        disabled={ pageNumber === 1 }>
        <PrevButtonIcon/>
      </button>
      <div className="pages-info">
        <input
          ref={ inputRef }
          className="page-input"
          value={ pageNumber }
          onChange={ handlerPageChange }
        />
        <span>/{ numPages }</span>
      </div>
      <button
        className={ cn('controls-button', { disabled: pageNumber === numPages }) }
        onClick={ () => setPageNumber(state => state + 1) }
        disabled={ pageNumber === numPages }>
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
