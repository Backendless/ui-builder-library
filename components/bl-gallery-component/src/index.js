import { useMemo } from 'react';

import { Gallery } from './components/gallery.js';

const DEFAULT_IMAGE_LABEL = 'Image';
const DEFAULT_SEPARATOR = 'of';
const DEFAULT_FADE_DURATION = 600;
const DEFAULT_IMAGE_FADE_DURATION = 600;
const DEFAULT_POSITION_FROM_TOP = 50;
const DEFAULT_RESIZE_DURATION = 700;

export default function GalleryComponent({ component }) {
  const {
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
  } = component;

  const options = useMemo(() => ({
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
  }), [
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
  ]);

  const images = useMemo(() => {
    const imagesArray = [];

    for(const key in imagesData) {
      const point = Object.assign({}, imagesData[key]);

      if (!point.title) {
        point.title = '';
      }
      if (!point.height) {
        point.height = '';
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
