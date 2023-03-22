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

  useResizeObserver(pageRef, controlsRef, documentRef, pageLoaded, elRef, height, width);

  useEffect(() => {
    if (documentRef) {
      documentRef.style.height = '100%';
      documentRef.style.width = '100%';
    }
  }, [documentRef, height, width]);

  useEffect(() => {
    if (pageLoaded) {
      setRootHeight(elRef.current.getBoundingClientRect().height);
      setRootWidth(elRef.current.getBoundingClientRect().width);
    }
  }, [pageLoaded, height, width]);

  useEffect(() => {
    if (pageLoaded) {
      const spaceForControls = getBottomOffset(controlsRef.current) - getBottomOffset(pageRef);
      const pdfHeight = rootHeight - spaceForControls;

      documentRef.style.height = height ? measure(pdfHeight, 'px') : 'auto';
      documentRef.style.width = width ? measure(rootWidth, 'px') : 'auto';

      pageRef.firstChild.style.height = height ? measure(pdfHeight, 'px') : 'auto';
      pageRef.firstChild.style.width = width ? measure(rootWidth, 'px') : 'auto';
    }
  }, [pageLoaded, rootHeight, rootWidth, width, height]);

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

  useEffect(() => {
    if (!display) {
      setPageLoaded(false);
      setIsControlsVisible(false);
    }
  }, [display]);

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
  if (el) {
    const rect = el.getBoundingClientRect();

    return rect.bottom + window.scrollY;
  }

  return null;
};

const measure = (variable, unit) => `${ variable }${ unit }`;

const useResizeObserver = (pageRef, controlsRef, documentRef, pageLoaded, elRef, height, width) => {
  useEffect(() => {
    if (pageLoaded) {
      const resizeObserver = new ResizeObserver(entries => {
        const { height: rootHeight, width: rootWidth } = entries[0].contentRect;

        const spaceForControls = getBottomOffset(controlsRef.current) - getBottomOffset(pageRef);
        const pdfHeight = rootHeight - spaceForControls;

        documentRef.style.height = height ? measure(pdfHeight, 'px') : documentRef.style.height;
        documentRef.style.width = width ? measure(rootWidth, 'px') : 'auto';

        pageRef.firstChild.style.height = height ? measure(pdfHeight, 'px') : 'auto';
        pageRef.firstChild.style.width = width ? measure(rootWidth, 'px') : 'auto';
      });

      resizeObserver.observe(elRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [pageLoaded, width, height]);

  useEffect(() => {
    if (pageLoaded && !height) {
      const resizeObserver = new ResizeObserver(entries => {
        const { height } = entries[0].contentRect;

        documentRef.style.height = measure(height, 'px');
      });

      resizeObserver.observe(pageRef.firstChild);

      return () => resizeObserver.disconnect();
    }
  }, [pageLoaded, height]);
};
