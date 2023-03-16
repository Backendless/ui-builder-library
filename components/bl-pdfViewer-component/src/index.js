import { useEffect, useRef, useState } from 'react';

import { Document, Page } from './react-pdf.min.js';
import { Controls, NoData } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function PdfViewer({ component, eventHandlers, elRef }) {
  const { style, display, classList, pdfUrl, width, height } = component;
  const { onLoadSuccess, onLoadError } = eventHandlers;

  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage ] = useState(1);
  const [documentRef, setDocumentRef] = useState();
  const [pageRef, setPageRef] = useState();
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const controlsRef = useRef();

  useResizeObserver(pageRef, documentRef, pageLoaded, height);

  useEffect(() => {
    if (documentRef) {
      documentRef.style.height = height;
      documentRef.style.width = width;
    }
  }, [documentRef, height, width]);

  useEffect(() => {
    if (pageLoaded) {
      const spaceForControls = getBottomOffset(controlsRef.current) - getBottomOffset(pageRef);

      documentRef.style.height = `calc(${ height } - ${ spaceForControls }px)`;
      documentRef.style.width = width || 'auto';

      pageRef.firstChild.style.height = height ? `calc(${ height } - ${ spaceForControls }px)` : 'auto';
      pageRef.firstChild.style.width = width || 'auto';
    }
  }, [pageLoaded, height, width, pageRef, documentRef]);

  useEffect(() => {
    setIsControlsVisible(false);
  }, [pdfUrl]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageCount(numPages);
    setIsControlsVisible(true);
    onLoadSuccess({ pageCount: numPages });
  };

  const onDocumentLoadError = error => {
    setIsControlsVisible(false);
    onLoadError({ message: error.message });
  };

  const onLoading = () => {
    setPageLoaded(false);
  };

  const onPageLoadSuccess = () => {
    setPageLoaded(true);
    pageRef.firstChild.style.overflow = 'auto';
  };

  const onNoData = () => {
    setIsControlsVisible(false);

    return <NoData/>;
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
      <Document
        inputRef={ ref => setDocumentRef(ref) }
        className="pdf-viewer"
        renderMode="canvas"
        file={ pdfUrl }
        noData={ onNoData }
        onLoadError={ onDocumentLoadError }
        onLoadSuccess={ onDocumentLoadSuccess }>
        <Page
          inputRef={ ref => setPageRef(ref) }
          renderTextLayer={ false }
          renderAnnotationLayer={ false }
          renderForms={ false }
          loading={ onLoading }
          onLoadSuccess={ onPageLoadSuccess }
          pageNumber={ currentPage }
        />
      </Document>
      <Controls
        controlsRef={ controlsRef }
        currentPage={ currentPage }
        setCurrentPage={ setCurrentPage }
        pageCount={ pageCount }
        display={ isControlsVisible }
      />
    </div>
  );
}

const getBottomOffset = el => {
  const rect = el.getBoundingClientRect();

  return rect.bottom + window.scrollY;
};

const useResizeObserver = (pageRef, documentRef, pageLoaded, height) => {
  useEffect(() => {
    if (pageLoaded && !height) {
      const resizeObserver = new ResizeObserver(entries => {
        const { height, width } = entries[0].contentRect;

        documentRef.style.height = height + 'px';
      });

      resizeObserver.observe(pageRef.firstChild);

      return () => resizeObserver.disconnect();
    }
  }, [documentRef, pageRef, pageLoaded, height]);
};
