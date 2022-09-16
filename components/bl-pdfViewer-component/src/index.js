import { Document, Page } from './react-pdf.min.js';
import { useState, useEffect, useRef } from 'react';
import { Controls } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

const sizeVariants = {
  'small' : { minHeight: 385, width: 250 },
  'normal': { minHeight: 550, width: 350 },
  'large' : { minHeight: 630, width: 400 },
};

export default function PdfViewer({ component, eventHandlers }) {
  const { style, display, classList, pdfUrl, renderType, size } = component;
  const { onLoadSuccess, onLoadError } = eventHandlers;

  const [numPages, setNumPages] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [documentRef, setDocumentRef] = useState();
  const [controlsDisabled, setControlsDisabled] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.style.width = ((inputRef.current.value.length + 1) * 9) + 'px';
  }, [`${ pageIndex }`.length]);

  useEffect(() => {
    if (documentRef) {
      documentRef.style = `height: ${ sizeVariants[size].minHeight }px`;
    }
  }, [documentRef]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    onLoadSuccess({ numPages });
  };

  const onDocumentLoadError = (error) => {
    onLoadError({ message: error.message });
  };

  const onNoData = () => {
    setControlsDisabled(true);

    return (
      <>
        <h3>No PDF file specified.</h3>
        <svg className="no-data-icon" width="24" height="24" viewBox="0 0 24 24">
          <path
                d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                fill="black"/>
          <path
            d="M11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5Z"
            fill="black"/>
          <path
            d="M16 9.5C16 10.3284 15.3284 11 14.5 11C13.6716 11 13 10.3284 13 9.5C13 8.67157 13.6716 8 14.5 8C15.3284 8 16 8.67157 16 9.5Z"
            fill="black"/>
          <path
                d="M11.6095 14.9282C10.7456 15.0454 10.0166 15.4544 9.64021 15.768C9.21593 16.1216 8.58537 16.0643 8.2318 15.64C7.87824 15.2157 7.93556 14.5851 8.35984 14.2316C8.98348 13.7119 10.0544 13.1209 11.3406 12.9464C12.6643 12.7668 14.203 13.0339 15.6402 14.2316C16.0645 14.5851 16.1218 15.2157 15.7682 15.64C15.4147 16.0643 14.7841 16.1216 14.3598 15.768C13.3971 14.9657 12.4357 14.8161 11.6095 14.9282Z"
                fill="black"/>
        </svg>
      </>
    );
  };

  const handlerPageChange = ({ target }) => {
    if (target.value === '') {
      setPageIndex(1);
    }

    if (/^\d+$/.test(target.value)) {
      let page = Number(target.value);

      if (page > numPages) {
        page = numPages;
      }

      if (page < 1) {
        page = 1;
      }

      setPageIndex(page);
    }
  };

  component.goPage = (page) => {
    setPageIndex(page);
  };

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-pdfViewer', classList) }
      style={ { ...style, ...sizeVariants[size] } }>
      <Document
        inputRef={ (ref) => setDocumentRef(ref) }
        className="pdf-viewer"
        renderMode={ renderType }
        file={ pdfUrl }
        noData={ onNoData }
        onLoadError={ onDocumentLoadError }
        onLoadSuccess={ onDocumentLoadSuccess }>
        <Page
          renderTextLayer={ false }
          width={ sizeVariants[size].width }
          height={ sizeVariants[size].minHeight }
          pageNumber={ pageIndex }
        />
      </Document>
      <Controls
        pageIndex={ pageIndex }
        setPageIndex={ setPageIndex }
        inputRef={ inputRef }
        handlerPageChange={ handlerPageChange }
        numPages={ numPages }
        disabled={ controlsDisabled }
      />
    </div>
  );
}
