import { useChartData } from './helpers';

export function Bar({ name, goal, progress, isHorizontal }) {
  const { shownGoal, barFillStyle, shownProgress } = useChartData(goal, progress, isHorizontal);

  return (
    <div className="chart__item">
      <div className="chart__name-wrap">
        <span className="chart__name">{ name }</span>
      </div>
      <div className="chart__bar">
        <div className="chart__bar-fill" style={ barFillStyle }></div>
        <div className="chart__bar-info">
          <div className="chart__bar-info-triangle" />
          <div className="chart__bar-info-rectangle">{ `${ shownProgress } / ${ shownGoal }` }</div>
        </div>
      </div>
    </div>
  );
}
