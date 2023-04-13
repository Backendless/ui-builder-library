import { useCallback, useEffect, useRef, useState } from 'react';

import { captureMediaDevices, download, prepareToRecord, prepareToView } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function VideoRecorder({ component, eventHandlers, elRef }) {
  const { width, height, fileName, allowAudio, display, classList, style } = component;
  const { onStart, onStop, onDownload } = eventHandlers;

  const videoRef = useRef();
  const recorder = useRef();
  const [recordedBlob, setRecordedBlob] = useState();

  Object.assign(component, {
    start       : () => startRecording(),
    stop        : () => stopRecording(),
    downloadFile: () => downloadRecordedFile(),
    getBlob     : () => recordedBlob,
  });

  const startRecording = useCallback(async () => {
    onStart();
    prepareToRecord(videoRef.current);

    const stream = await captureMediaDevices({ video: true, audio: allowAudio }, videoRef);

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
        const recordedBlob = new Blob(chunks, { type: 'video/webm' });

        setRecordedBlob(recordedBlob);
        onStop();
        prepareToView(videoRef.current);
        chunks.length = 0;
      };

      recorder.current.start(200);
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
    download(recordedBlob, fileName);
  }, [recordedBlob, fileName]);

  useEffect(() => {
    if (recordedBlob && videoRef.current) {
      videoRef.current.src = URL.createObjectURL(recordedBlob);
    }
  }, [recordedBlob]);

  useEffect(() => {
    if (display) {
      videoRef.current.width = width;
      videoRef.current.height = height;
    }
  }, [width, height, display]);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-videoRecorder', classList) } style={ style }>
      <video ref={ videoRef } className="video"/>
    </div>
  );
}
