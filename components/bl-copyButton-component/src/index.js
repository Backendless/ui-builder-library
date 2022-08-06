import { useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function CopyButton({ component, eventHandlers }) {
  const {
    display,
    classList,
    disabled,
    content,
    copyLabel,
    copiedLabel,
    copiedDuration,
    isCopiedIconVisible,
    isCopyIconVisible
  } = component;
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

  const label = isCopied
    ? <CopiedLabel isCopiedIcon={ isCopiedIconVisible } copiedLabel={ copiedLabel }/>
    : <CopyLabel isCopyIcon={ isCopyIconVisible } copyLabel={ copyLabel }/>;

  return (
    <button
      className={ cn('bl-customComponent-copyButton', classList, { 'disabled': disabled, 'copied': isCopied }) }
      type="button"
      disabled={ disabled || isCopied }
      onClick={ onCopy }>
      { label }
    </button>
  );
}

function CopyLabel({ isCopyIcon, copyLabel }) {
  return (
    <>
      { isCopyIcon && (
        <svg className="icon" viewBox="0 0 448 512">
          <path
            d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"/>
        </svg>
      ) }
      { copyLabel }
    </>
  );
}

function CopiedLabel({ isCopiedIcon, copiedLabel }) {
  return (
    <>
      { isCopiedIcon && (
        <svg className="icon" viewBox="0 0 448 512">
          <path
            d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/>
        </svg>
      ) }
      { copiedLabel }
    </>
  );
}
