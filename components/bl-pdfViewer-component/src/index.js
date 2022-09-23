import { Document, Page } from './react-pdf.min.js';
import { useState, useEffect, useRef } from 'react';
import { Controls, NoData } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function PdfViewer({ component, eventHandlers }) {
  const { style, display, classList, pdfUrl, renderType, width, height } = component;
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
      documentRef.style.height = height;
      documentRef.style.width = width;
    }
  }, [documentRef]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    onLoadSuccess({ pageCount: numPages });
  };

  const onDocumentLoadError = (error) => {
    onLoadError({ message: error.message });
  };

  const onPageLoadSuccess = () => {
    documentRef.firstChild.firstChild.style.width = width;
    documentRef.firstChild.firstChild.style.height = height;
  };

  const onNoData = () => {
    setControlsDisabled(true);

    return <NoData/>;
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

  component.setPage = (page) => {
    setPageIndex(page);
  };

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-pdfViewer', classList) }
      style={ { ...style } }>
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
          onLoadSuccess={ onPageLoadSuccess }
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
