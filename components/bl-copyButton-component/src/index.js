import { useState, useMemo } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function CopyButton({ component, eventHandlers }) {
  const { display, classList, isDisabled, content, copyLabel, copiedLabel, copiedDuration } = component;
  const { onCopy } = eventHandlers;

  const [isCopied, setIsCopied] = useState(false);

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
    <div className={ cn('bl-customComponent-copyButton', classList) }>
      <button
        className={ cn('copy-button', { 'copy-button--disabled': isDisabled, 'copy-button--copied': isCopied }) }
        type="button"
        disabled={ isDisabled || isCopied }
        onClick={ onCopy }>
        { isCopied ? copiedLabel : copyLabel }
      </button>
    </div>
  );
}
