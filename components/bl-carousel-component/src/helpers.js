const { cn } = BackendlessUI.CSSUtils;

export const getClassNamesItem = (
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

export const getAdjacentImages = (currentImg, imagesCount) => {
  return {
    nextImg: (currentImg + 1) % (imagesCount + 1),
    prevImg: currentImg ? currentImg - 1 : imagesCount,
  };
};
