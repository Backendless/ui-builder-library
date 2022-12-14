import { useRef, useState } from 'react';

import { scanImage, useComponentActions, useQRScannerLibrary } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function QrScannerComponent({ component, eventHandlers }) {
  const { display, classList, style, direction } = component;

  const [scannerVisibility, setScannerVisibility] = useState(false);
  const qrScannerRef = useRef(null);

  const styles = { flexDirection: direction, ...style };

  useComponentActions(component, qrScannerRef, setScannerVisibility);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-qrScanner', classList) } style={ styles }>
      <ScanButton component={ component } setScannerVisibility={ setScannerVisibility }/>
      <UploadButton component={ component } eventHandlers={ eventHandlers }/>

      { scannerVisibility && (
        <Scanner
          qrScannerRef={ qrScannerRef }
          setScannerVisibility={ setScannerVisibility }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      ) }
    </div>
  );
}

function UploadButton({ component, eventHandlers }) {
  const { uploadButtonVisibility, uploadButtonLabel } = component;

  const onChange = event => scanImage(event, eventHandlers);

  if (!uploadButtonVisibility) {
    return null;
  }

  return (
    <label className="upload-button">
      <span>{ uploadButtonLabel }</span>
      <input type="file" onChange={ onChange }/>
    </label>
  );
}

function ScanButton({ component, setScannerVisibility }) {
  const { scanButtonVisibility, scanButtonLabel } = component;

  const openScanner = () => setScannerVisibility(true);

  if (!scanButtonVisibility) {
    return null;
  }

  return (
    <button type="button" className="scan-button" onClick={ openScanner }>{ scanButtonLabel }</button>
  );
}

function Scanner({ component, eventHandlers, qrScannerRef, setScannerVisibility }) {
  const { onScannerClick } = eventHandlers;

  const videoElemRef = useRef(null);

  useQRScannerLibrary(qrScannerRef, videoElemRef, component, eventHandlers, setScannerVisibility);

  return (
    <div className="modal">
      <video ref={ videoElemRef } onClick={ onScannerClick }></video>
      <div className="modal-backdrop" onClick={ () => setScannerVisibility(false) }></div>
    </div>
  );
}
