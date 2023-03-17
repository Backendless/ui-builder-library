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

  const [rootHeight, setRootHeight] = useState(height);
  const [rootWidth, setRootWidth] = useState(width);

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
      setRootHeight(elRef.current.getBoundingClientRect().height + 'px');
      setRootWidth(elRef.current.getBoundingClientRect().width + 'px');
    }
  }, [pageLoaded, elRef, height, width]);

  useEffect(() => {
    if (pageLoaded) {
      const spaceForControls = getBottomOffset(controlsRef.current) - getBottomOffset(pageRef);

      documentRef.style.height = `calc(${ rootHeight } - ${ spaceForControls }px)`;
      documentRef.style.width = rootWidth;

      pageRef.firstChild.style.height = `calc(${ rootHeight } - ${ spaceForControls }px)`;
      pageRef.firstChild.style.width = rootWidth;
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

const useResizeObserver = (pageRef, controlsRef, documentRef, pageLoaded, elRef) => {
  useEffect(() => {
    if (pageLoaded) {
      const resizeObserver = new ResizeObserver(entries => {
        const { height, width } = entries[0].contentRect;

        const spaceForControls = getBottomOffset(controlsRef.current) - getBottomOffset(pageRef);

        documentRef.style.height = `calc(${ height }px - ${ spaceForControls }px)`;
        documentRef.style.width = width + 'px';

        pageRef.firstChild.style.height = `calc(${ height }px - ${ spaceForControls }px)`;
        pageRef.firstChild.style.width = width + 'px';
      });

      resizeObserver.observe(elRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [pageLoaded, elRef, pageRef, documentRef, controlsRef]);
};
