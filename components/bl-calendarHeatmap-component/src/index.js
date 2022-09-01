import { useMemo, useEffect, useRef } from 'react';
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

  const month = useMemo(() => validate(monthLabels), [monthLabels]);
  const weeks = useMemo(() => validate(weekdayLabels), [weekdayLabels]);

  useEffect(() => {
    if (color) {
      ref.current.querySelectorAll('.color-cell-1').forEach((element) => {
        element.style.fill = shadeColor(color, 120);
      });
      ref.current.querySelectorAll('.color-cell-2').forEach((element) => {
        element.style.fill = shadeColor(color, 80);
      });
      ref.current.querySelectorAll('.color-cell-3').forEach((element) => {
        element.style.fill = shadeColor(color, 40);
      });
      ref.current.querySelectorAll('.color-cell-4').forEach((element) => {
        element.style.fill = color;
      });
    }
  }, [color]);

  const handlerClassFroValue = (value) => value ? `color-cell-${ value.count }` : 'color-empty';

  const handlerTooltipDataAttrs = (value) => {
    return { 'data-tip': `${ value.date.toISOString().slice(0, 10) } has count: ${ value.count }`, };
  };

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
        classForValue={ handlerClassFroValue }
        tooltipDataAttrs={ handlerTooltipDataAttrs }
        onClick={ (value) => onClick({ value }) }
      />
      <ReactTooltip/>
      <Legend space={ showWeekdayLabels } legend={ legend }/>
    </div>
  );
}
