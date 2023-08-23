import { useEffect, useMemo } from 'react';

import CalHeatmap from './cal-heatmap.min';
import CalendarLabel from './cal-heatmap-calendar-label.min';
import Legend from './cal-heatmap-legend.min';
import LegendLite from './cal-heatmap-legend-lite.min';
import Tooltip from './cal-heatmap-tooltip.min';

const { cn } = BackendlessUI.CSSUtils;

export default function ComponentName({ component, eventHandlers, instanceId }) {
  const {
    display, classList, style, sourceDataUrl, dataType, data, range, sort, subType, type,
    datePropName, valuePropName, labelPosition, labelRotation, textAlign, labelOffsetX,
    labelOffsetY, labelHeight, labelWidth, min, max, scaleType, scaleColorScheme, scaleColorRange,
    scaleOpacityBaseColor, verticalOrientation, startDate, minDate, maxDate, highlightDate,
    defaultDataValue, cellHeight, cellWidth, subLabel, subGutter, subColorLabel, cellRadius,
    groupY, label, gutter, dynamicDimension, subSort, scaleDomain, legend, calendarLabel,
    animationDuration, theme,
  } = component;
  const { subColorLabelLogic, subLabelLogic, groupYLogic, labelLogic, onCellClick } = eventHandlers;

  const cal = useMemo(() => new CalHeatmap(), []);

  const maxValid = useMemo(() => max || (data && Math.max(...data.map(({ value }) => value))), [data, max]);
  const minValid = useMemo(() => min || (data && Math.min(...data.map(({ value }) => value))), [data, min]);

  useEffect(() => {
    cal.paint({
        range,
        date: {
          start    : startDate ? new Date(startDate) : new Date(),
          min      : minDate,
          max      : maxDate,
          highlight: highlightDate && prepareHighlights(highlightDate),
        },

        data: {
          source: sourceDataUrl || data,
          type  : dataType,
          x     : datePropName,
          y     : valuePropName,
          defaultDataValue,
          groupY: groupYLogic.hasLogic
            ? values => groupYLogic({ values })
            : groupY,
        },

        scale: scaleValidate(
          scaleColorRange, scaleColorScheme, scaleOpacityBaseColor,
          scaleType, scaleDomain, minValid, maxValid
        ),

        domain: {
          type,
          dynamicDimension,
          gutter,
          sort,
          label: {
            text    : labelLogic.hasLogic
              ? (timestamp, element) => labelLogic({ timestamp, element })
              : label,
            position: labelPosition,
            rotate  : labelRotation,
            textAlign,
            offset  : {
              x: labelOffsetX,
              y: labelOffsetY,
            },
            height  : labelHeight,
            width   : labelWidth,
          },
        },

        subDomain: {
          type  : subType,
          sort  : subSort,
          width : cellWidth,
          height: cellHeight,
          label : subLabelLogic.hasLogic
            ? (timestamp, value, element) => subLabelLogic({ timestamp, value, element })
            : subLabel,
          color : subColorLabelLogic.hasLogic
            ? (timestamp, value, backgroundColor) => subColorLabelLogic({ timestamp, value, backgroundColor })
            : subColorLabel,
          gutter: subGutter,
          radius: cellRadius,
        },

        verticalOrientation,
        animationDuration,
        theme,
        itemSelector: `#cal-heatmap-${ instanceId }`,
      },
      [
        [Tooltip],
        [
          Legend,
          {
            enabled     : legend === 'Legend',
            itemSelector: `#legend-label-${ instanceId }`,
          },
        ],
        [
          LegendLite,
          {
            enabled     : legend === 'LegendLite',
            itemSelector: `#legend-label-${ instanceId }`,
          },
        ],
        ...validateCalendarLabel(calendarLabel),
      ]);
  }, [cal, cellHeight, cellRadius, cellWidth, dataType, datePropName, defaultDataValue, highlightDate, instanceId,
    labelHeight, labelPosition, labelRotation, labelWidth, labelOffsetX, labelOffsetY, maxDate, maxValid, minDate,
    minValid, range, scaleColorRange, scaleColorScheme, scaleOpacityBaseColor, scaleType, sort, startDate,
    subColorLabel, subColorLabelLogic, subGutter, subLabel, subLabelLogic, subType, textAlign, type, valuePropName,
    verticalOrientation, sourceDataUrl, data, groupYLogic, groupY, scaleDomain, dynamicDimension, gutter, labelLogic,
    label, subSort, legend, calendarLabel]);

  useEffect(() => cal.on('click', (event, timestamp, value) => onCellClick({ event, timestamp, value })), []);

  component.goNext = steps => cal.next(steps);
  component.goPrev = steps => cal.previous(steps);
  component.jumpTo = (date, reset) => cal.jumpTo(date, reset);

  if (!display) {
    cal.destroy();

    return null;
  }

  return (
    <>
      <div
        id={ `cal-heatmap-${ instanceId }` }
        className={ cn('bl-customComponent-calendar-heatmap', classList) }
        style={ style }
      ></div>
      <div id={ `legend-label-${ instanceId }` }></div>
    </>
  );
}

const scaleValidate = (
  scaleColorRange, scaleColorScheme, scaleOpacityBaseColor,
  scaleType, scaleDomain, minValid, maxValid
) => {
  if (scaleColorScheme || scaleColorRange) {
    return {
      color: {
        range : scaleColorRange && scaleColorRange.split(',').map(item => item.trim()),
        scheme: scaleColorScheme,
        type  : scaleType,
        domain: scaleDomain ? scaleDomain.split(',').map(item => Number(item.trim())) : [minValid, maxValid],
      },
    };
  }

  return {
    opacity: {
      baseColor: scaleOpacityBaseColor,
      type     : scaleType,
      domain   : scaleDomain ? scaleDomain.split(',').map(item => Number(item.trim())) : [minValid, maxValid],
    },
  };
};

const prepareHighlights = highlightDate => highlightDate.split(',').map(date => new Date(date));

const validateCalendarLabel = calendarLabel => calendarLabel.map(item => [CalendarLabel, {
  ...item,
  text: () => item.text,
}]);
