import { IconRow } from './subcomponents/icon-row';
import { ProgressBar } from './subcomponents/progress-bar';
import { calculatePercent } from './helpers';
import { EmptyHeart, EmptyStar, FilledHeart, FilledStar } from './icons';

const OneColorReview = props => {
  const { width, average, maxValue, color, iconSize, totalReviews, reviewData, localizations, eventHandlers } = props;

  return (
    <div className="oneColorReview" style={ { 'width': width, 'color': color } }>
      <div className="top-container">
        <div className="average">
          <span className="average-value">
            <span> { average } </span>
            <span> { localizations.averageText } </span>
            <span> { maxValue } </span>
          </span>
        </div>
        <div className="total-reviews">
          <IconRow
            Empty={ EmptyStar }
            Filled={ FilledStar }
            maxValue={ maxValue }
            value={ average }
            color={ color }
            size={ iconSize }/>
          <span className="total-text">{ `${ totalReviews } ${ localizations.reviewsText }` }</span>
        </div>
      </div>
      <div className="data-container">
        <div>
          { reviewData.map(({ value }, i) => (
            <div className="data-row" key={ i }>
              <IconRow
                Empty={ EmptyStar }
                Filled={ FilledStar }
                maxValue={ maxValue }
                value={ maxValue - i }
                color={ color }
                size={ iconSize }
              />
              <span className="value">{ value }</span>
            </div>
          )) }
        </div>
        <div className="progress-bar-container">
          { reviewData.map(({ value }, i) => (
            <ProgressBar
              key={ i }
              eventHandlers={ eventHandlers }
              maxValue={ totalReviews }
              value={ value }
              color={ color }
            />
          )) }
        </div>
      </div>
    </div>
  );
};

const TwoColorReview = props => {
  const { width, maxValue, color, iconSize, totalReviews, reviewData, eventHandlers } = props;

  return (
    <div className="twoColorReview" style={ { 'width': width } }>
      <div className="data-container">
        <div className="icons">
          { reviewData.map((el, i) => (
            <div className="icon-container" key={ i }>
              <span className="number">{ maxValue - i }</span>
              <span className="icon" style={ { 'height': iconSize, 'width': iconSize } }>
                  <FilledStar/>
                </span>
            </div>
          )) }
        </div>
        <div className="progress-bar-container">
          { reviewData.map((el, i) => (
            <ProgressBar
              key={ i }
              eventHandlers={ eventHandlers }
              maxValue={ totalReviews }
              value={ el.value }
              color={ color }/>
          )) }
        </div>
        <div className="values">
          { reviewData.map((el, i) => (
            <span key={ i }>{ el.value }</span>
          )) }
        </div>
      </div>
    </div>
  );
};

const MultiColorReview = props => {
  const { width, average, maxValue, color, iconSize, totalReviews, reviewData, localizations, eventHandlers } = props;
  return (
    <div className="multiColorReview" style={ { 'width': width } }>
      <div className="top-container">
        <div className="average-value">{ average }</div>
        <IconRow
          Empty={ EmptyHeart }
          Filled={ FilledHeart }
          maxValue={ maxValue }
          value={ average }
          color={ color }
          size={ iconSize }
        />
        <div className="total-reviews">{ totalReviews } { localizations.reviewsText }</div>
      </div>
      <div className="data-container">
        <div className="numbers">
          { reviewData.map((_, i) => (<span key={ i }>{ maxValue - i }</span>)) }
        </div>
        <div className="progress-bar-container">
          { reviewData.map(({ value, color }, i) => (
            <ProgressBar
              key={ i }
              eventHandlers={ eventHandlers }
              maxValue={ totalReviews }
              value={ value }
              color={ color }
            />
          )) }
        </div>
        <div className="percents">
          { reviewData.map(({ value }, i) => {
            const precent = Math.round(calculatePercent(value, totalReviews));

            return (<span key={ i }>{ `${ precent }%` }</span>);
          }) }
        </div>
        <div className="values">
          { reviewData.map(({ value }, i) => (<span key={ i }>{ value }</span>)) }
        </div>
      </div>
    </div>
  );
};

export const ViewsMap = {
  oneColor  : OneColorReview,
  twoColor  : TwoColorReview,
  multiColor: MultiColorReview,
};
