import { useMemo } from 'react';

import { decorateNumber } from './decorate-number';

export default function AnnualGoalComponent({ component }) {
  const { classList, display, disable, goal, progress } = component;

  const classes = useAnnualGoalClassList(classList, disable);

  const percentOfProgress = (progress / (goal / 100)).toFixed(2);
  const percentOfTurn = (percentOfProgress > 100 ? 100 : percentOfProgress) / 200;

  const fillTurnPercentStyle = { transform: `rotate(${percentOfTurn}turn)` };

  const decoratedGoal = decorateNumber(String(goal));
  const decoratedProgress = decorateNumber(String(progress));
  const decorationLetter = decoratedGoal.charAt(decoratedGoal.length - 1);

  if (!display) {
    return;
  }

  return (
    <div className={ classes }>
      <div className="gauge-chart">
        <div className="gauge-chart__wrap">
          <div className="gauge-chart__body"></div>
          <div className="gauge-chart__fill" style={fillTurnPercentStyle}></div>
          <div className="gauge-chart__cover">
            <span className="gauge-chart__progress-number">{ decoratedProgress }</span>
            <div className="gauge-chart__progress-percent">
              <span>{ `${ percentOfProgress }% ` }</span>
              <span>complete</span>
            </div>
          </div>
        </div>
        <div className="gauge-chart__info">
          <div className="gauge-chart__info-wrap">
            <span>{ `0${ decorationLetter }` }</span>
          </div>
          <div className="gauge-chart__info-wrap">
            <span>{ decoratedGoal }</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const useAnnualGoalClassList = (classList, disable) => {
  return useMemo(() => {
    const classes = ['bl-customComponent-annualGoal', ...classList];

    if (disable) {
      classes.push('disable');
    }

    return classes.join(' ');
  }, [classList, disable]);
};
