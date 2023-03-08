const { cn } = BackendlessUI.CSSUtils;

export function NoData() {
  return (
    <>
      <h3>No PDF file specified.</h3>
      <svg className="no-data-icon" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
        />
        <path
          d="M11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5Z"
          fill="black"/>
        <path
          d="M16 9.5C16 10.3284 15.3284 11 14.5 11C13.6716 11 13 10.3284 13 9.5C13 8.67157 13.6716 8 14.5 8C15.3284 8 16 8.67157 16 9.5Z"
        />
        <path
          d="M11.6095 14.9282C10.7456 15.0454 10.0166 15.4544 9.64021 15.768C9.21593 16.1216 8.58537 16.0643 8.2318 15.64C7.87824 15.2157 7.93556 14.5851 8.35984 14.2316C8.98348 13.7119 10.0544 13.1209 11.3406 12.9464C12.6643 12.7668 14.203 13.0339 15.6402 14.2316C16.0645 14.5851 16.1218 15.2157 15.7682 15.64C15.4147 16.0643 14.7841 16.1216 14.3598 15.768C13.3971 14.9657 12.4357 14.8161 11.6095 14.9282Z"
        />
      </svg>
    </>
  );
}

export function Controls(props) {
  const { pageIndex, setPageIndex, inputRef, handlerPageChange, numPages, disabled } = props;

  return (
    <div className={ cn('controls', { 'disabled': disabled }) }>
      <button
        className="controls-button"
        onClick={ () => setPageIndex(state => state - 1) }
        disabled={ (pageIndex > numPages) || (pageIndex <= 1) }>
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
        disabled={ (pageIndex >= numPages) || (pageIndex <= 0) }>
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
