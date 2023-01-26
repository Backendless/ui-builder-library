import { useEffect, useMemo, useState } from 'react';

import MarkdownIt from './markdown-it.min.js';

const { cn } = BackendlessUI.CSSUtils;

const NO_MARKDOWN = '<h1>No specified markdown text</h1>';

export default function Markdown({ component }) {
  const { classList, style, display, url, text, height, width } = component;

  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const md = useMemo(() => new MarkdownIt(), []);

  component.setUrl = url => fetchContent(url);
  component.setContent = text => setContent(text);

  useEffect(() => fetchContent(url), [url]);
  useEffect(() => setContent(text), [text]);

  const fetchContent = url => {
    setIsLoading(true);
    setErrorMessage('');

    fetch(url)
      .then(response => response.text())
      .then(data => setContent(data))
      .catch(error => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  };

  const setContent = text => setMarkdown(md.render(text));

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-markdown markdown-body', classList) }
      style={ { ...style, height: height || '100%', width: width || '100%' } }>
      <MdContent isLoading={ isLoading } errorMessage={ errorMessage } markdown={ markdown || NO_MARKDOWN }/>
    </div>
  );
}

function MdContent({ isLoading, errorMessage, markdown }) {
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
