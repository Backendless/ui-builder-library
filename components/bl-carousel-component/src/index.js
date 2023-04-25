import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getAdjacentImages } from './helpers';
import { Button, CarouselIndicators, List } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function Carousel({ component, eventHandlers }) {
  const {
    style,
    display,
    classList,
    width,
    imagesData,
    height,
    autoplayDelay,
    animationDuration,
    withControls,
    withIndicators,
    animationType,
  } = component;
  const { onNextButtonClick, onPrevButtonClick, onMouseEnter, onMouseLeave } = eventHandlers;

  const [imagesList, setImagesList] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [animation, setAnimation] = useState(null);
  const [nextCurrentImage, setNextCurrentImage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef();

  const { nextImg, prevImg } = useMemo(() => {
    return getAdjacentImages(currentImg, imagesList.length - 1);
  }, [currentImg, imagesList]);

  useEffect(() => {
    if (imagesData) {
      setImagesList(imagesData);
    }
  }, [imagesData]);

  useEffect(() => {
    if (autoplayDelay && autoplay && imagesList.length > 1) {
      autoplayRef.current = setTimeout(() => {
        component.goToNextImage();
      }, autoplayDelay);
    } else {
      clearTimeout(autoplayRef.current);
    }
  }, [currentImg, autoplayDelay, autoplay, imagesList]);

  component.goToNextImage = () => {
    clearTimeout(autoplayRef.current);
    setNextCurrentImage(nextImg);
    setAnimation('next');

    setTimeout(() => {
      setAnimation(null);
      setCurrentImg(nextImg);
    }, animationDuration);
  };

  component.goToPrevImage = () => {
    clearTimeout(autoplayRef.current);
    setNextCurrentImage(prevImg);
    setAnimation('prev');

    setTimeout(() => {
      setAnimation(null);
      setCurrentImg(prevImg);
    }, animationDuration);
  };

  component.goToImage = index => {
    clearTimeout(autoplayRef.current);
    setNextCurrentImage(index);

    setAnimation(index > currentImg ? 'next' : 'prev');

    setTimeout(() => {
      setAnimation(null);
      setCurrentImg(index);
    }, animationDuration);
  };

  component.autoplay = boolean => {
    setAutoplay(boolean);
  };

  component.setImagesData = listImagesData => {
    setCurrentImg(0);
    setNextCurrentImage(0);
    clearTimeout(autoplayRef.current);
    setImagesList(listImagesData);
  };

  const onPrevClick = useCallback(() => {
    if (onPrevButtonClick.hasLogic) {
      onPrevButtonClick();
    } else {
      component.goToPrevImage();
    }
  }, [onPrevButtonClick]);

  const onNextClick = useCallback(() => {
    if (onNextButtonClick.hasLogic) {
      onNextButtonClick();
    } else {
      component.goToNextImage();
    }
  }, [onNextButtonClick]);

  if (!display || !imagesList.length) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-carousel', classList) }
      style={{ ...style, height, width }}
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }>
      { withControls && (
        <div className="carousel__controls-button">
          <Button disabled={ !!animation || imagesList.length < 2 } onClick={ onPrevClick } type="prev"/>
          <Button disabled={ !!animation || imagesList.length < 2 } onClick={ onNextClick } type="next"/>
        </div>
      ) }

      <List
        imagesList={ imagesList }
        currentImg={ currentImg }
        nextCurrentImage={ nextCurrentImage }
        height={ height }
        animationType={ animationType }
        animation={ animation }
        animationDuration={ animationDuration }
      />

      { withIndicators && (
        <CarouselIndicators
          imagesList={ imagesList }
          currentImg={ currentImg }
          nextCurrentImage={ nextCurrentImage }
          isAnimated={ !!animation }
          goToImage={ component.goToImage }
        />
      ) }
    </div>
  );
}

