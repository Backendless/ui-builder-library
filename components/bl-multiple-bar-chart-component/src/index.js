import { useState, useEffect } from 'react';

import { Bar } from './bar';
import { validate } from './validate';

const { cn } = BackendlessUI.CSSUtils;

export default function MultipleBarChartComponent({ component }) {
  const { classList, display, disable, data, gridVisibility, gridMarks, style } = component;

  const [chartData, setChartData] = useState([]);

  const marksList = gridMarks.split(', ');

  useEffect(() => {
    setChartData(validate(data));
  }, [data])

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-multipleBarChart', ...classList, { disable }) } style={ style }>
      <div className="chart">
        <div className="chart__items">
          { gridVisibility &&
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
        { gridVisibility &&
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
