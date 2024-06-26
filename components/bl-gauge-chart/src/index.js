import { useChartData } from './use-chart-data';

const { cn } = BackendlessUI.CSSUtils;

export default function GaugeChartComponent({ component }) {
  const { classList, style, display, disabled, goal, progress } = component;

  const {
    shownGoal, shownProgress, angleFillStyle, progressPercentage, decorationLetter,
  } = useChartData(goal, progress, component);

  if (!display) {
    return null;
  }

  return (
    <div
      style={ style }
      className={ cn('bl-customComponent-gaugeChart', classList, { 'bl-customComponent-gaugeChart--disabled': disabled }) }>
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
