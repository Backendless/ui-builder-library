import { useCallback, useMemo, useRef, useState } from 'react';

import { MakePhotoButton, UploadButton } from './buttons/index';
import { dataURLToBlob, toBase64 } from './utils/file';
import { mobileAndTabletCheck } from './utils/device';
import { Modal } from './modal';

export default function WebcamPhoto({ component, eventHandlers }) {
  const { uploadButtonLabel, makePhotoButtonLabel, buttonDisabled } = component;
  const { onSaveImage } = eventHandlers;

  const [modalVisibility, setModalVisibility] = useState(false);
  const inputRef = useRef();

  const handleClick = useCallback(() => {
    setModalVisibility(true);
  }, [modalVisibility]);

  const handleChange = useCallback(async () => {
    try {
      const dataURL = await toBase64(inputRef.current.files[0]);

      dataURLToBlob(dataURL)
        .then(imageBlob => {
          onSaveImage({ imageBlob });
        });
    } catch (error) {
      console.log(`Error: ${ error.name }. Message: ${ error.message }`);
    }
  }, []);

  const checkMobile = useMemo(() => {
    return mobileAndTabletCheck();
  }, []);

  return (
    <div className="bl-customComponent-webcamPhoto">
      { checkMobile
        ? <UploadButton
          onChange={ handleChange }
          text={ uploadButtonLabel }
          reference={ inputRef }
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
