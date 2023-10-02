import { useMemo } from 'react';

import { getClassNamesItem } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function List(props) {
  const {
    imagesList,
    currentImg,
    nextCurrentImage,
    height,
    animation,
    animationDuration,
    animationType,
  } = props;

  const style = useMemo(() => {
    if (animationType === 'slide') {
      return {
        height,
        animationDuration: `${ animationDuration }ms`,
        transition       : `transform ${ animationDuration }ms ease-in-out`,
      };
    }

    return {};
  }, [animationDuration, animationType, height]);

  return (
    <div className="carousel__list">
      { imagesList.map((image, index) => {
        const classes = getClassNamesItem(
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
            height={ height }
            animationDuration={ animationDuration }
            index={ index }
            currentImg={ currentImg }
          />
        );
      }) }
    </div>
  );
}

function Item({ classes, style, height, url, title, content, animationDuration, index, currentImg }) {
  return (
    <div
      className={ classes }
      style={ style }>
      <img
        alt={ title }
        src={ url }
        className="carousel__image"
        style={{ height, transitionDuration: animationDuration + 'ms' }}
      />
      <CarouselCaption
        title={ title }
        content={ content }
        animationDuration={ animationDuration }
        index={ index }
        currentImg={ currentImg }
      />
    </div>
  );
}

function CarouselCaption({ title, content, animationDuration, index, currentImg }) {
  if (!title && !content) {
    return null;
  }

  return (
    <div className="carousel__caption" style={{
      transitionDuration: `${ animationDuration / 2 }ms`,
      transitionDelay   : index !== currentImg ? `${ animationDuration / 2 }ms` : '',
    }}>
      { title && (<h3>{ title }</h3>) }
      { content && (<p>{ content }</p>) }
    </div>
  );
}

export function CarouselIndicators(props) {
  const { imagesList, currentImg, nextCurrentImage, isAnimated, goToImage } = props;

  return (
    <div className="carousel__indicator-list">
      { imagesList.map((_, index) => (
        <button
          type="button"
          className={ cn('carousel__indicator-item', { 'active': index === nextCurrentImage }) }
          onClick={ () => goToImage(index) }
          disabled={ isAnimated || index === currentImg }>
          <svg className="carousel__indicator-icon">
            <rect/>
          </svg>
        </button>
      )) }
    </div>
  );
}

export const NextButtonIcon = () => (
  <svg className="carousel__next-icon" viewBox="0 0 16 16" fill="#fff">
    <path
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

export const PrevButtonIcon = () => (
  <svg className="carousel__prev-icon" viewBox="0 0 16 16" fill="#fff">
    <path
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  </svg>
);

const ButtonIcons = {
  next: <NextButtonIcon/>,
  prev: <PrevButtonIcon/>,
};

export function Button({ disabled, onClick, type }) {
  return (
    <button
      type="button"
      className={ cn(`carousel__${ type }-button`, { disabled }) }
      onClick={ onClick }>
      { ButtonIcons[type] }
    </button>
  );
}
