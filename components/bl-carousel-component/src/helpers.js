import { useMemo } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export const useClassNamesItem = (
  index,
  currentImg,
  nextCurrentImage,
  isNextAnimation,
  isPrevAnimation,
  typeAnimation
) => {
  const isActiveImage = index === currentImg;

  return cn('carousel__item', typeAnimation, {
    'active'                                  : isActiveImage,
    [`carousel-${ typeAnimation }-item-next`] : nextCurrentImage === index && isNextAnimation,
    [`carousel-${ typeAnimation }-item-start`]: isActiveImage && isNextAnimation,
    [`carousel-${ typeAnimation }-item-prev`] : nextCurrentImage === index && isPrevAnimation,
    [`carousel-${ typeAnimation }-item-end`]  : isActiveImage && isPrevAnimation,
  });
};

export const getPrevImg = (currentImg, dataLength) => useMemo(() => {
  if (currentImg !== 0) {
    return currentImg - 1;
  }

  return dataLength - 1;
}, [currentImg, dataLength]);

export const getNextImg = (currentImg, dataLength) => useMemo(() => {
  if (currentImg !== dataLength - 1) {
    return currentImg + 1;
  }

  return 0;
}, [currentImg, dataLength]);
