import { useState, useEffect, useMemo } from 'react';

import { Bar } from './bar';

import { validate, useGridMarks } from './helpers';

const { cn } = BackendlessUI.CSSUtils;
const HORIZONTAL = 'horizontal-bars';

export default function ProgressBarChartComponent({ component }) {
  const {
    classList, style, display, disabled, visibility, chartOrientation, gridMarks, height, width, data
  } = component;

  const [chartData, setChartData] = useState([]);
  const marksList = useGridMarks(gridMarks);
  const isHorizontal = useMemo(() => chartOrientation === HORIZONTAL, [chartOrientation]);

  useEffect(() => {
    setChartData(validate(data));
  }, [data]);

  const classes = cn(
    'bl-customComponent-progressBarChart', classList,
    `bl-customComponent-progressBarChart--${chartOrientation}`,
    { 'bl-customComponent-progressBarChart--disabled': disabled }
  );

  const styles = { ...style, height, width };

  if (!display) {
    return null;
  }

  return (
    <div
      style={ styles }
      className={ classes }>
      <div className="chart">
        <div className="chart__items">
          { visibility &&
            <div className="chart__grids">
              { marksList.map(item => (
                <div className="chart__y-grid-line" style={{ [isHorizontal ? 'left' : 'bottom']: `${ item }%` }} />
              )) }
            </div>
          }
          { chartData.length > 0 && chartData.map(({ id, name, goal, progress }) => (
            <Bar
              key={ id }
              name={ name }
              goal={ goal }
              progress={ progress }
              chartOrientation={ chartOrientation }
              isHorizontal={ isHorizontal }
            />
          )) }
        </div>
        { visibility &&
          <div className="chart__percentage-marks">
            { marksList.map(item => (
              <div
                className="chart__percentage-marks-item"
                style={{ [isHorizontal ? 'left' : 'bottom']: `${ item }%`}}>
                { `${ item }%` }
              </div>
            )) }
          </div>
        }
      </div>
    </div>
  );
}
