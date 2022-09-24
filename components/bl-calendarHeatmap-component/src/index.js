import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import CalendarHeatmap from './lib/react-calendar-heatmap.umd.min';
import ReactTooltip from './lib/react-tooltip.min';
import { Legend } from './subcomponents';
import { validate, shadeColor, shiftDate } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

const today = new Date();

export default function CalendarHeatmapComponent({ component, eventHandlers }) {
  const {
    style,
    display,
    classList,
    calendarData,
    monthLabels,
    weekdayLabels,
    color,
    legend,
    showMonthLabels,
    showWeekdayLabels
  } = component;
  const { onClick } = eventHandlers;

  const ref = useRef();

  const [legendWidth, setLegendWidth] = useState(0);

  const month = useMemo(() => validate(monthLabels), [monthLabels]);
  const weeks = useMemo(() => validate(weekdayLabels), [weekdayLabels]);

  const colors = useMemo(() => ({
    'color-cell-1': shadeColor(color, 120),
    'color-cell-2': shadeColor(color, 80),
    'color-cell-3': shadeColor(color, 40),
    'color-cell-4': color
  }), [])

  useEffect(() => {
    if (color) {
      ref.current.querySelectorAll('.color-cell-1, .color-cell-2, .color-cell-3, .color-cell-4').forEach((element, index) => {
        element.style.fill = colors[element.classList[0]];
      });
    }
  }, [color]);

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
    }
  }, [ref.current]);

  if (!display || !calendarData) {
    return null;
  }

  return (
    <div ref={ ref } className={ cn('bl-customComponent-calendarHeatmap', classList) } style={ { style } }>
      <CalendarHeatmap
        values={ calendarData }
        startDate={ shiftDate(today, -calendarData.length) }
        endDate={ today }
        showMonthLabels={ showMonthLabels }
        showWeekdayLabels={ showWeekdayLabels }
        monthLabels={ month }
        weekdayLabels={ weeks }
        classForValue={ getClassForValue }
        tooltipDataAttrs={ getTooltipData }
        onClick={ (value) => onClick({ value }) }
      />
      <ReactTooltip/>
      <Legend legend={ legend } width={ legendWidth }/>
    </div>
  );
}

const getClassForValue = (value) => value ? `color-cell-${ value.count }` : 'color-empty';

const getTooltipData = (value) => {
  return { 'data-tip': `${ value.date.toISOString().slice(0, 10) } has count: ${ value.count }`, };
};
