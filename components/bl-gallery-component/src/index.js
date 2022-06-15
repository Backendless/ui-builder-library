import { useMemo } from 'react';

import { Gallery } from './components/gallery.js';

const DefaultOptions = {
  IMAGE_LABEL: 'Image',
  SEPARATOR: 'of',
  FADE_DURATION: 600,
  IMAGE_FADE_DURATION: 600,
  POSITION_FROM_TOP: 50,
  RESIZE_DURATION: 700,
};

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
    showImageCount,
    wrapAround,
  } = component;

  const options = useMemo(() => {
    const {
      IMAGE_LABEL,
      SEPARATOR,
      FADE_DURATION,
      IMAGE_FADE_DURATION,
      POSITION_FROM_TOP,
      RESIZE_DURATION,
    } = DefaultOptions;

    return {
      alwaysShowNavOnTouchDevices: alwaysShowNavOnTouchDevices === 'true',
      imageLabel: imageLabel || IMAGE_LABEL,
      separator: separator || SEPARATOR,
      disableScrolling: disableScrolling === 'true',
      fadeDuration: +fadeDuration >= 0 ? +fadeDuration : FADE_DURATION,
      imageFadeDuration: +imageFadeDuration >= 0 ? +imageFadeDuration : IMAGE_FADE_DURATION,
      positionFromTop: +positionFromTop >= 0 ? +positionFromTop : POSITION_FROM_TOP,
      resizeDuration: +resizeDuration >= 0 ? +resizeDuration : RESIZE_DURATION,
      showImageCount: showImageCount === 'true',
      wrapAround: wrapAround === 'true',
    };
  }, [
    alwaysShowNavOnTouchDevices,
    imageLabel,
    separator,
    disableScrolling,
    fadeDuration,
    imageFadeDuration,
    positionFromTop,
    resizeDuration,
    showImageCount,
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
