import { useState, useEffect } from 'react';
import { NextButton, PrevButton, ListItem, CarouselIndicators } from './subcomponents';
import { getPrevImg, getNextImg } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function Carousel({ component, eventHandlers }) {
  const {
    display,
    classList,
    imagesData,
    heightImage,
    hasAutoplay,
    autoplayDelay,
    animationDuration,
    isControlButtonsVisible,
    isIndicatorsVisible,
    typeAnimation
  } = component;
  const { onNextButton, onPrevButton, onHover, onUnhover } = eventHandlers;

  const [data, setData] = useState(imagesData);
  const [currentImg, setCurrentImg] = useState(0);
  const [isNextAnimation, setIsNextAnimation] = useState(false);
  const [isPrevAnimation, setIsPrevAnimation] = useState(false);
  const [autoplay, setAutoplay] = useState();
  const [nextCurrentImage, setNextCurrentImage] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const nextImg = getNextImg(currentImg, data.length);
  const prevImg = getPrevImg(currentImg, data.length);

  useEffect(() => {
    if (hasAutoplay && isAutoplay) {
      setAutoplay(setTimeout(() => {
        component.goNextImage();
      }, autoplayDelay));
    } else if (!isAutoplay) {
      clearTimeout(autoplay);
    }
  }, [currentImg, hasAutoplay, isAutoplay]);

  component.goNextImage = () => {
    clearTimeout(autoplay);
    setNextCurrentImage(nextImg);
    setIsNextAnimation(true);

    setTimeout(() => {
      setIsNextAnimation(false);
      setCurrentImg(nextImg);
    }, animationDuration);
  };

  component.goPrevImage = () => {
    clearTimeout(autoplay);
    setNextCurrentImage(prevImg);
    setIsPrevAnimation(true);

    setTimeout(() => {
      setIsPrevAnimation(false);
      setCurrentImg(prevImg);
    }, animationDuration);
  };

  component.goToImage = (indexImage) => {
    clearTimeout(autoplay);
    setNextCurrentImage(indexImage);
    if (indexImage > currentImg) {
      setIsNextAnimation(true);

      setTimeout(() => {
        setIsNextAnimation(false);
        setCurrentImg(indexImage);
      }, animationDuration);
    } else {
      setIsPrevAnimation(true);

      setTimeout(() => {
        setIsPrevAnimation(false);
        setCurrentImg(indexImage);
      }, animationDuration);
    }
  };

  component.stopAutoplay = () => {
    setIsAutoplay(false);
  };

  component.startAutoplay = () => {
    setIsAutoplay(true);
  };

  component.setImageData = (listImageData) => {
    setCurrentImg(0);
    setNextCurrentImage(0);
    clearTimeout(autoplay);
    setData(listImageData);
  };

  if (!display || !data.length) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-carousel', classList) }
      onMouseOver={ onHover }
      onMouseOut={ onUnhover }>
      { isControlButtonsVisible && (
        <div className="carousel__controls-button">
          <PrevButton
            isDisabled={ isPrevAnimation || isNextAnimation }
            onPrevButton={ onPrevButton }
          />
          <NextButton
            isDisabled={ isPrevAnimation || isNextAnimation }
            onNextButton={ onNextButton }
          />
        </div>
      ) }

      <ListItem
        data={ data }
        currentImg={ currentImg }
        nextCurrentImage={ nextCurrentImage }
        heightImage={ heightImage }
        typeAnimation={ typeAnimation }
        isNextAnimation={ isNextAnimation }
        isPrevAnimation={ isPrevAnimation }
        animationDuration={ animationDuration }
      />

      { isIndicatorsVisible && (
        <CarouselIndicators
          data={ data }
          currentImg={ currentImg }
          nextCurrentImage={ nextCurrentImage }
          isAnimation={ isPrevAnimation || isNextAnimation }
          goToImage={ component.goToImage }
        />
      ) }
    </div>
  );
}
