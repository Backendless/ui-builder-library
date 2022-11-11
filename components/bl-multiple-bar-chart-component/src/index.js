import { useState, useEffect } from 'react';

import { Bar } from './bar';
import { validate } from './validate';
import { useGridMarks } from './hooks/use-grid-marks';

const { cn } = BackendlessUI.CSSUtils;

export default function MultipleBarChartComponent({ component }) {
  const { classList, style, display, disabled, data, visibility, gridMarks } = component;

  const [chartData, setChartData] = useState([]);
  const marksList = useGridMarks(gridMarks);

  const classes = cn(
    'bl-customComponent-multipleBarChart', classList,
    { 'bl-customComponent-multipleBarChart--disabled': disabled }
  );

  useEffect(() => {
    setChartData(validate(data));
  }, [data])

  if (!display) {
    return null;
  }

  return (
    <div
      style={ style }
      className={ classes }>
      <div className="chart">
        <div className="chart__items">
          { visibility &&
            <div className="chart__grids">
              { marksList.map(item => (
                <div className="chart__y-grid-line" style={{ left: `${ item }%`}} />
              )) }
            </div>
          }
          { chartData.length > 0 && chartData.map(({ objectId, name, goal, progress }) => (
            <Bar
              key={ objectId }
              name={ name || 'Name' }
              goal={ goal ? goal : 1 }
              progress={ progress || 0 }
            />
          )) }
        </div>
        { visibility &&
          <div className="chart__percentage-marks">
            { marksList.map(item => (
              <div className="chart__percentage-marks-item" style={{ left: `${ item }%`}}>{ `${ item }%` }</div>
            )) }
          </div>
        }
      </div>
    </div>
  );
}
