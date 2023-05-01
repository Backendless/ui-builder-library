import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { captureMediaDevices, download } from './helpers';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export default function AudioRecorder({ component, eventHandlers, elRef }) {
  const { player, controls, noise, fileName, fileType, width, display, style, classList } = component;
  const { onStart, onStop, onDownload, onState } = eventHandlers;
  const { paused, recording, inactive } = STREAM_STATES;

  const audioRef = useRef();
  const recorderRef = useRef();

  const [recordedBlob, setRecordedBlob] = useState();
  const [state, setState] = useState();

  const styles = useMemo(() => ({
    width: normalizeDimensionValue(width),
    ...style,
  }), [style]);

  useEffect(() => {
    if (recordedBlob && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(recordedBlob);
    }
  }, [recordedBlob]);

  useEffect(() => {
    if (state) {
      onState({ state });
    }
  }, [state]);

  Object.assign(component, {
    start       : () => startRecording(),
    stop        : () => stopRecording(),
    downloadFile: () => downloadRecordedFile(),
    getBlob     : () => recordedBlob,
    pause       : () => toggleRecord(),
  });

  const startRecording = useCallback(async () => {
    const audioConstrains = { audio: { echoCancelation: true, noiseSuppression: noise } };
    const stream = await captureMediaDevices(audioConstrains, audioRef);

    if (stream) {
      recorderRef.current = new MediaRecorder(stream);

      const chunks = [];

      recorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorderRef.current.onstart = () => {
        setState(recorderRef.current.state);
      };

      recorderRef.current.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: TYPES[fileType] });

        setState(recorderRef.current.state);
        setRecordedBlob(recordedBlob);
        onStop();

        chunks.length = 0;
      };

      recorderRef.current.onpause = () => {
        setState(recorderRef.current.state);
      };

      recorderRef.current.onresume = () => {
        setState(recorderRef.current.state);
      };

      recorderRef.current.start();
      onStart();
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      recorderRef.current.stream.getTracks().forEach(track => track.stop());
    } catch (e) {
      console.error('Stream did not found.', e);
    }
  }, [recorderRef.current]);

  const downloadRecordedFile = useCallback(() => {
    onDownload({ blob: recordedBlob });
    download(recordedBlob, fileName, fileType);
  }, [recordedBlob, fileName, fileType]);

  const toggleRecord = useCallback(() => {
    if (recorderRef.current?.state === recording) {
      recorderRef.current.pause();
    } else if (recorderRef.current?.state === paused) {
      recorderRef.current.resume();
    }
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-audioRecorder', classList) } style={ styles }>
      <audio ref={ audioRef } className="audio" controls={ player }/>
      { controls && (
        <div className="controls">
          <button
            disabled={ state && state !== inactive }
            className="control-button" onClick={ startRecording }>
            Start Record
          </button>
          <button
            disabled={ !state || state === inactive }
            className="control-button" onClick={ stopRecording }>
            Stop Record
          </button>
          <button
            disabled={ !recordedBlob }
            className="control-button" onClick={ downloadRecordedFile }>
            Download Recorded
          </button>
          <button
            disabled={ state !== recording && state !== paused }
            className="control-button" onClick={ toggleRecord }>
            { state === paused ? 'Resume' : 'Pause' }
          </button>
        </div>
      ) }
    </div>
  );
}

const STREAM_STATES = {
  paused   : 'paused',
  recording: 'recording',
  inactive : 'inactive',
};

const TYPES = {
  'wav' : 'audio/wav; codecs="1"',
  'mpeg': 'audio/mpeg;',
  'mp4' : 'audio/mp4; codecs="mp4a.40.2"',
  'webm': 'audio/webm; codecs="vorbis"',
  'ogg' : 'audio/ogg; codecs="opus"',
};
