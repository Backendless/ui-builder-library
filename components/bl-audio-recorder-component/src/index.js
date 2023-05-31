import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { captureMediaDevices, download } from './helpers';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export default function AudioRecorder({ component, eventHandlers, elRef }) {
  const {
    player, controls, noise, fileName, fileType, width, startText, stopText, downloadText, pauseText, resumeText,
    display, style, classList,
  } = component;
  const { onStart, onStop, onDownload, onStateChange } = eventHandlers;

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
      onStateChange({ state });
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

      Object.assign(recorderRef.current, {
        onstart : () => setState(StreamState.RECORDING),
        onpause : () => setState(StreamState.PAUSED),
        onresume: () => setState(StreamState.RECORDING),
      });

      recorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorderRef.current.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: RecordFormat[fileType] });

        setState(StreamState.INACTIVE);
        setRecordedBlob(recordedBlob);
        onStop();

        chunks.length = 0;
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
    if (recorderRef.current?.state === StreamState.RECORDING) {
      recorderRef.current.pause();
    } else if (recorderRef.current?.state === StreamState.PAUSED) {
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
            disabled={ state && state !== StreamState.INACTIVE }
            className="control-button" onClick={ startRecording }>
            { startText }
          </button>
          <button
            disabled={ state !== StreamState.RECORDING && state !== StreamState.PAUSED }
            className="control-button" onClick={ toggleRecord }>
            { state === StreamState.PAUSED ? resumeText : pauseText }
          </button>
          <button
            disabled={ !state || state === StreamState.INACTIVE }
            className="control-button" onClick={ stopRecording }>
            { stopText }
          </button>
          <button
            disabled={ !recordedBlob }
            className="control-button" onClick={ downloadRecordedFile }>
            { downloadText }
          </button>
        </div>
      ) }
    </div>
  );
}

const StreamState = {
  PAUSED   : 'paused',
  RECORDING: 'recording',
  INACTIVE : 'inactive',
};

const RecordFormat = {
  'WAV' : 'audio/wav; codecs="1"',
  'MPEG': 'audio/mpeg;',
  'MP4' : 'audio/mp4; codecs="mp4a.40.2"',
  'WEBM': 'audio/webm; codecs="vorbis"',
  'OGG' : 'audio/ogg; codecs="opus"',
};
