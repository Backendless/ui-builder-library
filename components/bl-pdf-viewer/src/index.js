import { useRef, useState } from 'react';

import { Document, Page } from './react-pdf.min.js';
import { Controls, NoData } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function PdfViewer({ component, eventHandlers, elRef }) {
  const { style, display, classList, pdfUrl, width, height, scale: scaleProp } = component;
  const { onLoadSuccess, onLoadError } = eventHandlers;

  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scale, setScale] = useState(scaleProp);

  const controlsRef = useRef();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageCount(numPages);
    onLoadSuccess({ pageCount: numPages });
  };

  const onDocumentLoadError = error => {
    onLoadError({ message: error.message });
  };

  const onDocumentLoading = () => {
    setPageLoaded(false);

    return 'Loading PDF…';
  };

  const onPageLoading = () => {
    setPageLoaded(false);

    return 'Loading page…';
  };

  const onPageLoadSuccess = () => {
    setPageLoaded(true);
  };

  const onNoData = () => {
    setPageLoaded(false);

    return (
      <NoData/>
    );
  };

  component.setPage = page => {
    setCurrentPage(page);
  };

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      className={ cn('bl-customComponent-pdfViewer', classList) }
      style={{ ...style, width, height }}>
      { pageLoaded && (
        <Controls
          component={ component }
          controlsRef={ controlsRef }
          currentPage={ currentPage }
          setCurrentPage={ setCurrentPage }
          pageCount={ pageCount }
          scale={ scale }
          setScale={ setScale }
          pdfUrl={ pdfUrl }
        />
      ) }
      <div className="container">
        <Document
          className="pdf-viewer"
          renderMode="canvas"
          file={ pdfUrl }
          noData={ onNoData }
          loading={ onDocumentLoading }
          onLoadError={ onDocumentLoadError }
          onLoadSuccess={ onDocumentLoadSuccess }>
          <Page
            renderTextLayer={ false }
            renderAnnotationLayer={ false }
            renderForms={ false }
            loading={ onPageLoading }
            onLoadSuccess={ onPageLoadSuccess }
            pageNumber={ currentPage }
            scale={ scale }
          />
        </Document>
      </div>
    </div>
  );
}
