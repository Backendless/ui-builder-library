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
  }, [documentRef]);

  useEffect(() => {
    if (pageLoaded) {
      setRootHeight(elRef.current.getBoundingClientRect().height);
      setRootWidth(elRef.current.getBoundingClientRect().width);
    }
  }, [pageLoaded]);

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
    pageRef.firstChild.style.overflow = 'auto';
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
      <Document
        inputRef={ ref => setDocumentRef(ref) }
        className="pdf-viewer"
        renderMode="canvas"
        file={ pdfUrl }
        noData={ onNoData }
        loading={ onDocumentLoading }
        onLoadError={ onDocumentLoadError }
        onLoadSuccess={ onDocumentLoadSuccess }>
        <Page
          inputRef={ ref => setPageRef(ref) }
          renderTextLayer={ false }
          renderAnnotationLayer={ false }
          renderForms={ false }
          loading={ onPageLoading }
          onLoadSuccess={ onPageLoadSuccess }
          pageNumber={ currentPage }
        />
      </Document>
      { pageLoaded && (
        <Controls
          controlsRef={ controlsRef }
          currentPage={ currentPage }
          setCurrentPage={ setCurrentPage }
          pageCount={ pageCount }
        />
      ) }
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
