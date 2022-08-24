import { useMemo } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export const useClassNamesItem = (
  index,
  currentImg,
  nextCurrentImage,
  animation,
  typeAnimation
) => {
  const isActiveImage = index === currentImg;

  return cn('carousel__item', typeAnimation, {
    'active'                                  : isActiveImage,
    [`carousel-${ typeAnimation }-item-next`] : nextCurrentImage === index && animation === 'next',
    [`carousel-${ typeAnimation }-item-start`]: isActiveImage && animation === 'next',
    [`carousel-${ typeAnimation }-item-prev`] : nextCurrentImage === index && animation === 'prev',
    [`carousel-${ typeAnimation }-item-end`]  : isActiveImage && animation === 'prev',
  });
};

export const getAdjacentImages = (currentImg, dataLength) => useMemo(() => {
  let nextImg = currentImg !== dataLength - 1 ? currentImg + 1 : 0;
  let prevImg = currentImg !== 0 ? currentImg - 1 : dataLength - 1;

  return { nextImg, prevImg };
}, [currentImg, dataLength]);
