import { useState, useEffect } from 'react';

import { useChartData } from './use-chart-data';

const { cn } = BackendlessUI.CSSUtils;
const GOAL = 'GOAL';

export default function GaugeChartComponent({ component }) {
  const { classList, display, disable, goal, progress, style } = component;

  const [validateGoal, setValidateGoal] = useState(1);
  const [validateProgress, setValidateProgress] = useState(0);

  component.getGoal = () => validateGoal;
  component.setGoal = goal => setValidateGoal(validate(goal, 'GOAL'));
  component.getProgress = () => validateProgress;
  component.setProgress = progress => setValidateProgress(validate(progress));

  useEffect(() => {
    setValidateGoal(validate(goal, 'GOAL'));
    setValidateProgress(validate(progress));
  }, [goal, progress]);

  const { shownGoal, shownProgress, angleFillStyle, progressPercentage } = useChartData(validateGoal, validateProgress);

  const decorationLetter = validateGoal >= 1000 ? shownGoal.charAt(shownGoal.length - 1) : '';

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-gaugeChart', ...classList, { disable }) } style={ style }>
      <div className="gauge-chart">
        <div className="gauge-chart__wrap">
          <div className="gauge-chart__body"></div>
          <div className="gauge-chart__fill" style={ angleFillStyle }></div>
          <div className="gauge-chart__cover">
            <span className="gauge-chart__progress-number">{ shownProgress }</span>
            <div className="gauge-chart__progress-percent">
              <span>{ `${ progressPercentage }% ` }</span>
              <span>complete</span>
            </div>
          </div>
        </div>
        <GaugeChartInfo decorationLetter={ decorationLetter } shownGoal={ shownGoal } />
      </div>
    </div>
  );
}

function GaugeChartInfo({ decorationLetter, shownGoal }) {
  return (
    <div className="gauge-chart__info">
      <div className="gauge-chart__info-wrap">
        <span>{ `0${ decorationLetter }` }</span>
      </div>
      <div className="gauge-chart__info-wrap">
        <span>{ shownGoal }</span>
      </div>
    </div>
  );
}

const validate = (item, type) => {
  if (type === GOAL) {
    return item <= 0 ? 1 : item;
  }

  return item < 0 ? 0 : item;
};
