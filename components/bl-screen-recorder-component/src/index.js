import { useCallback, useEffect, useRef, useState } from 'react';

import { captureMediaDevices, download, ensureMeasure, prepareToRecord, prepareToView } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function ScreenRecorder({ component, eventHandlers, elRef }) {
  const {
    width, height, allowAudio, controls, fileName, fileType,
    startText, stopText, downloadText, display, classList, style,
  } = component;
  const { onStart, onStop, onDownload } = eventHandlers;

  const videoRef = useRef();
  const recorder = useRef();
  const startRef = useRef();
  const stopRef = useRef();
  const downloadRef = useRef();
  const [recordedBlob, setRecordedBlob] = useState();

  Object.assign(component, {
    start       : () => startRecording(),
    stop        : () => stopRecording(),
    downloadFile: () => downloadRecordedFile(),
    getBlob     : () => recordedBlob,
  });

  const startRecording = useCallback(async () => {
    onStart();

    const stream = await captureMediaDevices({ video: true, audio: allowAudio }, videoRef);

    prepareToRecord(videoRef.current, startRef.current, stopRef.current);

    if (stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      videoRef.current.autoplay = true;

      recorder.current = new MediaRecorder(stream);
      const chunks = [];

      recorder.current.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: `video/${ fileType }` });

        setRecordedBlob(recordedBlob);
        onStop();
        prepareToView(videoRef.current, startRef.current, stopRef.current, downloadRef.current);
        chunks.length = 0;
      };

      recorder.current.start();
    }
  }, [videoRef]);

  const stopRecording = useCallback(async () => {
    try {
      recorder.current.stream.getTracks().forEach(track => track.stop());
    } catch (e) {
      console.error('Stream did not found.', e);
    }
  }, [recorder.current]);

  const downloadRecordedFile = useCallback(() => {
    onDownload({ blob: recordedBlob });
    download(recordedBlob, fileName, fileType);
  }, [recordedBlob, fileName, fileType]);

  useEffect(() => {
    if (recordedBlob && videoRef.current) {
      videoRef.current.src = URL.createObjectURL(recordedBlob);
    }
  }, [recordedBlob]);

  useEffect(() => {
    if (display) {
      elRef.current.style.width = ensureMeasure(width);
      videoRef.current.style.height = ensureMeasure(height);

      if (stopRef.current && downloadRef.current) {
        stopRef.current.disabled = true;
        downloadRef.current.disabled = true;
      }
    }
  }, [width, height, display]);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-screenRecorder', classList) } style={ style }>
      <video ref={ videoRef } className="video"/>
      { controls && (
        <div className="controls">
          <button ref={ startRef } className="control-button" onClick={ startRecording }>{ startText }</button>
          <button ref={ stopRef } className="control-button" onClick={ stopRecording }>{ stopText }</button>
          <button ref={ downloadRef } className="control-button"
                  onClick={ downloadRecordedFile }>{ downloadText }</button>
        </div>
      ) }
    </div>
  );
}


