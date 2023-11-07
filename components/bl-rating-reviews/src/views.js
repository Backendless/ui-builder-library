import { useMemo } from 'react';

import { IconsMap } from './icons';
import { IconRow, Percents, ProgressBarContainer, Scores } from './subcomponents';

const StandardReview = props => {
  const {
    average, maxValue, color, iconType, iconSize, totalReviews, reviewData, localizations,
    eventHandlers,
  } = props;

  const styles = useMemo(() => ({ color }), [color]);

  return (
    <div className="oneColorReview" style={ styles }>
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
            iconType={ iconType }
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
                iconType={ iconType }
                maxValue={ maxValue }
                value={ maxValue - i }
                color={ color }
                size={ iconSize }
              />
              <span className="value">{ value }</span>
            </div>
          )) }
        </div>
        <ProgressBarContainer
          reviewData={ reviewData }
          eventHandlers={ eventHandlers }
          totalReviews={ totalReviews }
          mainColor={ color }
        />
      </div>
    </div>
  );
};

const SimpleReview = props => {
  const { maxValue, color, iconType, iconSize, totalReviews, reviewData, eventHandlers } = props;

  const Icon = useMemo(() => (IconsMap[iconType].filled), [iconType]);

  return (
    <div className="twoColorReview">
      <div className="data-container">
        <div className="icons">
          { reviewData.map((el, i) => (
            <div className="icon-container" key={ i } style={{ "height": iconSize, "width": iconSize }}>
              <span className="number" style={{ "fontSize": iconSize }}>{ maxValue - i }</span>
              <span className="icon">
                <Icon />
              </span>
            </div>
          )) }
        </div>
        <ProgressBarContainer
          reviewData={ reviewData }
          eventHandlers={ eventHandlers }
          totalReviews={ totalReviews }
          mainColor={ color }
        />
        <div className="values">
          { reviewData.map((el, i) => (
            <span key={ i }>{ el.value }</span>
          )) }
        </div>
      </div>
    </div>
  );
};

const DetailedReview = props => {
  const {
    average, maxValue, color, iconType, iconSize, totalReviews, reviewData, localizations, eventHandlers,
  } = props;

  return (
    <div className="multiColorReview">
      <div className="top-container">
        <div className="average-value">{ average }</div>
        <IconRow
          iconType={ iconType }
          color={ color }
          size={ iconSize }
          value={ average }
          maxValue={ maxValue }
        />
        <div className="total-reviews">{ totalReviews } { localizations.reviewsText }</div>
      </div>
      <div className="data-container">
        <Scores reviewData={ reviewData }/>
        <ProgressBarContainer
          reviewData={ reviewData }
          eventHandlers={ eventHandlers }
          totalReviews={ totalReviews }
          mainColor={ color }
        />
        <Percents reviewData={ reviewData } totalReviews={ totalReviews }/>
        <div className="values">
          { reviewData.map(({ value }, i) => (<span key={ i }>{ value }</span>)) }
        </div>
      </div>
    </div>
  );
};

export const ViewsMap = {
  standard: StandardReview,
  simple  : SimpleReview,
  detailed: DetailedReview,
};
