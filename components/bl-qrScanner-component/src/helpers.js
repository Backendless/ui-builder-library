import { useCallback, useEffect } from 'react';

import QrScanner from './lib/qr-scanner.min';

export function useQRScannerLibrary(qrScannerRef, videoElemRef, component, eventHandlers, setScannerVisibility) {
  const { highlightScanRegion, highlightCodeOutline, hideAfterScan, maxScansPerSecond, flashOn } = component;
  const { onDecodeError, onDecodeSuccess, onStartScanFailed } = eventHandlers;

  const updateFlash = useCallback(() => {
    if (!flashOn) {
      return;
    }

    qrScannerRef.current.hasFlash().then(hasFlash => {
      if (hasFlash) {
        qrScannerRef.current.turnFlashOn();
      }
    });
  }, [flashOn, qrScannerRef]);

  const updateScanner = () => {
    qrScannerRef.current.stop();
    qrScannerRef.current.start();
  };

  useEffect(() => {
    qrScannerRef.current = new QrScanner(
      videoElemRef.current,
      result => {
        const decodedQRCode = result.data;

        onDecodeSuccess({ decodedQRCode });

        if (hideAfterScan) {
          setScannerVisibility(false);
        }
      },
      {
        maxScansPerSecond   : maxScansPerSecond,
        highlightScanRegion : highlightScanRegion,
        highlightCodeOutline: highlightCodeOutline,
        onDecodeError       : error => onDecodeError({ error }),
      }
    );

    qrScannerRef.current.$canvas.getContext('2d', { willReadFrequently: true });
    qrScannerRef.current.start().then(() => updateFlash()).catch(error => onStartScanFailed({ error }));
    window.addEventListener('resize', updateScanner);

    return () => {
      qrScannerRef.current.destroy();
      window.removeEventListener('resize', updateScanner);
    };
  }, []);
}

export function useComponentActions(component, qrScannerRef, setScannerVisibility) {
  Object.assign(component, {
    startScan     : () => setScannerVisibility(true),
    stopScan      : () => setScannerVisibility(false),
    hasCamera     : () => QrScanner.hasCamera(),
    getCamerasList: () => QrScanner.listCameras(true),
    setCamera     : camera => qrScannerRef.current?.setCamera(camera),
    hasFlash      : () => qrScannerRef.current?.hasFlash(),
    turnFlashOn   : () => qrScannerRef.current?.turnFlashOn(),
    turnFlashOff  : () => qrScannerRef.current?.turnFlashOff(),
    toggleFlash   : () => qrScannerRef.current?.toggleFlash(),
  });
}

export function scanImage(event, eventHandlers) {
  event.preventDefault();

  const { onDecodeSuccess, onDecodeError } = eventHandlers;

  const file = event.target?.files[0];

  if (!file) {
    return;
  }

  QrScanner.scanImage(file, { returnDetailedScanResult: true })
    .then(({ data }) => onDecodeSuccess({ decodedQRCode: data }))
    .catch(error => onDecodeError({ error }));
}
