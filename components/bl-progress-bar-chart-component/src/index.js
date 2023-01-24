import { useState, useEffect, useMemo, useRef } from 'react';

import { Bar } from './bar';

import { validate, useGridMarks } from './helpers';

const { cn } = BackendlessUI.CSSUtils;
const HORIZONTAL = 'horizontal-bars';

export default function ProgressBarChartComponent({ component }) {
  const {
    classList, style, display, disabled, visibility, chartOrientation, gridMarks, height, width, data
  } = component;

  const rootRef = useRef();
  const [chartData, setChartData] = useState([]);
  const marksList = useGridMarks(gridMarks);
  const isHorizontal = useMemo(() => chartOrientation === HORIZONTAL, [chartOrientation]);

  useEffect(() => { setChartData(validate(data)); }, [data]);
  useEffect(() => { component.el = rootRef.current; }, [rootRef]);

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
    <div ref={ rootRef } style={ styles } className={ classes }>
      <div className="chart">
        <div className="chart__items">
          { visibility && <Grids marksList={ marksList } isHorizontal={ isHorizontal } />}
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
        { visibility && <PercentageMarks marksList={ marksList } isHorizontal={ isHorizontal } /> }
      </div>
    </div>
  );
}

function Grids({ marksList, isHorizontal }) {
  return (
    <div className="chart__grids">
      { marksList.map(item => (
        <div className="chart__y-grid-line" style={{ [isHorizontal ? 'left' : 'bottom']: `${ item }%` }} />
      )) }
    </div>
  );
}

function PercentageMarks({ marksList, isHorizontal }) {
  return (
    <div className="chart__percentage-marks">
      { marksList.map(item => (
        <div
          className="chart__percentage-marks-item"
          style={{ [isHorizontal ? 'left' : 'bottom']: `${ item }%`}}>
          { `${ item }%` }
        </div>
      )) }
    </div>
  );
}
