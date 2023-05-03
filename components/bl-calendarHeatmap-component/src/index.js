import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import CalendarHeatmap from './lib/react-calendar-heatmap.umd.min';
import ReactTooltip from './lib/react-tooltip.min';
import { generateData, shadeColor, shiftDate, validate } from './helpers';
import { Legend } from './subcomponents';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export const today = new Date();
const COLORS_COUNT = 4;

export default function CalendarHeatmapComponent({ component, eventHandlers }) {
  const {
    style, display, classList, calendarData, numberDays, monthLabels, weekdayLabels,
    color, legend, showMonthLabels, showWeekdayLabels, width, height,
  } = component;
  const { onCellClick } = eventHandlers;

  const ref = useRef();
  const legendRef = useRef();

  const [legendMargin, setLegendMargin] = useState(0);

  const rootStyle = useMemo(() => ({
    ...style,
    width: normalizeDimensionValue(width),
    height: normalizeDimensionValue(height),
  }), [style, width, height]);

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
  }, [color, colors, ref, newCalendarData]);

  const handleResize = useCallback(() => {
    setLegendMargin(ref.current.querySelector('.react-calendar-heatmap-weekday-labels').getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    if (ref.current && legendRef.current) {
      handleResize();
      window.addEventListener('resize', handleResize, false);

      const calendar = ref.current.querySelector('svg');

      calendar.style.height = `calc(100% - ${legendRef.current.clientHeight}px)`;
    }

    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, [ref.current, legendRef.current]);

  if (!display || !newCalendarData) {
    return null;
  }

  return (
    <div ref={ ref } className={ cn('bl-customComponent-calendarHeatmap', classList) } style={ rootStyle }>
      <CalendarHeatmap
        values={ newCalendarData }
        startDate={ shiftDate(today, newCalendarData.length) }
        endDate={ today }
        showMonthLabels={ showMonthLabels }
        showWeekdayLabels={ showWeekdayLabels }
        monthLabels={ month }
        weekdayLabels={ weeks }
        classForValue={ value => getClassForValue(value, calendarData) }
        tooltipDataAttrs={ getTooltipData }
        onClick={ ({ date, count }) => onCellClick({ date, count }) }
      />
      <ReactTooltip/>
      <Legend legendRef={ legendRef } legend={ legend } margin={ legendMargin + 12 }/>
    </div>
  );
}

const getClassForValue = (value, calendarData) => {
  if (value) {
    const { count } = value;
    const maxCount = getMaxCalendarCount(calendarData);
    const part = maxCount / COLORS_COUNT;

    for (let i = 1; i <= COLORS_COUNT; i++) {
      if (count <= part * i) {
        return `color-cell-${ i }`;
      }
    }
  }

  return 'color-empty';
};

const getTooltipData = value => {
  const date = new Date(value.date);

  return { 'data-tip': `${ date.toISOString().slice(0, 10) } has count: ${ value.count }` };
};

const getMaxCalendarCount = calendarData => {
  const counts = calendarData.map(value => value.count);

  return Math.max(...counts);
};

