import { useEffect, useRef } from 'react';

import { Html5Qrcode } from './lib/html5-qrcode.min';

import { scanImage, useScanner } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function BarcodeScanner({ component, eventHandlers, elRef, instanceId }) {
  const { display, classList, style, fullScreen } = component;

  const scannerRef = useRef(null);
  const uploadInputRef = useRef(null);

  const {
    startScan, stopScan, toggleScan, updateScanner, scannerVisibility,
  } = useScanner(scannerRef, instanceId, component, eventHandlers);

  Object.assign(component, {
    startScan    : () => startScan(),
    stopScan     : () => stopScan(),
    toggleScan   : () => toggleScan(),
    scanImageFile: () => uploadInputRef.current.click(),
  });

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-barcodeScanner', classList) } style={ style }>
      <Controls
        component={ component }
        eventHandlers={ eventHandlers }
        scannerRef={ scannerRef }
        instanceId={ instanceId }
        uploadInputRef={ uploadInputRef }
        toggleScan={ toggleScan }
      />
      <Scanner
        fullScreen={ fullScreen }
        eventHandlers={ eventHandlers }
        scannerRef={ scannerRef }
        instanceId={ instanceId }
        updateScanner={ updateScanner }
        stopScan={ stopScan }
        scannerVisibility={ scannerVisibility }
      />
    </div>
  );
}

function Controls(props) {
  const { component, uploadInputRef, instanceId, scannerRef, eventHandlers, toggleScan } = props;
  const { scanButtonVisibility, scanButtonLabel, uploadButtonVisibility, uploadButtonLabel } = component;

  const uploadImage = event => scanImage(event, scannerRef, eventHandlers);

  return (
    <div className="controls">
      { scanButtonVisibility && (
        <button type="button" className="scan-button" onClick={ toggleScan }>{ scanButtonLabel }</button>
      ) }

      { uploadButtonVisibility && (
        <label htmlFor={ `upload-input-${ instanceId }` } className="upload-button">{ uploadButtonLabel }</label>
      ) }

      <input
        type="file"
        ref={ uploadInputRef }
        id={ `upload-input-${ instanceId }` }
        name="upload-input"
        accept="image/*"
        hidden
        onChange={ uploadImage }
      />
    </div>
  );
}

function Scanner(props) {
  const {
    fullScreen, scannerRef, instanceId, updateScanner, stopScan, scannerVisibility, eventHandlers: { onScannerClick },
  } = props;

  const onClick = event => {
    event.stopPropagation();
    onScannerClick();
  };

  useEffect(() => {
    scannerRef.current = new Html5Qrcode(`scanner-${ instanceId }`);

    window.addEventListener('resize', updateScanner);

    return () => {
      scannerRef.current.clear();
      window.removeEventListener('resize', updateScanner);
    };
  }, []);

  return (
    <div
      className={ cn('container', { modal: fullScreen, hidden: !scannerVisibility }) }
      onClick={ fullScreen ? stopScan : null }>
      <div id={ `scanner-${ instanceId }` } className="scanner" onClick={ onClick }/>
    </div>
  );
}
