import { decorateNumber } from './decorate-number';

const { cn } = BackendlessUI.CSSUtils;

export default function GaugeChartComponent({ component }) {
  const { classList, display, disable, goal, progress } = component;

  const percentOfProgress = (progress / (goal / 100)).toFixed(2);
  const percentOfTurn = (percentOfProgress > 100 ? 100 : percentOfProgress) / 200;

  const fillTurnPercentStyle = { transform: `rotate(${percentOfTurn}turn)` };

  const decoratedGoal = decorateNumber(String(goal));
  const decoratedProgress = decorateNumber(String(progress));
  const decorationLetter = decoratedGoal.charAt(decoratedGoal.length - 1);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-gaugeChart', ...classList, { disable }) }>
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
