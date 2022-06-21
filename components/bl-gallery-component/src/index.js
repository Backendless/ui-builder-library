import { useMemo } from 'react';

import { Gallery } from './components/gallery';
import { createImagesData } from './utils/images-data';
import { handleOptions } from './utils/options';
import { createShortId } from './utils/short-id';

const DefaultOptions = {
  IMAGE_LABEL: 'Image',
  SEPARATOR: 'of',
  FADE_DURATION: 600,
  IMAGE_FADE_DURATION: 600,
  POSITION_FROM_TOP: 50,
  RESIZE_DURATION: 700,
};

const DefaultImageProperties = {
  height: '',
  title: '',
};

export default function GalleryComponent({ component }) {
  const {
    imagesData,
    alwaysShowNavOnTouchDevices,
    disableScrolling,
    showImageCount,
    wrapAround,
  } = component;

  const shortId = createShortId();

  const options = handleOptions(component, DefaultOptions);

  const images = useMemo(() => {
    if(typeof imagesData === 'string') {
      return createImagesData(imagesData);
    }

    if (imagesData) {
      return imagesData.map(image => ({ ...DefaultImageProperties, ...image }));
    }

    return [];
  }, [imagesData]);

  if (!component.display || !images.length) {
    return null;
  }

  return <Gallery
    images={ images }
    wrapAround={ wrapAround }
    showImageCount={ showImageCount }
    resizeDuration={ options.resizeDuration }
    positionFromTop={ options.positionFromTop }
    imageFadeDuration={ options.imageFadeDuration }
    fadeDuration={ options.fadeDuration }
    disableScrolling={ disableScrolling }
    separator={ options.separator }
    imageLabel={ options.imageLabel }
    alwaysShowNavOnTouchDevices={ alwaysShowNavOnTouchDevices }
    shortId={ shortId }
  />;
}
