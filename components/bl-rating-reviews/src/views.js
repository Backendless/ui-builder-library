import { IconRow } from './subcomponents/icon-row';
import { ProgressBar } from './subcomponents/progress-bar';
import { calculatePercent } from './helpers';
import { icons } from './icons';

const { EmptyStar, FilledStar, EmptyHeart, FilledHeart } = icons;

const OneColorReview = (
  { width, average, maxValue, color, iconSize, totalReviews, reviewData, localizations, eventHandlers }
) => {
  return (
    <div className="oneColorReview" style={{ 'width': width, 'color': color }}>
      <div className="top-container">
        <div className="average">
          <span className="average-value"> {average} {localizations.averageText} {maxValue} </span>
        </div>
        <div className="total-reviews">
          <IconRow
            Empty={ EmptyStar }
            Filled={ FilledStar }
            maxValue={ maxValue }
            value={ average }
            color={ color }
            size={ iconSize }/>
          <span className="total-text">{`${totalReviews} ${localizations.reviewsText}`}</span>
        </div>
      </div>
      <div className="data-container">
        <div>
          {
            reviewData.map((el, i) => (
              <div className="data-row" key={ i }>
                <IconRow
                  Empty={ EmptyStar }
                  Filled={ FilledStar }
                  maxValue={ maxValue }
                  value={ maxValue-i }
                  color={ color }
                  size={ iconSize } />
                <span className="value">{el.value}</span>
              </div>
            ))
          }
        </div>
        <div className="progress-bar-container">
          {
            reviewData.map((el, i) => (
              <ProgressBar
                key={ i }
                eventHandlers={ eventHandlers }
                maxValue={ totalReviews }
                value={ el.value }
                color={ color }/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

const TwoColorReview = (
  { width, maxValue, color, iconSize, totalReviews, reviewData, eventHandlers }
) => {
  return (
    <div className="twoColorReview" style={{ 'width': width }}>
      <div className="data-container">
        <div className="icons">
          {
            reviewData.map((el, i) => (
              <div className="icon-container"  key={ i }>
                <span className="number">{maxValue - i}</span>
                <span className="icon" style={{ 'height' : iconSize, 'width': iconSize }}><FilledStar/></span>
              </div>
            ))
          }
        </div>
        <div className="progress-bar-container">
          {
            reviewData.map((el, i) => (
              <ProgressBar
                key={ i }
                eventHandlers={ eventHandlers }
                maxValue={ totalReviews }
                value={ el.value }
                color={ color }/>
            ))
          }
        </div>
        <div className="values">
          {
            reviewData.map((el, i) => (
              <span key={ i }>{el.value}</span>
            ))
          }
        </div>
      </div>
    </div>
  );
};

const MultiColorReview = (
  { width, average, maxValue, color, iconSize, totalReviews, reviewData, localizations, eventHandlers }
) => {
  return(
    <div className="multiColorReview" style={{ 'width': width }}>
      <div className="top-container">
        <div className="average-value">{average}</div>
        <IconRow
          Empty={ EmptyHeart }
          color={ color }
          size={ iconSize }
          value={ average }
          maxValue={ maxValue }
          Filled={ FilledHeart }/>
        <div className="total-reviews">{totalReviews} {localizations.reviewsText}</div>
      </div>
      <div className="data-container">
        <div className="numbers">{
          reviewData.map((el, i) => (<span key={ i }>{maxValue - i}</span>))
        }</div>
        <div className="progress-bar-container">
          {
            reviewData.map((el, i) => (
              <ProgressBar
                key={ i }
                eventHandlers={ eventHandlers }
                maxValue={ totalReviews }
                value={ el.value }
                color={ el.color }/>
            ))
          }
        </div>
        <div className="percents">
          {
            reviewData.map((el, i) => {
              const precent = Math.round(calculatePercent(el.value, totalReviews));

              return (
                <span key={ i }>{`${precent}%`}</span>
              );
            })
          }
        </div>
        <div className="values">
          {
            reviewData.map((el, i) => (<span key={ i }>{el.value}</span>))
          }
        </div>
      </div>
    </div>
  );
};

const ViewsMap = {
  oneColor: OneColorReview,
  twoColor: TwoColorReview,
  multiColor: MultiColorReview,
};

export default ViewsMap;
