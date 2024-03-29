import { useEffect, useMemo, useRef, useState } from 'react';

import { DropImageArea, FooterToolbar, HeaderToolbar } from './cropper-components';
import { getImageBlob, upload, useCropperLibrary } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function CropperComponent({ component, eventHandlers, elRef }) {
  const { onSave } = eventHandlers;
  const {
    display, style, classList, imageUrl, minContainerWidth, minContainerHeight, toolbarVisibility, initialLabel,
  } = component;

  const [toolbarDisabled, setToolbarDisabled] = useState(false);
  const [image, setImage] = useState(imageUrl);

  const imageRef = useRef(null);
  const uploadInputId = useMemo(() => 'upload-input-' + BackendlessUI.UUID.short(), []);
  const uploadInputRef = useRef(null);
  const cropperRef = useCropperLibrary(component, eventHandlers, imageRef, image);

  const uploadImage = e => upload(e, setImage);

  useComponentActions(component, cropperRef, uploadInputRef, setToolbarDisabled, setImage);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  const containerDimensions = {
    minWidth : minContainerWidth,
    minHeight: minContainerHeight,
  };

  const styles = {
    display: display ? 'flex' : 'none',
    ...style,
  };

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-cropper', classList) } style={ styles }>
      <HeaderToolbar
        component={ component }
        cropperRef={ cropperRef }
        uploadInputId={ uploadInputId }
        image={ image }
        setImage={ setImage }
        onSave={ onSave }
      />

      <div className="container" style={ containerDimensions }>
        <DropImageArea
          image={ image }
          setImage={ setImage }
          initialLabel={ initialLabel }
          uploadInputId={ uploadInputId }
        />

        <img ref={ imageRef } src={ image }/>
        <input
          type="file"
          ref={ uploadInputRef }
          id={ uploadInputId }
          name="upload-input"
          accept="image/*"
          onInput={ uploadImage }
        />
      </div>

      <FooterToolbar
        cropperRef={ cropperRef }
        toolbarVisibility={ toolbarVisibility }
        image={ image }
        disabled={ toolbarDisabled }
      />
    </div>
  );
}

function useComponentActions(component, cropperRef, uploadInputRef, setToolbarDisabled, setImage) {
  Object.assign(component, {
    uploadImage           : () => uploadInputRef.current.click(),
    getCroppedImageContent: () => getImageBlob(cropperRef.current),
    removeImage           : () => setImage(''),
    crop                  : () => cropperRef.current.crop(),
    reset                 : () => cropperRef.current.reset(),
    clear                 : () => cropperRef.current.clear(),
    replace               : url => setImage(url),
    enableCropper         : () => {
      cropperRef.current.enable();
      setToolbarDisabled(false);
    },
    disableCropper        : () => {
      cropperRef.current.disable();
      setToolbarDisabled(true);
    },
    destroy               : () => cropperRef.current.destroy(),
    move                  : (offsetX, offsetY) => cropperRef.current.move(offsetX, offsetY),
    moveTo                : (x, y) => cropperRef.current.moveTo(x, y),
    zoom                  : ratio => cropperRef.current.zoom(ratio),
    zoomTo                : (ratio, x, y) => cropperRef.current.zoomTo(ratio, { x, y }),
    rotate                : degree => cropperRef.current.rotate(degree),
    rotateTo              : degree => cropperRef.current.rotateTo(degree),
    scale                 : (scaleX, scaleY) => cropperRef.current.scale(scaleX, scaleY),
    getData               : rounded => cropperRef.current.getData(rounded),
    setData               : (x, y, width, height, rotate, scaleX, scaleY) => (
      cropperRef.current.setData({ x, y, width, height, rotate, scaleX, scaleY })
    ),
    getContainerData      : () => cropperRef.current.getContainerData(),
    getImageData          : () => cropperRef.current.getImageData(),
    getCanvasData         : () => cropperRef.current.getCanvasData(),
    setCanvasData         : (left, top, width, height) => (
      cropperRef.current.setCanvasData({ left, top, width, height })
    ),
    getCropBoxData        : () => cropperRef.current.getCropBoxData(),
    setCropBoxData        : (left, top, width, height) => (
      cropperRef.current.setCropBoxData({ left, top, width, height })
    ),
    setAspectRatio        : ratio => cropperRef.current.setAspectRatio(ratio),
    setDragMode           : model => cropperRef.current.setDragMode(model),
    getCroppedCanvas      : (
      width, height, minWidth, minHeight, maxWidth, maxHeight, fillColor, imageSmoothingEnabled, imageSmoothingQuality
    ) => (
      cropperRef.current.getCroppedCanvas({
        width, height, minWidth, minHeight, maxWidth, maxHeight,
        fillColor, imageSmoothingEnabled, imageSmoothingQuality,
      })
    ),
  });
}
