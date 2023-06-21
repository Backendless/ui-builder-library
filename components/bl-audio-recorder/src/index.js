import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import RecordRTC, { StereoAudioRecorder } from './lib';

import { captureMediaDevices, download, prepareLabel } from './helpers';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export default function AudioRecorder({ component, eventHandlers, elRef }) {
  const {
    player, controls, noise, fileName, fileType, width, startText, stopText, downloadText, pauseText, resumeText,
    labelsType, display, style, classList,
  } = component;
  const { onStart, onStop, onDownload, onStateChange } = eventHandlers;

  const audioRef = useRef();
  const recorderRef = useRef();

  const [recordedBlob, setRecordedBlob] = useState();
  const [state, setState] = useState();

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
  });

  const startRecording = useCallback(async () => {
    const audioConstrains = { audio: { echoCancelation: true, noiseSuppression: noise } };
    const stream = await captureMediaDevices(audioConstrains);
    if (stream) {
      recorderRef.current = RecordRTC(stream, {
        type: 'audio',
        mimeType: RecordFormat[fileType],
        recorderType: StereoAudioRecorder,
        desiredSampRate: 16000,
        disableLogs: true,
      });

      recorderRef.current.onStateChanged = function (state) {
        setState(state);
      };

      recorderRef.current.startRecording();
      recorderRef.current.microphone = stream;
      onStart();
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        setRecordedBlob(blob.slice(0, blob.size, RecordFormat[fileType]));
        recorderRef.current.microphone.stop();
        onStop();
      });
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
      recorderRef.current.pauseRecording();
    } else if (recorderRef.current?.state === StreamState.PAUSED) {
      recorderRef.current.resumeRecording();
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
            disabled={ state && state !== StreamState.STOPPED }
            className="control-button" onClick={ startRecording }>
            { buttonLabels.start }
          </button>
          <button
            disabled={ state !== StreamState.RECORDING && state !== StreamState.PAUSED }
            className="control-button" onClick={ toggleRecord }>
            { state === StreamState.PAUSED ? buttonLabels.resume : buttonLabels.pause }
          </button>
          <button
            disabled={ !state || state === StreamState.STOPPED }
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
  STOPPED  : 'stopped',
};

const RecordFormat = {
  'WAV' : 'audio/wav',
  'MPEG': 'audio/mpeg;',
  'WEBM': 'audio/webm',
  'OGG' : 'audio/ogg',
  'MP3' : 'audio/mp3',
};
