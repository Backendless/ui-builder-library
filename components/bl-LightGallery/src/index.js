import { useEffect, useState } from 'react';

import Gallery from './Gallery';

export default function MyCustomComponent({ component }) {
  const [images, setImages] = useState([]);
  const DEFAULT_ITEM_HEIGHT = 250;
  const DEFAULT_SPEED = 400;

  const options = {
    itemHeight : +component.itemHeight || DEFAULT_ITEM_HEIGHT,
    rotate : component.rotate === 'true',
    thumbnail :component.thumbnail === 'true',
    zoom : component.zoom === 'true',
    autoplay : component.autoplay === 'true',
    gap: +component.gap,
    speed: +component.speed || DEFAULT_SPEED,
    pager: component.pager === 'true',
  };

  useEffect(() => {
    const newData = Object.assign({}, component.imagesData);
    const imagesArray = [];

    for(const key in newData) {
      const point = Object.assign({}, newData[key]);
      point.isDescription = point.hasOwnProperty('description');
      point.isTitle = point.hasOwnProperty('title');

      imagesArray.push(point);
    }

    setImages(imagesArray);
  }, [component.imagesData, component.imagesData?.length]);




  return !!images.length
    && component.display
    && <Gallery images={ images } options={ options }/>;
}