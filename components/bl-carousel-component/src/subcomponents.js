import { useMemo } from 'react';
import { useClassNamesItem } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function ListItem(props) {
  const {
    data,
    currentImg,
    nextCurrentImage,
    heightImage,
    isNextAnimation,
    isPrevAnimation,
    animationDuration,
    typeAnimation
  } = props;

  const style = useMemo(() => {
    if (typeAnimation === 'smooth') {
      return { transition: `opacity ${ animationDuration }ms ease-in-out` };
    }

    return {
      animationDuration: `${ animationDuration }ms`,
      transition       : `transform ${ animationDuration }ms ease-in-out`
    };
  }, [animationDuration, typeAnimation]);

  return (
    <div className="carousel__list">
      { data.map((image, index) => {
        const classes = useClassNamesItem(
          index,
          currentImg,
          nextCurrentImage,
          isNextAnimation,
          isPrevAnimation,
          typeAnimation
        );
        const { url, title, content } = image;

        return (
          <div
            className={ classes }
            style={ style }>
            <img
              src={ url }
              className="carousel__image"
              style={ { height: `${ heightImage }px` } }
            />
            { (title || content) && (
              <div className="carousel__caption">
                <CarouselTitle title={ title }/>
                <CarouselContent content={ content }/>
              </div>
            ) }
          </div>
        );
      }) }
    </div>
  );
}

function CarouselTitle({ title }) {
  if (!title) {
    return null;
  }

  return (
    <h3>{ title }</h3>
  );
}

function CarouselContent({ content }) {
  if (!content) {
    return null;
  }

  return (
    <p>{ content }</p>
  );
}

export function CarouselIndicators(props) {
  const { data, currentImg, nextCurrentImage, isAnimation, goToImage } = props;

  return (
    <div className="carousel__indicator-list">
      { data.map((_, index) => (
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

export const NextButton = ({ isDisabled, onNextButton }) => (
  <button
    type="button"
    className="carousel__next-button"
    onClick={ onNextButton }
    disabled={ isDisabled }>
    <NextButtonIcon/>
  </button>
);

export const PrevButton = ({ isDisabled, onPrevButton }) => (
  <button
    type="button"
    className="carousel__prev-button"
    onClick={ onPrevButton }
    disabled={ isDisabled }>
    <PrevButtonIcon/>
  </button>
);

const NextButtonIcon = () => (
  <svg
    className="carousel__next-icon"
    viewBox="0 0 16 16"
    fill="#fff">
    <path
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

const PrevButtonIcon = () => (
  <svg
    className="carousel__prev-icon"
    viewBox="0 0 16 16"
    fill="#fff">
    <path
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  </svg>
);
