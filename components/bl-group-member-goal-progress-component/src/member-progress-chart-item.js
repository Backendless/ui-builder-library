import { decorateNumber } from './decorate-number';

export function MemberProgressChartItem({ name, goal, progress }) {
  const chartFillPercent = {
    width: `${ (progress / (goal / 100)).toFixed(2) }%`,
  };
  
  const decoratedProgress = decorateNumber(String(progress));
  
  return (
    <div className="chart__item">
      <div className="chart__name-wrap">
        <a className="chart__name" href="#">{ name }</a>
      </div>
      <div className="chart__bar">
        <div className="chart__fill" style={ chartFillPercent }></div>
        <div class="chart__shape-container">
          <div class="chart__shape-triangle"></div>
          <div class="chart__shape-rectangle">{ decoratedProgress }</div>
        </div>
      </div>
    </div>
  );
};