import { useCallback, useEffect, useRef, useState } from 'react';

import { DoneButton, MakeSnapshotButton } from './buttons';
import { Popup } from './popup';
import { dataURLToBlob } from './helpers/file';
import { getUserMedia, stopUserMedia } from './helpers/device';
import { usePopupOptions } from './helpers/usePopupOptions';

export function Modal({ setVisibility, component, eventHandlers }) {
  const { makeSnapshotButtonLabel, doneButtonLabel } = component;
  const { onSaveImage } = eventHandlers;

  const options = usePopupOptions(component);
  const videoRef = useRef();
  const canvasRef = useRef();
  const [isPhoto, setIsPhoto] = useState(false);
  const [popupOptions, setPopupOptions] = useState(options.noPermissionOptions);

  const handleSnapshot = useCallback(() => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 320, 240);

    setIsPhoto(true);
  }, [canvasRef.current]);

  const handleClose = useCallback(() => {
    if (videoRef.current.srcObject) {
      stopUserMedia(videoRef.current);
    }
    setVisibility(false);
  }, [videoRef.current]);

  const handleDone = useCallback(async () => {
    const dataURL = canvasRef.current.toDataURL();
    const imageBlob = dataURLToBlob(dataURL);

    onSaveImage({ imageBlob });

    handleClose();
  }, [canvasRef.current]);

  const handleModalClick = useCallback(event => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    getUserMedia(videoRef.current, setPopupOptions, options);
  }, []);

  return (
    <div className="modal" onClick={ handleClose }>
      <div className="modal__content" onClick={ handleModalClick }>
        <div className="modal__images">
          <video
            ref={ videoRef }
            width="320"
            height="240"
            autoPlay="autoPlay"
          />
          <canvas
            ref={ canvasRef }
            width="320"
            height="240"
          />
        </div>

        <div className="modal__button-container">
          <MakeSnapshotButton
            onClick={ handleSnapshot }
            text={ makeSnapshotButtonLabel }
            disabled={ popupOptions }
          />
          <DoneButton
            onClick={ handleDone }
            text={ doneButtonLabel }
            disabled={ !isPhoto }
          />
        </div>
      </div>

      { popupOptions && (
        <Popup options={ popupOptions } component={ component }/>
      ) }
    </div>
  );
}
