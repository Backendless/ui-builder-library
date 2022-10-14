import { useEffect, useMemo, useState } from 'react';

import MarkdownIt from './markdown-it.min.js';

const { cn } = BackendlessUI.CSSUtils;

export default function MyCustomComponent({ component }) {
  const { classList, style, display, url, markdownText, height, width } = component;

  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mdUrl = useMemo(() => url, [url]);

  const md = useMemo(() => new MarkdownIt(), []);

  component.setUrl = (url) => {
    loadMd(url);
  };

  component.setContent = (text) => {
    loadMd(mdUrl, text);
  };

  useEffect(() => {
    loadMd(mdUrl, markdownText);
  }, [markdownText, mdUrl]);

  const loadMd = (url, text) => {
    if (!text && url) {
      setIsLoading(true);

      fetch(url)
        .then(response => response.text())
        .then((data) => {
          setMarkdown(md.render(data));
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setIsLoading(false);
        });
    } else if (text) {
      setMarkdown(md.render(text));
    } else {
      setMarkdown('<h1>No specified markdown text</h1>');
    }
  };

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-markdown markdown-body', classList) }
      style={ { ...style, height: height || '100%', width: width || '100%' } }>
      <MdComponent isLoading={ isLoading } errorMessage={ errorMessage } markdown={ markdown }/>
    </div>
  );
}

function MdComponent({ isLoading, errorMessage, markdown }) {
  if (isLoading) {
    return <Loader/>;
  }

  if (errorMessage) {
    return <span className="error-message"> { errorMessage } </span>;
  }

  return <div className="markdown-body" dangerouslySetInnerHTML={ { __html: markdown } }/>;
}

function Loader() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
