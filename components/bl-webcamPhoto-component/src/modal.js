import { useCallback, useEffect, useRef, useState } from 'react';

import { DoneButton, MakeSnapshotButton } from './buttons/index';
import { Popup } from './popup';
import { PopupOptionsMap } from './popup/options';
import { dataURLToBlob } from './helpers/file';
import { getUserMedia, stopUserMedia } from './helpers/device';

export function Modal({ setVisibility, component, eventHandlers }) {
  const { makeSnapshotButtonLabel, doneButtonLabel } = component;
  const { onSaveImage } = eventHandlers;

  const videoRef = useRef();
  const canvasRef = useRef();
  const [isPhoto, setIsPhoto] = useState(false);
  const [popupOptions, setPopupOptions] = useState(PopupOptionsMap.noPermission);

  const handleSnapshot = useCallback(() => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 320, 240);

    setIsPhoto(true);
  }, [canvasRef.current]);

  const handleClose = useCallback(() => {
    setVisibility(false);
    stopUserMedia(videoRef);
  }, []);

  const handleDone = useCallback(() => {
    const dataURL = canvasRef.current.toDataURL();

    dataURLToBlob(dataURL)
      .then(imageBlob => {
        onSaveImage({ imageBlob });
      });

    handleClose();
  }, [canvasRef.current]);

  const handleModalClick = useCallback(event => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    getUserMedia(videoRef, setPopupOptions);
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
        <Popup options={ popupOptions }/>
      ) }
    </div>
  );
}
