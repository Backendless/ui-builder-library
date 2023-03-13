import { useEffect, useRef, useState } from 'react';

import { Document, Page } from './react-pdf.min.js';
import { Controls, NoData } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function PdfViewer({ component, eventHandlers, elRef }) {
  const { style, display, classList, pdfUrl, renderType, width, height } = component;
  const { onLoadSuccess, onLoadError } = eventHandlers;

  const [numPages, setNumPages] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [documentRef, setDocumentRef] = useState();
  const [pageRef, setPageRef] = useState();
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const inputRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    if (documentRef && controlsRef.current) {
      const spaceForControls = getBottomOffset(controlsRef.current) - getBottomOffset(documentRef);

      documentRef.style.height = `calc(${ height } - ${ spaceForControls }px)`;
      documentRef.style.width = width;
    }
  }, [documentRef, controlsRef, height, width]);

  useEffect(() => {
    if (pageRef) {
      pageRef.firstChild.style.height = height;
      pageRef.firstChild.style.width = width;
    }
  }, [pageRef, height, width]);

  useEffect(() => {
    setIsControlsVisible(false);
  }, [pdfUrl]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsControlsVisible(true);
    onLoadSuccess({ pageCount: numPages });
  };

  const onDocumentLoadError = error => {
    setIsControlsVisible(false);
    onLoadError({ message: error.message });
  };

  const onPageLoadSuccess = () => {
    const spaceForControls = getBottomOffset(controlsRef.current) - getBottomOffset(pageRef);

    pageRef.firstChild.style.height = height ? `calc(${ height } - ${ spaceForControls }px)` : 'auto';
    pageRef.firstChild.style.width = width || 'auto';

    pageRef.firstChild.style.overflow = 'auto';
  };

  const onNoData = () => {
    setIsControlsVisible(false);

    return <NoData/>;
  };

  const handlerPageChange = ({ target }) => {
    if (target.value === '') {
      setPageIndex(1);
    }

    if (Number(target.value)) {
      const page = ensureRange(target.value, { min: 1, max: numPages });

      setPageIndex(page);
    }
  };

  component.setPage = page => {
    setPageIndex(page);
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
        renderMode={ renderType }
        file={ pdfUrl }
        noData={ onNoData }
        onLoadError={ onDocumentLoadError }
        onLoadSuccess={ onDocumentLoadSuccess }>
        <Page
          inputRef={ ref => setPageRef(ref) }
          renderTextLayer={ false }
          onLoadSuccess={ onPageLoadSuccess }
          pageNumber={ pageIndex }
        />
      </Document>
      <Controls
        controlsRef={ controlsRef }
        pageIndex={ pageIndex }
        setPageIndex={ setPageIndex }
        inputRef={ inputRef }
        handlerPageChange={ handlerPageChange }
        numPages={ numPages }
        display={ isControlsVisible }
      />
    </div>
  );
}

const getBottomOffset = el => {
  const rect = el.getBoundingClientRect();

  return rect.bottom + window.scrollY;
};

const ensureRange = (v, { min, max }) => Math.max(min, Math.min(v, max));

