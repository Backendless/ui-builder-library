import { useChartData } from './hooks/use-chart-data';

export function Bar({ name, goal, progress }) {
  const { shownGoal, barFillStyle, shownProgress } = useChartData(goal, progress);

  return (
    <div className="chart__item">
      <div className="chart__name-wrap">
        <a className="chart__name" href="#">{ name }</a>
      </div>
      <div className="chart__bar">
        <div className="chart__bar-fill" style={ barFillStyle }></div>
        <div class="chart__bar-info">
          <div class="chart__bar-info-triangle" />
          <div class="chart__bar-info-rectangle">{ `${ shownProgress } / ${ shownGoal }` }</div>
        </div>
      </div>
    </div>
  );
}
