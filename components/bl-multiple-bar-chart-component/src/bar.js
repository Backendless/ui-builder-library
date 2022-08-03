import { decorateNumber } from './decorate-number';

export function Bar({ name, goal, progress }) {
  const barFillPercent = {
    width: `${ (progress / (goal / 100)).toFixed(2) }%`,
  };
  
  const decoratedGoal = decorateNumber(String(goal));
  const decoratedProgress = decorateNumber(String(progress));
  
  return (
    <div className="chart__item">
      <div className="chart__name-wrap">
        <a className="chart__name" href="#">{ name }</a>
      </div>
      <div className="chart__bar">
        <div className="chart__bar-fill" style={ barFillPercent }></div>
        <div class="chart__bar-info">
          <div class="chart__bar-info-triangle" />
          <div class="chart__bar-info-rectangle">{ `${decoratedProgress} / ${decoratedGoal}` }</div>
        </div>
      </div>
    </div>
  );
}