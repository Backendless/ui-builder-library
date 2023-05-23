import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import CalendarHeatmap from './lib/react-calendar-heatmap.umd.min';
import ReactTooltip from './lib/react-tooltip.min';
import { generateData, getSaturationByCount, hexToHSL, shiftDate, validate } from './helpers';
import { Legend } from './subcomponents';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export const today = new Date();
const WEEKDAY_LABELS_RIGHT_SPACE = 10;

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
    width : normalizeDimensionValue(width),
    height: normalizeDimensionValue(height),
  }), [style, width, height]);

  const hslColor = useMemo(() => hexToHSL(color), [color]);

  const newCalendarData = useMemo(() => {
    return calendarData && numberDays ? generateData(numberDays, calendarData) : calendarData;
  }, [numberDays, calendarData]);

  const maxCount = useMemo(() => getMaxCalendarCount(calendarData), [calendarData]);

  const month = useMemo(() => validate(monthLabels), [monthLabels]);
  const weeks = useMemo(() => validate(weekdayLabels), [weekdayLabels]);

  const handleResize = useCallback(() => {
    const weekdayLabels = ref.current.querySelector('.react-calendar-heatmap-weekday-labels');

    setLegendMargin(weekdayLabels.getBoundingClientRect().width + WEEKDAY_LABELS_RIGHT_SPACE);
  }, []);

  useEffect(() => {
    if (ref.current && legendRef.current) {
      handleResize();
      window.addEventListener('resize', handleResize, false);

      const calendar = ref.current.querySelector('svg');

      calendar.style.height = `calc(100% - ${ legendRef.current.clientHeight }px)`;
      calendar.style.width = '100%';
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
      <div className="wrapper">
        <CalendarHeatmap
          values={ newCalendarData }
          startDate={ shiftDate(today, newCalendarData.length) }
          endDate={ today }
          showMonthLabels={ showMonthLabels }
          showWeekdayLabels={ showWeekdayLabels }
          monthLabels={ month }
          weekdayLabels={ weeks }
          tooltipDataAttrs={ getTooltipData }
          transformDayElement={ (element, value) => TransformDayElement(element, value, maxCount, hslColor) }
          onClick={ ({ date, count }) => onCellClick({ date, count }) }
        />
        <Legend
          maxCount={ maxCount }
          hslColor={ hslColor }
          legendRef={ legendRef }
          legend={ legend }
          margin={ legendMargin }
        />
      </div>
      <ReactTooltip/>
    </div>
  );
}

const TransformDayElement = (element, value, maxCount, hslColor) => {
  const newElement = React.cloneElement(element, { title: value.date });
  const rateOfSaturation = getSaturationByCount(maxCount, value.count);
  const { h, l } = hslColor;

  newElement.props.fill = value.count ? `hsl(${ h }, ${ rateOfSaturation }%, ${ l }%)` : '#eee';

  return newElement;
};

const getTooltipData = value => {
  const date = new Date(value.date);

  return { 'data-tip': `${ date.toISOString().slice(0, 10) } has count: ${ value.count }` };
};

const getMaxCalendarCount = calendarData => {
  const counts = calendarData.map(value => value.count);

  return Math.max(...counts);
};
