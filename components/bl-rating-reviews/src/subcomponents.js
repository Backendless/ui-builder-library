import { useMemo } from 'react';

import { calculatePercent } from './helpers';
import { IconsMap } from './icons';

export const IconRow = ({ iconType, maxValue, value, color, size }) => {
  const styles = useMemo(() => ({ fill: color, width: size, height: size }), [color, size]);

  const { FilledIcon, EmptyIcon } = useMemo(() => ({
    FilledIcon: IconsMap[iconType].filled,
    EmptyIcon: IconsMap[iconType].empty,
  }), [iconType]);

  const resultRow = Array.from({ length: maxValue }, (_, i) => {
    const Icon = value > i + 1 ? FilledIcon : EmptyIcon;

    return (<Icon key={ i }/>);
  });

  return (
    <div className="icon-row">
      { resultRow.map((el, key) => (
        <span className="icon" style={ styles } key={ key }>{ el }</span>)
      ) }
    </div>
  );
};

export const Percents = ({ reviewData, totalReviews }) => {
  const percentsArray = useMemo(() => {
    return reviewData.map(({ value }) => Math.round(calculatePercent(value, totalReviews)));
  }, [reviewData, totalReviews]);

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
  const percent = useMemo(() => (`${ Math.round(value * 100 / maxValue) }%`), [value, maxValue]);
  const styles = useMemo(() => ({ width: percent, background: color }), [percent, color]);

  const onClickHandler = () => getRatingScore({ score: value });

  return (
    <div className="progress-bar" onClick={ onClickHandler }>
      <div className="progress-bar-fill" style={ styles }/>
    </div>
  );
};

export const Scores = ({ reviewData }) => (
  <div className="scores">
    { reviewData.map((_, i) => (<span key={ i }>{ reviewData.length - i }</span>)) }
  </div>
);
