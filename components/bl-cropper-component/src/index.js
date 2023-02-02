import { useEffect, useRef, useState } from 'react';

import { DropImageArea, FooterToolbar, HeaderToolbar } from './cropper-components';
import { useCropperLibrary } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function CropperComponent({ component, eventHandlers, elRef }) {
  const {
    display, style, classList, imageUrl, minContainerWidth, minContainerHeight, toolbarVisibility, initialLabel,
  } = component;
  const { onSave } = eventHandlers;

  const [image, setImage] = useState(imageUrl);
  const imageRef = useRef(null);
  const cropperRef = useCropperLibrary(component, eventHandlers, imageRef, image);

  useComponentActions(component, cropperRef);

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
        image={ image }
        setImage={ setImage }
        onSave={ onSave }
      />

      <div className="container" style={ containerDimensions }>
        <DropImageArea image={ image } setImage={ setImage } initialLabel={ initialLabel }/>

        <img ref={ imageRef } src={ image }/>
      </div>

      <FooterToolbar cropperRef={ cropperRef } toolbarVisibility={ toolbarVisibility } image={ image }/>
    </div>
  );
}

function useComponentActions(component, cropperRef) {
  Object.assign(component, {
    crop            : () => cropperRef.current.crop(),
    reset           : () => cropperRef.current.reset(),
    clear           : () => cropperRef.current.clear(),
    replace         : url => cropperRef.current.replace(url),
    enableCropper   : () => cropperRef.current.enable(),
    disableCropper  : () => cropperRef.current.disable(),
    destroy         : () => cropperRef.current.destroy(),
    move            : (offsetX, offsetY) => cropperRef.current.move(offsetX, offsetY),
    moveTo          : (x, y) => cropperRef.current.moveTo(x, y),
    zoom            : ratio => cropperRef.current.zoom(ratio),
    zoomTo          : (ratio, x, y) => cropperRef.current.zoomTo(ratio, { x, y }),
    rotate          : degree => cropperRef.current.rotate(degree),
    rotateTo        : degree => cropperRef.current.rotateTo(degree),
    scale           : (scaleX, scaleY) => cropperRef.current.scale(scaleX, scaleY),
    getData         : rounded => cropperRef.current.getData(rounded),
    setData         : (x, y, width, height, rotate, scaleX, scaleY) => (
      cropperRef.current.setData({ x, y, width, height, rotate, scaleX, scaleY })
    ),
    getContainerData: () => cropperRef.current.getContainerData(),
    getImageData    : () => cropperRef.current.getImageData(),
    getCanvasData   : () => cropperRef.current.getCanvasData(),
    setCanvasData   : (left, top, width, height) => (
      cropperRef.current.setCanvasData({ left, top, width, height })
    ),
    getCropBoxData  : () => cropperRef.current.getCropBoxData(),
    setCropBoxData  : (left, top, width, height) => (
      cropperRef.current.setCropBoxData({ left, top, width, height })
    ),
    setAspectRatio  : ratio => cropperRef.current.setAspectRatio(ratio),
    setDragMode     : model => cropperRef.current.setDragMode(model),
    getCroppedCanvas: (
      width, height, minWidth, minHeight, maxWidth, maxHeight, fillColor, imageSmoothingEnabled, imageSmoothingQuality
    ) => (
      cropperRef.current.getCroppedCanvas({
        width, height, minWidth, minHeight, maxWidth, maxHeight,
        fillColor, imageSmoothingEnabled, imageSmoothingQuality,
      })
    ),
  });
}
