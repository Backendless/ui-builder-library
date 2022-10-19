import { useEffect, useMemo, useState } from 'react';

import MarkdownIt from './markdown-it.min.js';

const { cn } = BackendlessUI.CSSUtils;

export default function Markdown({ component }) {
  const { classList, style, display, url, markdownText, height, width } = component;

  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const md = useMemo(() => new MarkdownIt(), []);

  component.setUrl = (url) => {
    setContent(url);
  };

  component.setContent = (text) => {
    setContent(url, text);
  };

  useEffect(() => {
    setContent(url, markdownText);
  }, [markdownText, url]);

  const setContent = (url, text) => {
    if (!text && url) {
      setIsLoading(true);

      fetchContent(url)
        .then((data) => {
          setMarkdown(md.render(data));
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
        .finally(() => setIsLoading(false));
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
      <MdContent isLoading={ isLoading } errorMessage={ errorMessage } markdown={ markdown }/>
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

const fetchContent = async (url) => {
  const response = await fetch(url);

  return await response.text();
};
