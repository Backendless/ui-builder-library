import { useEffect, useState } from 'react';

import { DownloadIcon, MinusIcon, NextButtonIcon, PlusIcon, PrevButtonIcon, PrintIcon } from './icons';
import printJS from './print-pdf.js';

export function Controls(props) {
  const { currentPage, setCurrentPage, pageCount, controlsRef, scale, setScale, pdfUrl, component } = props;
  const { showDownloadButton, showPrintButton } = component;

  if (!pageCount) {
    return null;
  }

  return (
    <div ref={ controlsRef } className="controls">
      <PageControls
        currentPage={ currentPage }
        setCurrentPage={ setCurrentPage }
        pageCount={ pageCount }
      />
      <ScaleControls scale={ scale } setScale={ setScale }/>
      { (showDownloadButton || showPrintButton) && (
        <OtherControls
          pdfUrl={ pdfUrl }
          showDownloadButton={ showDownloadButton }
          showPrintButton={ showPrintButton }
        />
      ) }
    </div>
  );
}

function PageControls({ currentPage, setCurrentPage, pageCount }) {
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    setNextPage(currentPage);
  }, [currentPage]);

  const onSubmit = ({ target }) => {
    const value = Number(target.value);
    let validPage = value;

    if (target.value === '') {
      validPage = 1;
    } else if (value < 1 || value > pageCount) {
      validPage = currentPage;

      console.warn(`Non existed page "${ value }". Please, choose the page in range ${ 1 } - ${ pageCount }`);
    }

    setCurrentPage(validPage);
    setNextPage(validPage);
  };

  const onEnter = event => {
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };

  const onInputChange = ({ target }) => {
    const value = target.value;

    if (!/\D/.test(value)) {
      setNextPage(value);
    }
  };

  const onNextButtonClick = () => setCurrentPage(state => state + 1);
  const onPrevButtonClick = () => setCurrentPage(state => state - 1);

  return (
    <div className="controls__page">
      <button
        className="controls__button"
        onClick={ onPrevButtonClick }
        disabled={ (currentPage > pageCount) || (currentPage <= 1) }>
        <PrevButtonIcon/>
      </button>
      <button
        className="controls__button"
        onClick={ onNextButtonClick }
        disabled={ (currentPage >= pageCount) || (currentPage <= 0) }>
        <NextButtonIcon/>
      </button>
      <input
        className="controls__page-input"
        value={ nextPage }
        onChange={ onInputChange }
        onKeyDown={ onEnter }
        onBlur={ onSubmit }
      />
      <span>/{ pageCount }</span>
    </div>
  );
}

function ScaleControls({ scale, setScale }) {
  const onMinusScaleClick = () => setScale(s => +Math.max(0.1, s - 0.1).toFixed(1));
  const onPlusScaleClick = () => setScale(s => +Math.min(10, s + 0.1).toFixed(1));

  return (
    <div className="controls__scale">
      <button className="controls__button" onClick={ onMinusScaleClick } disabled={ scale <= 0.1 }>
        <MinusIcon/>
      </button>
      <span>{ scale }</span>
      <button className="controls__button" onClick={ onPlusScaleClick } disabled={ scale >= 10 }>
        <PlusIcon/>
      </button>
    </div>
  );
}

function OtherControls({ pdfUrl, showDownloadButton, showPrintButton }) {
  const printButtonClick = () => printJS({
    printable         : pdfUrl,
    type              : 'pdf',
    onPrintDialogClose: () => document.getElementById('printJS').remove(),
  });

  return (
    <div className="controls__other">
      { showDownloadButton && (
        <a className="controls__button" href={ pdfUrl } download="pdf">
          <DownloadIcon/>
        </a>
      ) }
      { showPrintButton && (
        <button className="controls__button" onClick={ printButtonClick }>
          <PrintIcon/>
        </button>
      ) }
    </div>
  );
}

export function NoData() {
  return (
    <>
      <span className="no-data-text">No PDF file specified.</span>
      <svg className="no-data-icon" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
        />
        <path
          d="M11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5Z"
        />
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
