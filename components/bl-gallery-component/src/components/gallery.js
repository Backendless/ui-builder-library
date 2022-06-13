import LightBox from '../lib/lightbox-jquery.js';
import { GalleryImage } from './gallery-image.js';

export function Gallery({ images, options }) {
  const {
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
  } = options;

  LightBox.option({
    'alwaysShowNavOnTouchDevices': alwaysShowNavOnTouchDevices,
    'albumLabel': `${imageLabel} %1 ${separator} %2`,
    'disableScrolling': disableScrolling,
    'fadeDuration': fadeDuration,
    'imageFadeDuration': imageFadeDuration,
    'positionFromTop': positionFromTop,
    'resizeDuration': resizeDuration,
    'showImageNumberLabel': showImageNumberLabel,
    'wrapAround': wrapAround,
  });

  return (
    <div className="bl-customComponent-lightBox">
      {
        images.map(image => {
          const { title, url, height } = image;

          return (
            <a
              key={ url }
              data-lightbox="example"
              data-title={ title }
              href={ url }
            >
              <GalleryImage url={ url } imageHeight={ height } />
            </a>
          );
        })
      }
    </div>
  );
}