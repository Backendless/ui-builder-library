import { useState } from 'react';

export default function CustomHtml({ component }) {
  const { display, customerHtml, classList } = component;

  const [customHtml, setCustomHtml] = useState(customerHtml);

  const classes = useClasses(classList);

  component.customerHtmlAction = (html) => {
    setCustomHtml(html);
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ classes } dangerouslySetInnerHTML={ { __html: customHtml } }></div>
  );
}

const useClasses = (classList) => {
  const classes = ['bl-customComponent-customHtml', ...classList];

  return classes.join(' ');
};
