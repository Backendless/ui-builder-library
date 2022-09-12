import { Document, Page } from './react-pdf.min.js';
import { useState, useEffect, useRef } from 'react';
import { Controls } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

const sizeVariants = {
  'small' : { height: 385, width: 250 },
  'normal': { height: 550, width: 350 },
  'large' : { height: 630, width: 400 },
};

export default function PdfViewer({ component }) {
  const { style, display, classList, pdfUrl, renderType, size } = component;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [documentRef, setDocumentRef] = useState();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.style.width = ((inputRef.current.value.length + 1) * 9) + 'px';
  }, [`${ pageNumber }`.length]);

  useEffect(() => {
    if (documentRef) {
      documentRef.style = `height: ${ sizeVariants[size].height }px`;
    }
  }, [documentRef]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlerPageChange = ({ target }) => {
    if (target.value === '') {
      setPageNumber(1);
    }

    if (/^\d+$/.test(target.value)) {
      let page = Number(target.value);

      if (page > numPages) {
        page = numPages;
      }

      if (page < 1) {
        page = 1;
      }

      setPageNumber(page);
    }
  };

  component.goPage = (page) => {
    setPageNumber(page);
  };

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-pdfViewer', classList) }
      style={ { ...style, width: sizeVariants[size].width, minHeight: sizeVariants[size].height } }>
      <Document
        inputRef={ (ref) => setDocumentRef(ref) }
        className="pdf-viewer"
        renderMode={ renderType }
        file={ pdfUrl }
        onLoadSuccess={ onDocumentLoadSuccess }>
        <Page
          renderTextLayer={ false }
          width={ sizeVariants[size].width }
          height={ sizeVariants[size].height }
          pageNumber={ pageNumber }
        />
      </Document>
      <Controls
        pageNumber={ pageNumber }
        setPageNumber={ setPageNumber }
        inputRef={ inputRef }
        handlerPageChange={ handlerPageChange }
        numPages={ numPages }
      />
    </div>
  );
}
