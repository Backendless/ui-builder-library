import { useState, useMemo } from 'react';

export default function CopyButton({ component, eventHandlers }) {
  const { display, classList, isDisabled, content, copyLabel, copiedLabel, copiedDuration } = component;
  const { onCopy } = eventHandlers;

  const [isCopied, setIsCopied] = useState(false);

  const classes = useClasses(classList);
  const copyButtonClasses = useCopyButtonClasses(isCopied, isDisabled);

  component.copy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, copiedDuration);
    });
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ classes }>
      <button
        className={ copyButtonClasses }
        type="button"
        disabled={ isDisabled || isCopied }
        onClick={ onCopy }>
        { isCopied ? copiedLabel : copyLabel }
      </button>
    </div>
  );
}

const useClasses = (classList) => useMemo(() => {
  const classes = ['bl-customComponent-copyButton', ...classList];

  return classes.join(' ');
}, [classList]);

const useCopyButtonClasses = (isCopied, isDisabled) => useMemo(() => {
  const classes = ['copy-button'];

  if (isDisabled) {
    classes.push('copy-button--disabled');
  }

  if (isCopied) {
    classes.push('copy-button--copied');
  }

  return classes.join(' ');
}, [isCopied, isDisabled]);
