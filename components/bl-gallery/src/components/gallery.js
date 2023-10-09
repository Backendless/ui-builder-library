import { useEffect } from 'react';

import { replaceArrowBrackets } from '../helpers/string';
import LightBox from '../lib/lightbox';
import { GalleryImage } from './gallery-image';

export function Gallery(props) {
  const {
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
    shortId,
  } = props;

  useEffect(() => (
    LightBox.option({
      'alwaysShowNavOnTouchDevices': alwaysShowNavOnTouchDevices,
      'albumLabel'                 : `${ imageLabel } %1 ${ separator } %2`,
      'disableScrolling'           : disableScrolling,
      'fadeDuration'               : fadeDuration,
      'imageFadeDuration'          : imageFadeDuration,
      'positionFromTop'            : positionFromTop,
      'resizeDuration'             : resizeDuration,
      'showImageNumberLabel'       : showImageCount,
      'wrapAround'                 : wrapAround,
    })
  ), []);

  return (
    <div className="bl-customComponent-lightBox">
      {
        images.map(image => {
          const { title, url, height } = image;
          const escapedTitle = replaceArrowBrackets(title);

          return (
            <a
              key={ url }
              data-lightbox={ `bl-gallery-${ shortId }` }
              data-title={ escapedTitle }
              href={ url }>
              <GalleryImage url={ url } height={ height }/>
            </a>
          );
        })
      }
    </div>
  );
}
