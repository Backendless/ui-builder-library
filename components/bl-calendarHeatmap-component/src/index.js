import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import CalendarHeatmap from './lib/react-calendar-heatmap.umd.min';
import ReactTooltip from './lib/react-tooltip.min';
import { generateData, shadeColor, shiftDate, validate } from './helpers';
import { Legend } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export const today = new Date();

export default function CalendarHeatmapComponent({ component, eventHandlers }) {
  const {
    style, display, classList, calendarData, numberDays, monthLabels,
    weekdayLabels, color, legend, showMonthLabels, showWeekdayLabels,
  } = component;
  const { onCellClick } = eventHandlers;

  const ref = useRef();

  const [legendWidth, setLegendWidth] = useState(0);

  const newCalendarData = useMemo(() => {
    return calendarData && numberDays ? generateData(numberDays, calendarData) : calendarData;
  }, [numberDays, calendarData]);

  const month = useMemo(() => validate(monthLabels), [monthLabels]);
  const weeks = useMemo(() => validate(weekdayLabels), [weekdayLabels]);

  const colors = useMemo(() => ({
    'color-cell-1': shadeColor(color, 120),
    'color-cell-2': shadeColor(color, 80),
    'color-cell-3': shadeColor(color, 40),
    'color-cell-4': color,
  }), [color]);

  useEffect(() => {
    if (color && ref.current) {
      ref.current.querySelectorAll('.color-cell-1, .color-cell-2, .color-cell-3, .color-cell-4').forEach(element => {
        element.style.fill = colors[element.classList[0]];
      });
    }
  }, [color, ref, newCalendarData]);

  const handleResize = useCallback(() => {
    setLegendWidth(ref.current.querySelector('.react-calendar-heatmap-all-weeks').getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    if (ref.current) {
      handleResize();
      window.addEventListener('resize', handleResize, false);
    }

    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, [ref.current]);

  if (!display || !newCalendarData) {
    return null;
  }

  return (
    <div ref={ ref } className={ cn('bl-customComponent-calendarHeatmap', classList) } style={ style }>
      <CalendarHeatmap
        values={ newCalendarData }
        startDate={ shiftDate(today, newCalendarData.length) }
        endDate={ today }
        showMonthLabels={ showMonthLabels }
        showWeekdayLabels={ showWeekdayLabels }
        monthLabels={ month }
        weekdayLabels={ weeks }
        classForValue={ getClassForValue }
        tooltipDataAttrs={ getTooltipData }
        onClick={ ({ date, count }) => onCellClick({ date, count }) }
      />
      <ReactTooltip/>
      <Legend legend={ legend } width={ legendWidth }/>
    </div>
  );
}

const getClassForValue = value => value ? `color-cell-${ value.count }` : 'color-empty';

const getTooltipData = value => {
  const date = new Date(value.date);

  return { 'data-tip': `${ date.toISOString().slice(0, 10) } has count: ${ value.count }` };
};
