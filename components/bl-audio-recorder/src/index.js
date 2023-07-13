import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { captureMediaDevices, download, prepareLabel } from './helpers';
import ysFixWebmDuration from './lib';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export default function AudioRecorder({ component, eventHandlers, elRef }) {
  const {
    player, controls, noise, fileName, width, startText, stopText, downloadText, pauseText, resumeText,
    labelsType, fileNameHasTimestamp, display, style, classList,
  } = component;
  const { onStart, onStop, onDownload, onStateChange } = eventHandlers;

  const audioRef = useRef();
  const recorderRef = useRef();
  const startTime = useRef();

  const [recordedBlob, setRecordedBlob] = useState();
  const [state, setState] = useState();
  const [recordDate, setRecordDate] = useState();

  const buttonLabels = useMemo(() => prepareLabel(component),
    [labelsType, startText, stopText, downloadText, pauseText, resumeText]);

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
    getUrl      : () => URL.createObjectURL(recordedBlob),
  });

  const startRecording = useCallback(async () => {
    startTime.current = Date.now();
    const audioConstrains = { audio: { echoCancelation: true, noiseSuppression: noise } };
    const stream = await captureMediaDevices(audioConstrains, audioRef);
    const options = {
      audioBitsPerSecond: 128000,
      mimeType          : 'audio/webm',
    };

    if (stream) {
      recorderRef.current = new MediaRecorder(stream, options);

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
        const durattion = Date.now() - startTime.current;
        const resultBlob = await ysFixWebmDuration(recordedBlob, durattion, { logger: false });

        setState(StreamState.INACTIVE);
        setRecordedBlob(resultBlob);
        setRecordDate(Date.now());
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
    download(recordedBlob, fileName, fileNameHasTimestamp, recordDate);
  }, [recordedBlob, fileName, recordDate]);

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
      <audio ref={ audioRef } className="audio" controls={ player } controlsList="nodownload"/>
      { controls && (
        <div className="controls">
          <button
            disabled={ state && state !== StreamState.INACTIVE }
            className="control-button" onClick={ startRecording }>
            { buttonLabels.start }
          </button>
          <button
            disabled={ state !== StreamState.RECORDING && state !== StreamState.PAUSED }
            className="control-button" onClick={ toggleRecord }>
            { state === StreamState.PAUSED ? buttonLabels.resume : buttonLabels.pause }
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
