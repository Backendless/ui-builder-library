import { useEffect, useRef, useState } from 'react';

import { Document, Page } from './react-pdf.min.js';
import { Controls, NoData } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function PdfViewer({ component, eventHandlers, elRef }) {
  const { style, display, classList, pdfUrl, width, height } = component;
  const { onLoadSuccess, onLoadError } = eventHandlers;

  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentRef, setDocumentRef] = useState();
  const [pageRef, setPageRef] = useState();
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const [rootHeight, setRootHeight] = useState(0);
  const [rootWidth, setRootWidth] = useState(0);

  const controlsRef = useRef();

  useResizeObserver(pageRef, controlsRef, documentRef, pageLoaded, elRef);

  useEffect(() => {
    if (documentRef) {
      documentRef.style.height = height;
      documentRef.style.width = width;
    }
  }, [documentRef, height, width]);

  useEffect(() => {
    if (pageLoaded) {
      setRootHeight(elRef.current.getBoundingClientRect().height);
      setRootWidth(elRef.current.getBoundingClientRect().width);
    }
  }, [pageLoaded, elRef, height, width]);

  useEffect(() => {
    if (pageLoaded) {
      const spaceForControls = getBottomOffset(controlsRef.current) - getBottomOffset(pageRef);
      const pdfHeight = rootHeight - spaceForControls;

      documentRef.style.height = measure(pdfHeight, 'px');
      documentRef.style.width = measure(rootWidth, 'px');

      pageRef.firstChild.style.height = measure(pdfHeight, 'px');
      pageRef.firstChild.style.width = measure(rootWidth, 'px');
    }
  }, [pageLoaded, pageRef, documentRef, rootHeight, rootWidth]);

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

const measure = (variable, unit) => `${ variable }${ unit }`;

const useResizeObserver = (pageRef, controlsRef, documentRef, pageLoaded, elRef) => {
  useEffect(() => {
    if (pageLoaded) {
      const resizeObserver = new ResizeObserver(entries => {
        const { height, width } = entries[0].contentRect;

        const spaceForControls = getBottomOffset(controlsRef.current) - getBottomOffset(pageRef);
        const pdfHeight = height - spaceForControls;

        documentRef.style.height = measure(pdfHeight, 'px');
        documentRef.style.width = measure(width, 'px');

        pageRef.firstChild.style.height = measure(pdfHeight, 'px');
        pageRef.firstChild.style.width = measure(width, 'px');
      });

      resizeObserver.observe(elRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [pageLoaded, elRef, pageRef, documentRef, controlsRef]);
};
