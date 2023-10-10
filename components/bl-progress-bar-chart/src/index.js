import { useEffect, useState } from 'react';

import { Bar } from './bar';
import { useGridMarks, validate } from './helpers';

const { cn } = BackendlessUI.CSSUtils;
const HORIZONTAL = 'horizontal-bars';

export default function ProgressBarChartComponent({ component, elRef }) {
  const {
    classList, style, display, disabled, gridVisibility, chartOrientation, gridMarks, height, width, data,
  } = component;

  const [chartData, setChartData] = useState([]);
  const marksList = useGridMarks(gridMarks);
  const isHorizontal = chartOrientation === HORIZONTAL;

  useEffect(() => {
    setChartData(validate(data));
  }, [data]);

  const classes = cn(
    'bl-customComponent-progressBarChart', classList,
    `bl-customComponent-progressBarChart--${ chartOrientation }`,
    { 'bl-customComponent-progressBarChart--disabled': disabled }
  );

  const styles = { ...style, height, width };

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } style={ styles } className={ classes }>
      <div className="chart">
        <div className="chart__items">
          { gridVisibility && <Grids marksList={ marksList } isHorizontal={ isHorizontal }/> }
          { chartData.map(({ id, name, goal, progress }) => (
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
        { gridVisibility && <PercentageMarks marksList={ marksList } isHorizontal={ isHorizontal }/> }
      </div>
    </div>
  );
}

function Grids({ marksList, isHorizontal }) {
  return (
    <div className="chart__grids">
      { marksList.map(item => (
        <div
          key={ item }
          className="chart__y-grid-line"
          style={{ [isHorizontal ? 'left' : 'bottom']: `${ item }%` }}
        />
      )) }
    </div>
  );
}

function PercentageMarks({ marksList, isHorizontal }) {
  const side = isHorizontal ? 'left' : 'bottom';

  return (
    <div className="chart__percentage-marks">
      { marksList.map(item => (
        <div key={ item } className="chart__percentage-marks-item" style={{ [side]: `${ item }%` }}>
          { `${ item }%` }
        </div>
      )) }
    </div>
  );
}
