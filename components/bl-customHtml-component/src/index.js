import { useState } from 'react';

export default function CustomHtml({ component }) {
  const { display, html, classList, style } = component;

  const [rawHtml, setRawHtml] = useState(html);

  const classes = useClasses(classList);

  component.setHtml = (html) => {
    setRawHtml(html);
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ classes } dangerouslySetInnerHTML={ { __html: rawHtml } } style={ style }></div>
  );
}

const useClasses = (classList) => {
  const classes = ['bl-customComponent-customHtml', ...classList];

  return classes.join(' ');
};
