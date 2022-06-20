import { useEffect } from 'react';

import LightBox from '../../lib/lightbox';
import { fixTitle } from '../../utils/title';
import { GalleryImage } from '../gallery-image';

export function Gallery({
                          images,
                          wrapAround,
                          showImageCount,
                          resizeDuration,
                          positionFromTop,
                          imageFadeDuration,
                          fadeDuration,
                          disableScrolling,
                          separator,
                          imageLabel,
                          alwaysShowNavOnTouchDevices,
                        }) {
  useEffect(() => (
    LightBox.option({
      'alwaysShowNavOnTouchDevices': alwaysShowNavOnTouchDevices,
      'albumLabel': `${imageLabel} %1 ${separator} %2`,
      'disableScrolling': disableScrolling,
      'fadeDuration': fadeDuration,
      'imageFadeDuration': imageFadeDuration,
      'positionFromTop': positionFromTop,
      'resizeDuration': resizeDuration,
      'showImageNumberLabel': showImageCount,
      'wrapAround': wrapAround,
    })
  ), []);

  return (
    <div className="bl-customComponent-lightBox">
      {
        images.map(image => {
          const { title, url, height } = image;
          const escapedTitle = fixTitle(title);

          return (
            <a
              key={ url }
              data-lightbox="bl-gallery"
              data-title={ escapedTitle }
              href={ url }>
              <GalleryImage url={ url } height={ height } />
            </a>
          );
        })
      }
    </div>
  );
}