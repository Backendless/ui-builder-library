import { useEffect } from 'react';

import lgAutoplay from './extends/lightGallery/lgAutoplay.js';
import lgPager from './extends/lightGallery/lgPager.js';
import lgRotate from './extends/lightGallery/lgRotate.js';
import lgThumbnail from './extends/lightGallery/lgThumbnail.js';
import lgZoom from './extends/lightGallery/lgZoom.js';
import LightGallery from './extends/lightGallery/lightgallery.js';

export default function Gallery({ images, options }) {

  useEffect(() => {
    LightGallery(document.getElementById('lightgallery'), {
      plugins: [lgZoom, lgRotate, lgThumbnail, lgAutoplay, lgPager],
      thumbnail: options.thumbnail,
      zoom: options.zoom,
      rotate: options.rotate,
      autoplay: options.autoplay,
      licenseKey: '0000-0000-0000-0001',
      mode: 'lg-slide',
      speed: options.speed,
      pager: options.pager,
      getCaptionFromTitleOrAlt: false,
    });
  }, []);
  
  return (
    <div id="lightgallery" className="bl-lightGallery">
      {
        images.map(image => {
          const title = image.isTitle ? `<h4>${image.title? image.title : ''}</h4>` : '';
          const description = image.isDescription ? `<p>${image.description ? image.description : ''}</p>` : '';
          return (
            <a
              key={ image.objectId }
              href={ image.url }
              data-sub-html={ title + description }
            >
              <img
                src={ image.url }
                style={{ height:`${options.itemHeight}px`, width:'auto', margin: `${options.gap}px` }}
                alt="img"
                className="bl-lightGallery__image"
              />
            </a>
          );
        })
      }
    </div>
  );
}
