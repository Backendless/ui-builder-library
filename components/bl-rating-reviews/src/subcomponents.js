import { calculatePercent } from './helpers';
import { IconsMap } from './icons';

export const IconRow = ({ iconType, maxValue, value, color, size }) => {
  const styleObject = { 'fill': color, 'width': size, 'height': size };
  const resultRow = Array.from({ length: maxValue }, (_, i) => {
    const typedIcons = IconsMap[iconType];
    const Icon = i + 1 <= value ? typedIcons.filled : typedIcons.empty;

    return (<Icon key={ i }/>);
  });

  return (
    <div className="icon-row">
      { resultRow.map((el, key) => (
        <span className="icon" style={ styleObject } key={ key }>{ el }</span>)
      ) }
    </div>
  );
};

export const Percents = ({ reviewData, totalReviews }) => {
  const percentsArray = reviewData.map(({ value }) => Math.round(calculatePercent(value, totalReviews)));

  return (
    <div className="percents">
      { percentsArray.map((percent, i) => (<span key={ i }>{ `${ percent }%` }</span>)) }
    </div>
  );
};

export const ProgressBarContainer = ({ reviewData, eventHandlers, totalReviews, mainColor }) => {

  return (
    <div className="progress-bar-container">
      { reviewData.map(({ value, color = mainColor }, i) => (
        <ProgressBar
          key={ i }
          eventHandlers={ eventHandlers }
          maxValue={ totalReviews }
          value={ value }
          color={ color }
        />
      )) }
    </div>
  );
};

const ProgressBar = ({ value, maxValue, color, eventHandlers: { getRatingScore } }) => {
  const percent = `${ Math.round(value * 100 / maxValue) }%`;

  const onClickHandler = () => getRatingScore({ score: value });

  return (
    <div className="progress-bar" onClick={ onClickHandler }>
      <div className="progress-bar-fill" style={ { 'width': percent, 'background': color } }/>
    </div>
  );
};

export const Scores = ({ reviewData }) => (
  <div className="scores">
    { reviewData.map((_, i) => (<span key={ i }>{ reviewData.length - i }</span>)) }
  </div>
);
