import { useState, useEffect, useRef } from 'react';
import { Document, Page } from './react-pdf.min.js';
import { Controls, NoData } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function PdfViewer({ component, eventHandlers }) {
  const { style, display, classList, pdfUrl, renderType, width, height } = component;
  const { onLoadSuccess, onLoadError } = eventHandlers;

  const [numPages, setNumPages] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [documentRef, setDocumentRef] = useState();
  const [pageRef, setPageRef] = useState();
  const [controlsDisabled, setControlsDisabled] = useState(false);

  const inputRef = useRef();

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
    pageRef.firstChild.style.width = width;
    pageRef.firstChild.style.height = height;
  };

  const onNoData = () => {
    setControlsDisabled(true);

    return <NoData/>;
  };

  const handlerPageChange = ({ target }) => {
    if (target.value === '') {
      setPageIndex(1);
    }

    if (Number(target.value)) {
      const ensureRange = (v, {min, max}) => Math.max(min, Math.min(v, max));

      const page = ensureRange(target.value, {min: 1, max: numPages})

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
          inputRef={(ref) => setPageRef(ref)}
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
