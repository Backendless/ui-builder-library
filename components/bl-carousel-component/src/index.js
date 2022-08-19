import { useState, useEffect, useRef } from 'react';
import { NextButton, PrevButton, List, CarouselIndicators } from './subcomponents';
import { getPrevImg, getNextImg } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function Carousel({ component, eventHandlers }) {
  const {
    display,
    classList,
    imagesData,
    heightImage,
    autoplayDelay,
    animationDuration,
    withControls,
    withIndicators,
    animationType
  } = component;
  const { onNextButton, onPrevButton, onMouseEnter, onMouseLeave } = eventHandlers;

  const [data, setData] = useState(imagesData);
  const [currentImg, setCurrentImg] = useState(0);
  const [isNextAnimation, setIsNextAnimation] = useState(false);
  const [isPrevAnimation, setIsPrevAnimation] = useState(false);
  const [nextCurrentImage, setNextCurrentImage] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayId = useRef();

  const nextImg = getNextImg(currentImg, data.length);
  const prevImg = getPrevImg(currentImg, data.length);

  useEffect(() => {
    if (autoplayDelay && isAutoplay) {
      autoplayId.current = setTimeout(() => {
        component.goToNextImage();
      }, autoplayDelay);
    } else if (!isAutoplay) {
      clearTimeout(autoplayId.current);
    }
  }, [currentImg, autoplayDelay, isAutoplay]);

  component.goToNextImage = () => {
    setIsAutoplay(false);
    setNextCurrentImage(nextImg);
    setIsNextAnimation(true);

    setTimeout(() => {
      setIsNextAnimation(false);
      setCurrentImg(nextImg);
      setIsAutoplay(true)
    }, animationDuration);
  };

  component.goToPrevImage = () => {
    setIsAutoplay(false);
    setNextCurrentImage(prevImg);
    setIsPrevAnimation(true);

    setTimeout(() => {
      setIsPrevAnimation(false);
      setCurrentImg(prevImg);
      setIsAutoplay(true);
    }, animationDuration);
  };

  component.goToImage = (indexImage) => {
    setIsAutoplay(false);
    setNextCurrentImage(indexImage);
    if (indexImage > currentImg) {
      setIsNextAnimation(true);

      setTimeout(() => {
        setIsNextAnimation(false);
        setCurrentImg(indexImage);
        setIsAutoplay(true);
      }, animationDuration);
    } else {
      setIsPrevAnimation(true);

      setTimeout(() => {
        setIsPrevAnimation(false);
        setCurrentImg(indexImage);
        setIsAutoplay(true);
      }, animationDuration);
    }
  };

  component.autoplay = (boolean) => {
    setIsAutoplay(boolean);
  };

  component.setImageData = (listImageData) => {
    setCurrentImg(0);
    setNextCurrentImage(0);
    clearTimeout(autoplayId.current);
    setData(listImageData);
  };

  if (!display || !data.length) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-carousel', classList) }
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }>
      { withControls && (
        <div className="carousel__controls-button">
          <PrevButton disabled={ isPrevAnimation || isNextAnimation } onPrevButton={ onPrevButton }/>
          <NextButton disabled={ isPrevAnimation || isNextAnimation } onNextButton={ onNextButton }/>
        </div>
      ) }

      <List
        data={ data }
        currentImg={ currentImg }
        nextCurrentImage={ nextCurrentImage }
        heightImage={ heightImage }
        animationType={ animationType }
        isNextAnimation={ isNextAnimation }
        isPrevAnimation={ isPrevAnimation }
        animationDuration={ animationDuration }
      />

      { withIndicators && (
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
