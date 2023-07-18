import { useCallback, useMemo, useState } from 'react';

const AspectRatioMap = {
  FULL_SCREEN: 1.777778,
  STANDARD   : 1.333334,
  SQUARE     : 1.0,
};

const ENVIRONMENT_FACING_MODE = 'environment';

export function useScanner(scannerRef, instanceId, component, eventHandlers) {
  const { fps, width, height, hideAfterScan, aspectRatio } = component;
  const { onDecodeSuccess, onDecodeError, onStartScanFailed } = eventHandlers;

  const [scannerVisibility, setScannerVisibility] = useState(false);

  const options = useMemo(() => (
    { fps, qrbox: { width, height }, aspectRatio: AspectRatioMap[aspectRatio] }
  ), [aspectRatio, fps, height, width]);

  const stopScan = useCallback(() => {
    if (!scannerRef.current?.isScanning) {
      return;
    }

    scannerRef.current.stop()
      .then(() => {
        setScannerVisibility(false);
        scannerRef.current.clear();
      })
      .catch(error => console.error(error.message));
  }, [scannerRef]);

  const startScan = useCallback(() => {
    if (!scannerRef.current) {
      return;
    }

    const onScanFailed = error => onDecodeError({ error });
    const onScanSuccess = decodedCode => {
      onDecodeSuccess({ decodedCode });

      if (hideAfterScan) {
        stopScan();
      }
    };

    setScannerVisibility(true);

    scannerRef.current
      .start({ facingMode: ENVIRONMENT_FACING_MODE }, options, onScanSuccess, onScanFailed)
      .catch(error => onStartScanFailed({ error }));
  }, [hideAfterScan, onDecodeError, onDecodeSuccess, onStartScanFailed, options, scannerRef, stopScan]);

  const toggleScan = scannerVisibility ? stopScan : startScan;
  const updateScanner = () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop()
        .then(() => startScan());
    }
  };

  return { startScan, stopScan, toggleScan, updateScanner, scannerVisibility };
}

export function scanImage(event, scannerRef, eventHandlers) {
  event.preventDefault();

  const { onDecodeSuccess, onDecodeError } = eventHandlers;

  const imageFile = event.target?.files[0];

  if (!imageFile) {
    return;
  }

  scannerRef.current.scanFile(imageFile)
    .then(decodedCode => {
      onDecodeSuccess({ decodedCode });
      scannerRef.current.clear();
    })
    .catch(error => onDecodeError({ error }));

  event.target.value = ''; // needed to reset the image after scanning
}
