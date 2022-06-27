import { useCallback, useMemo, useRef, useState } from 'react';
import { MakePhotoButton } from './buttons/make-photo';
import { UploadButton } from './buttons/upload';
import { dataURLToBlob } from './utils/data-url-to-blob';
import { mobileAndTabletCheck } from './utils/mobile-and-tablet-check';
import { toBase64 } from './utils/to-base64';
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
    const dataURL = await toBase64(inputRef.current.files[0]);
    dataURLToBlob(dataURL)
      .then(imageBlob => {
        onSaveImage({ imageBlob });
      });
  }, []);

  const isMobile = useMemo(() => {
    return mobileAndTabletCheck();
  }, []);

  return (
    <div className="bl-customComponent-webcamPhoto">
      { isMobile
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
      {
        modalVisibility && <Modal
          setVisibility={ setModalVisibility }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      }
    </div>
  );
}
