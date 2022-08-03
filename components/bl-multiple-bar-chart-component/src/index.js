import { useState, useEffect } from 'react';

import { validate } from './validate';
import { Bar } from './bar';

const { cn } = BackendlessUI.CSSUtils;
const percentageMarksList = [0, 25, 50, 75, 100];

export default function MultipleBarChartComponent({ component }) {
  const { disable, classList, data } = component;

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(validate(data));
  }, [data])

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-multipleBarChart', ...classList, { disable }) }>
      <div className="chart">
        <div className="chart__items">
          <div className="chart__grids">
            { percentageMarksList.map(item => (
              <div className="chart__y-grid-line" style={{ left: `${item}%`}} />
            )) }
          </div>
          { chartData.length > 0 && chartData.map(({ objectId, name, goal, progress }) => (
            <Bar
              key={ objectId }
              name={ name ? name : 'Name' }
              goal={ goal ? goal : 1 }
              progress={ progress ? progress : 0 }
            />
          )) }
        </div>
        <div className="chart__percentage-marks">
          { percentageMarksList.map(item => (
            <div className="chart__percentage-marks-item" style={{ left: `${item}%`}}>{ `${item}%` }</div>
          )) }
        </div>
      </div>
    </div>
  );
}
