import { useMemo } from 'react';

import { Gallery } from './Gallery.js';

const DEFAULT_IMAGE_HEIGHT = '200px';
const DEFAULT_GAP = 0;
const DEFAULT_IMAGE_LABEL = 'Image';
const DEFAULT_SEPARATOR = 'of';
const DEFAULT_FADE_DURATION = 600;
const DEFAULT_IMAGE_FADE_DURATION = 600;
const DEFAULT_POSITION_FROM_TOP = 50;
const DEFAULT_RESIZE_DURATION = 700;
const DEFAULT_BORDER_RADIUS = '5px';

export default function CustomComponentGallery({ component }) {
  const {
    gap,
    imageHeight,
    imagesData,
    alwaysShowNavOnTouchDevices,
    imageLabel,
    separator,
    disableScrolling,
    fadeDuration,
    imageFadeDuration,
    positionFromTop,
    resizeDuration,
    showImageNumberLabel,
    wrapAround,
    borderRadius,
  } = component;

  const options = useMemo(() => ({
    gap: gap || DEFAULT_GAP,
    imageHeight: imageHeight || DEFAULT_IMAGE_HEIGHT,
    alwaysShowNavOnTouchDevices: alwaysShowNavOnTouchDevices === 'true',
    imageLabel: imageLabel || DEFAULT_IMAGE_LABEL,
    separator: separator || DEFAULT_SEPARATOR,
    disableScrolling: disableScrolling === 'true',
    fadeDuration: fadeDuration ? +fadeDuration : DEFAULT_FADE_DURATION,
    imageFadeDuration: imageFadeDuration ? +imageFadeDuration : DEFAULT_IMAGE_FADE_DURATION,
    positionFromTop: positionFromTop ? +positionFromTop : DEFAULT_POSITION_FROM_TOP,
    resizeDuration: resizeDuration ? +resizeDuration : DEFAULT_RESIZE_DURATION,
    showImageNumberLabel: showImageNumberLabel === 'true',
    wrapAround: wrapAround === 'true',
    borderRadius: borderRadius || DEFAULT_BORDER_RADIUS,
  }), [
    gap,
    imageHeight,
    alwaysShowNavOnTouchDevices,
    imageLabel,
    separator,
    disableScrolling,
    fadeDuration,
    imageFadeDuration,
    positionFromTop,
    resizeDuration,
    showImageNumberLabel,
    wrapAround,
    borderRadius,
  ]);

  const images = useMemo(() => {
    const newData = Object.assign({}, imagesData);
    const imagesArray = [];

    for(const key in newData) {
      const point = Object.assign({}, newData[key]);
      if (!point.hasOwnProperty('title')) {
        point.title='';
      }
      imagesArray.push(point);
    }

    return imagesArray;
  }, [imagesData]);

  if (!component.display || !images.length) {
    return null;
  }
  
  return <Gallery images={ images } options={ options } />;
}
