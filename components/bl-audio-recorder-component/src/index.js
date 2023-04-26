import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { captureMediaDevices, download } from './helpers';
import { TYPES } from './types';

const { cn } = BackendlessUI.CSSUtils;

export default function AudioRecorder({ component, eventHandlers, elRef }) {

  const { player, controls, noise, fileName, fileType, display, style, classList } = component;
  const { onStart, onStop, onDownload, onState } = eventHandlers;

  const audioRef = useRef();
  const recorder = useRef();
  const startRef = useRef();
  const stopRef = useRef();
  const pauseRef = useRef();
  const downloadRef = useRef();

  const [recordedBlob, setRecordedBlob] = useState();
  const [state, setState] = useState();

  const determinedType = useMemo(() => TYPES.get(fileType), [fileType]);

  useEffect(() => {
    stopRef.current.disabled = true;
    pauseRef.current.disabled = true;
    downloadRef.current.disabled = true;
  }, []);

  useEffect(() => {
    if (recordedBlob && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(recordedBlob);
      downloadRef.current.disabled = false;
    }
  }, [recordedBlob]);

  useEffect(() => {
    if (state) {
      onState({ state });
    }
  }, [state]);

  Object.assign(component, {
    start: () => startRecording(),
    stop: () => stopRecording(),
    downloadFile: () => downloadRecordedFile(),
    getBlob: () => recordedBlob,
  });

  const startRecording = useCallback(async () => {
    onStart();

    const audioConstrains = { audio: { echoCancelation: true, noiseSuppression: noise } };
    const stream = await captureMediaDevices(audioConstrains, audioRef);

    stopRef.current.disabled = false;
    pauseRef.current.disabled = false;
    startRef.current.disabled = true;

    if (stream) {
      recorder.current = new MediaRecorder(stream);

      const chunks = [];

      recorder.current.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.current.onstart = () => {
        setState(recorder.current.state);
      };

      recorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: determinedType.blobType });

        setState(recorder.current.state);
        setRecordedBlob(recordedBlob);
        onStop();

        startRef.current.disabled = false;
        stopRef.current.disabled = true;
        pauseRef.current.disabled = true;

        chunks.length = 0;
      };

      recorder.current.onpause = () => {
        setState(recorder.current.state);
      };

      recorder.current.onresume = () => {
        setState(recorder.current.state);
      };

      recorder.current.start();
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      recorder.current.stream.getTracks().forEach(track => track.stop());
    } catch (e) {
      console.error('Stream did not found.', e);
    }
  }, [recorder.current]);

  const downloadRecordedFile = useCallback(() => {
    onDownload({ blob: recordedBlob });
    download(recordedBlob, fileName, determinedType);
  }, [recordedBlob, fileName, determinedType]);

  const toggleRecord = useCallback(() => {
    if (recorder.current?.state === 'recording') {
      recorder.current.pause();
      pauseRef.current.textContent = 'Resume';
    } else if (recorder.current?.state === 'paused') {
      recorder.current.resume();
      pauseRef.current.textContent = 'Pause';
    }
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-audioRecorder', classList) } style={ style }>
      <audio ref={ audioRef } className="audio" controls={ player }/>
      { controls && (
        <div className="controls">
          <button ref={ startRef } className="control-button" onClick={ startRecording }>Start Record</button>
          <button ref={ stopRef } className="control-button" onClick={ stopRecording }>Stop Record</button>
          <button ref={ downloadRef } className="control-button" onClick={ downloadRecordedFile }>Download Recorded
          </button>
          <button ref={ pauseRef } className="control-button" onClick={ toggleRecord }>Pause</button>
        </div>
      ) }
    </div>
  );
}
