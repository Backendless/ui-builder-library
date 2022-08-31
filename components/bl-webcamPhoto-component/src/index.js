import { useCallback, useRef, useState } from 'react';

import { MakePhotoButton, UploadButton } from './buttons';
import { dataURLToBlob, toBase64 } from './helpers/file';
import { checkMobile } from './helpers/device';
import { Modal } from './modal';

const isMobile = checkMobile();

export default function WebcamPhoto({ component, eventHandlers }) {
  const { uploadButtonLabel, makePhotoButtonLabel, buttonDisabled, style } = component;
  const { onSaveImage } = eventHandlers;

  const [modalVisibility, setModalVisibility] = useState(false);
  const fileInputRef = useRef();

  const handleClick = useCallback(() => {
    setModalVisibility(true);
  }, []);

  const handleChange = useCallback(async () => {
    try {
      const dataURL = await toBase64(fileInputRef.current.files[0]);
      const imageBlob = dataURLToBlob(dataURL);

      onSaveImage({ imageBlob });
    } catch (error) {
      console.error(`Webcam Photo: ${ error.message }`);
    }
  }, []);

  return (
    <div className="bl-customComponent-webcamPhoto" style={ style }>
      { isMobile
        ? <UploadButton
          onChange={ handleChange }
          text={ uploadButtonLabel }
          inputRef={ fileInputRef }
          disabled={ buttonDisabled }
        />
        : <MakePhotoButton
          onClick={ handleClick }
          text={ makePhotoButtonLabel }
          disabled={ buttonDisabled }
        />
      }

      { modalVisibility && (
        <Modal
          setVisibility={ setModalVisibility }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      ) }
    </div>
  );
}
