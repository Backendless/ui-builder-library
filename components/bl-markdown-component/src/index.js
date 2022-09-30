import MarkdownIt from './markdown-it.min.js';
import { useState, useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function MyCustomComponent({ component }) {
  const { classList, style, display, url, markdownText, height, width } = component;

  const [markdown, setMarkdown] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const md = new MarkdownIt();
    if (!markdownText && url) {
      setIsLoad(true);
      fetch(url)
        .then(response => response.text())
        .then((data) => {
          setIsLoad(false);
          setMarkdown(md.render(data));
        })
        .catch((error) => {
          setIsLoad(false);
          setErrorMessage(error.message);
        });
    } else if (markdownText) {
      setMarkdown(md.render(markdownText));
    } else {
      setMarkdown('<h1>No specified markdown text</h1>');
    }
  }, [markdownText, url]);

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-markdown markdown-body', classList) }
      style={ { ...style, height: height || '100%', width: width || '100%' } }>
      { isLoad && <Loader/> }

      { errorMessage && !isLoad ? (
        <span className="error-message"> { errorMessage } </span>
      ) : (
        <div className="markdown-body" dangerouslySetInnerHTML={ { __html: markdown } }/>
      ) }
    </div>
  );
}

function Loader() {
  return (
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
