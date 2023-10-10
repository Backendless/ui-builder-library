import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ysFixWebmDuration from './lib';

import { captureMediaDevices, download, prepareLabel, Timer } from './helpers';
import { RecordTimer } from './record-timer';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export default function AudioRecorder({ component, eventHandlers, elRef }) {
  const {
    player, controls, noise, fileName, width, startText, stopText, downloadText, pauseText, resumeText, clearText,
    labelsType, fileNameHasTimestamp, display, style, classList,
  } = component;
  const { onStart, onStop, onDownload, onStateChange } = eventHandlers;

  const audioRef = useRef();
  const recorderRef = useRef();

  const [recordedBlob, setRecordedBlob] = useState();
  const [state, setState] = useState();
  const [time, setTime] = useState(INITIAL_TIME);
  const [recordDate, setRecordDate] = useState();

  const timer = useMemo(() => new Timer(setTime), []);
  const isRecording = state && state !== StreamState.INACTIVE;
  const isPaused = state === StreamState.PAUSED;

  useEffect(() => () => timer.reset(), []);

  const buttonLabels = useMemo(() => prepareLabel(component),
    [labelsType, startText, stopText, downloadText, pauseText, resumeText, clearText]);

  const styles = useMemo(() => ({
    maxWidth: normalizeDimensionValue(width),
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
    clearRecord : () => clearRecord(),
  });

  const startRecording = useCallback(async () => {
    const audioConstrains = { audio: { echoCancelation: true, noiseSuppression: noise } };
    const stream = await captureMediaDevices(audioConstrains, audioRef);

    if (stream) {
      recorderRef.current = new MediaRecorder(stream, MEDIA_RECORDER_OPTIONS);

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

      recorderRef.current.onstop = async () => {
        const recordedBlob = new Blob(chunks, { type: 'audio/webm' });

        timer.reset();

        const resultBlob = await ysFixWebmDuration(recordedBlob, timer.duration, { logger: false });

        setState(StreamState.INACTIVE);
        setRecordedBlob(resultBlob);
        setRecordDate(Date.now());
        onStop();

        chunks.length = 0;
      };

      recorderRef.current.start();
      onStart();
      timer.start();
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
    download(recordedBlob, fileName, fileNameHasTimestamp, recordDate);
  }, [recordedBlob, fileName, recordDate]);

  const toggleRecord = useCallback(() => {

    if (recorderRef.current?.state === StreamState.RECORDING) {
      recorderRef.current.pause();
      timer.pause();
    } else if (recorderRef.current?.state === StreamState.PAUSED) {
      recorderRef.current.resume();
      timer.resume();
    }
  }, []);

  const clearRecord = useCallback(() => {
    audioRef.current.src = '';

    setRecordedBlob(null);
    audioRef.current.removeAttribute('src');
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-audioRecorder', classList) } style={ styles }>
      <audio ref={ audioRef } className="audio" controls={ player } controlsList="nodownload"/>
      { controls && (
        <div className="controls">
          <button
            disabled={ isRecording }
            className="control-button" onClick={ startRecording }>
            { isRecording ? <RecordTimer time={ time } paused={ isPaused }/> : buttonLabels.start }
          </button>
          <button
            disabled={ state !== StreamState.RECORDING && !isPaused }
            className="control-button" onClick={ toggleRecord }>
            { isPaused ? buttonLabels.resume : buttonLabels.pause }
          </button>
          <button
            disabled={ !state || state === StreamState.INACTIVE }
            className="control-button" onClick={ stopRecording }>
            { buttonLabels.stop }
          </button>
          <button
            disabled={ !recordedBlob }
            className="control-button" onClick={ downloadRecordedFile }>
            { buttonLabels.download }
          </button>
          <button
            disabled={ !recordedBlob }
            className="control-button" onClick={ clearRecord }>
            { buttonLabels.clear }
          </button>
        </div>
      ) }
    </div>
  );
}

export const StreamState = {
  PAUSED   : 'paused',
  RECORDING: 'recording',
  INACTIVE : 'inactive',
};

const INITIAL_TIME = '00:00';
const MEDIA_RECORDER_OPTIONS = { audioBitsPerSecond: 128000, mimeType: 'audio/webm' };
