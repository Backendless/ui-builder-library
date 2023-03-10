import { useState, useEffect, useRef } from 'react';
import { Button, List, CarouselIndicators } from './subcomponents';
import { getAdjacentImages } from './helpers';

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
    animationType
  } = component;
  const { onNextButtonClick, onPrevButtonClick, onMouseEnter, onMouseLeave } = eventHandlers;

  const [imagesList, setImagesList] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [animation, setAnimation] = useState(null);
  const [nextCurrentImage, setNextCurrentImage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef();

  const { nextImg, prevImg } = getAdjacentImages(currentImg, imagesList.length);

  useEffect(() => {
    if (imagesData) {
      setImagesList(imagesData);
    }
  }, [imagesData]);

  useEffect(() => {
    if (autoplayDelay && autoplay) {
      autoplayRef.current = setTimeout(() => {
        component.goToNextImage();
      }, autoplayDelay);
    } else if (!autoplay) {
      clearTimeout(autoplayRef.current);
    }
  }, [currentImg, autoplayDelay, autoplay]);

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

  component.goToImage = (index) => {
    clearTimeout(autoplayRef.current);
    setNextCurrentImage(index);

    setAnimation(index > currentImg ? 'next' : 'prev');

    setTimeout(() => {
      setAnimation(null);
      setCurrentImg(index);
    }, animationDuration);
  };

  component.autoplay = (boolean) => {
    setAutoplay(boolean);
  };

  component.setImagesData = (listImagesData) => {
    setCurrentImg(0);
    setNextCurrentImage(0);
    clearTimeout(autoplayRef.current);
    setImagesList(listImagesData);
  };

  if (!display || !imagesList.length) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-carousel', classList) }
      style={ { ...style, height: height, width: width } }
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }>
      { withControls && (
        <div className="carousel__controls-button">
          <Button disabled={ !!animation } onClick={ onPrevButtonClick } type="prev"/>
          <Button disabled={ !!animation } onClick={ onNextButtonClick } type="next"/>
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
