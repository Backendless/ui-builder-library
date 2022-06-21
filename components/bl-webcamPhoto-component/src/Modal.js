import { useCallback, useEffect, useRef, useState } from 'react'
import { DoneButton } from './buttons/DoneButton'
import { MakeSnapshotButton } from './buttons/MakeSnapshotButton'
import { dataURLToBlob } from './utils/dataURLToBlob'
import { getUserMedia } from './utils/getUserMedia'
import { stopUserMedia } from './utils/stopUserMedia'

export function Modal({
                        setVisibility,
                        component,
                        eventHandlers,
                      }){
  const { makeSnapshotButtonText, doneButtonText } = component
  const { onSaveImage } = eventHandlers
  const videoRef = useRef()
  const canvasRef = useRef()
  const [isPhoto, setIsPhoto]=useState(false)
  
  const handleSnapshot = useCallback(() => {
    const context = canvasRef.current.getContext('2d')
    context.drawImage(videoRef.current, 0, 0, 320, 240)
    setIsPhoto(true)
  }, [canvasRef])
  const handleClose = useCallback(() => {
    setVisibility(false)
    stopUserMedia(videoRef)
  }, [])
  const handleDone = useCallback(() => {
    const dataURL = canvasRef.current.toDataURL()
    dataURLToBlob(dataURL)
      .then(imageBlob => {
        onSaveImage({ imageBlob })
      })
    handleClose()
  }, [])
  const handleModalClick = useCallback(event => {
    event.stopPropagation()
  }, [])
  
  useEffect(() => {
    getUserMedia(videoRef, handleClose)
  }, [])
  
  return (
    <div className="modal" onClick={ handleClose }>
        <div className="modal__content" onClick={ handleModalClick }>
            <div className="modal__images">
              <video 
                ref={ videoRef } 
                autoplay="autoplay"
                width="320"
                height="240"
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
                text={ makeSnapshotButtonText }
                />
              <DoneButton
                onClick={ handleDone }
                text={ doneButtonText }
                disabled={ !isPhoto }
              />
            </div>
        </div>
    </div>
    )
}
