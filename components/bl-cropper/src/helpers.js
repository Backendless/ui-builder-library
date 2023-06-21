import { useEffect, useRef } from 'react';

import Cropper from './lib/cropper.min';

export function useCropperLibrary(component, eventHandlers, imageRef, image) {
  const {
    aspectRatio, dragMode, cropBoxModal, cropBoxGuides, centerIndicator, cropBoxHighlight, backgroundGrid, autoCrop,
    autoCropArea, movableImage, rotatableImage, scalableImage, zoomableImage, zoomOnTouch, zoomOnWheel, cropBoxMovable,
    cropBoxResizable, toggleDragModeOnDblclick, minContainerWidth, minContainerHeight, minCanvasWidth, minCanvasHeight,
    minCropBoxWidth, minCropBoxHeight,
  } = component;
  const { onCrop, onReady, onCropStart, onCropMove, onCropEnd, onZoom } = eventHandlers;

  const cropperRef = useRef(null);

  useEffect(() => {
    const cropperAspectRatio = aspectRatio.split('/');

    cropperRef.current = new Cropper(imageRef.current, {
      aspectRatio: Number(cropperAspectRatio[0]) / Number(cropperAspectRatio[1]),
      viewMode   : 1,
      dragMode,
      modal      : cropBoxModal,
      guides     : cropBoxGuides,
      center     : centerIndicator,
      highlight  : cropBoxHighlight,
      background : backgroundGrid,
      autoCrop,
      autoCropArea,
      movable    : movableImage,
      rotatable  : rotatableImage,
      scalable   : scalableImage,
      zoomable   : zoomableImage,
      zoomOnTouch,
      zoomOnWheel,
      cropBoxMovable,
      cropBoxResizable,
      toggleDragModeOnDblclick,
      minContainerWidth,
      minContainerHeight,
      minCanvasWidth,
      minCanvasHeight,
      minCropBoxWidth,
      minCropBoxHeight,
      ready      : () => onReady(),
      cropstart  : () => onCropStart(),
      cropmove   : () => onCropMove(),
      cropend    : () => onCropEnd(),
      zoom       : () => onZoom(),
      crop       : event => {
        const details = event.detail;

        onCrop({ details });
      },
    });

    return () => cropperRef.current.destroy();
  }, [image]);

  return cropperRef;
}

export async function dataURLToBlob(dataURL) {
  const response = await fetch(dataURL);

  return response.blob();
}

export function getImageBlob(cropper) {
  const croppedCanvasURL = cropper.getCroppedCanvas().toDataURL();

  return dataURLToBlob(croppedCanvasURL);
}

export async function download(dataURL, filename) {
  const blob = await dataURLToBlob(dataURL);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.style = 'display: none';
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}

export function upload(e, callback) {
  e.preventDefault();
  e.stopPropagation();

  const files = e.dataTransfer?.files || e.target?.files;
  const type = files[0].type;

  if (!type.includes('image')) {
    return;
  }

  const reader = new FileReader();

  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(files[0]);
  e.target.value = '';
}
