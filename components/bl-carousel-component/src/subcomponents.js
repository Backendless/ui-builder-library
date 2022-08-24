import { useMemo } from 'react';
import { useClassNamesItem } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function List(props) {
  const {
    imagesList,
    currentImg,
    nextCurrentImage,
    heightImage,
    animation,
    animationDuration,
    animationType
  } = props;

  const style = useMemo(() => {
    if (animationType === 'smooth') {
      return { transition: `opacity ${ animationDuration }ms ease-in-out` };
    }

    return {
      animationDuration: `${ animationDuration }ms`,
      transition       : `transform ${ animationDuration }ms ease-in-out`
    };
  }, [animationDuration, animationType]);

  return (
    <div className="carousel__list">
      { imagesList.map((image, index) => {
        const classes = useClassNamesItem(
          index,
          currentImg,
          nextCurrentImage,
          animation,
          animationType
        );
        const { url, title, content } = image;

        return (
          <Item
            content={ content }
            title={ title }
            style={ style }
            url={ url }
            classes={ classes }
            heightImage={ heightImage }
          />
        );
      }) }
    </div>
  );
}

function Item({ classes, style, heightImage, url, title, content }) {
  return (
    <div
      className={ classes }
      style={ style }>
      <img
        src={ url }
        className="carousel__image"
        style={ { height: `${ heightImage }px` } }
      />
      <CarouselCaption title={ title } content={ content }/>
    </div>
  );
}

function CarouselCaption({ title, content }) {
  if (!title || !content) {
    return null;
  }

  return (
    <div className="carousel__caption">
      { title && (<h3>{ title }</h3>) }
      { content && (<p>{ content }</p>) }
    </div>
  );
}

export function CarouselIndicators(props) {
  const { imagesList, currentImg, nextCurrentImage, isAnimation, goToImage } = props;

  return (
    <div className="carousel__indicator-list">
      { imagesList.map((_, index) => (
        <button
          type="button"
          className={ cn('carousel__indicator-item', { 'active': index === nextCurrentImage }) }
          onClick={ () => goToImage(index) }
          disabled={ isAnimation || index === currentImg }>
        </button>
      )) }
    </div>
  );
}

export function NextButton({ disabled, onNextButton }) {
  return (
    <button
      type="button"
      className="carousel__next-button"
      onClick={ onNextButton }
      style={ { pointerEvents: disabled ? 'none' : 'auto' } }>
      <NextButtonIcon/>
    </button>
  );
}

export function PrevButton({ disabled, onPrevButton }) {
  return (
    <button
      type="button"
      className="carousel__prev-button"
      onClick={ onPrevButton }
      style={ { pointerEvents: disabled ? 'none' : 'auto' } }>
      <PrevButtonIcon/>
    </button>
  );
}

const NextButtonIcon = () => (
  <svg className="carousel__next-icon" viewBox="0 0 16 16" fill="#fff">
    <path
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

const PrevButtonIcon = () => (
  <svg className="carousel__prev-icon" viewBox="0 0 16 16" fill="#fff">
    <path
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  </svg>
);
