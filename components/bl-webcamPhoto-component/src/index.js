import { useCallback, useMemo, useRef, useState } from 'react'

import { MakePhotoButton } from './buttons/MakePhotoButton'
import { UploadButton } from './buttons/UploadButton'
import { dataURLToBlob } from './utils/dataURLToBlob'
import { mobileAndTabletCheck } from './utils/mobileAndTabletCheck'
import { toBase64 } from './utils/toBase64'
import { Modal } from './Modal'

export default function WebcamPhoto({ component, eventHandlers }) {
  const {
    uploadButtonText,
    makePhotoButtonText,
    buttonDisabled,
  } = component
  const { onSaveImage } = eventHandlers
  
  const [modalVisibility, setModalVisibility] = useState(false)
  const inputRef = useRef()
  
  const handleClick = useCallback(() => {
    setModalVisibility(true)
  }, [modalVisibility])
  
  const handleChange = useCallback(async () => {
    const dataURL = await toBase64(inputRef.current.files[0])
    dataURLToBlob(dataURL)
      .then(imageBlob => {
        onSaveImage({ imageBlob })
      })
  }, [])
    
  const isMobile = useMemo(() => {
    return mobileAndTabletCheck()
  }, [])
  
  return (
      <div className="bl-customComponent-webcamPhoto">
        {isMobile
          ?<UploadButton 
            onChange={ handleChange }
            text={ uploadButtonText }
            reference={ inputRef }
            disabled={ buttonDisabled }
            />
          :<MakePhotoButton
            onClick={ handleClick }
            text={ makePhotoButtonText }
            disabled={ buttonDisabled }
          />
        }
        {modalVisibility && <Modal 
                              setVisibility={ setModalVisibility }
                              component={ component }
                              eventHandlers={ eventHandlers }
                            />
        }
      </div>
    )
}
