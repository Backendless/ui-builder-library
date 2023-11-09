import { useEffect, useMemo } from 'react';

import CalHeatmap from './lib/cal-heatmap.min';

import { ensureValidScale, shapeData, shapeDate, shapeDomain, shapePlugins, shapeSubDomain } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function ComponentName({ elRef, component, eventHandlers, instanceId }) {
  const {
    display, classList, style, sourceDataUrl, dataType, data, range, sort, subType, type,
    datePropName, valuePropName, labelPosition, labelRotation, textAlign, labelOffsetX,
    labelOffsetY, labelHeight, labelWidth, scaleType, scaleColorScheme, scaleColorRange,
    scaleOpacityBaseColor, verticalOrientation, startDate, minDate, maxDate, highlightDate,
    defaultDataValue, cellHeight, cellWidth, subLabel, subGutter, subColorLabel, cellRadius,
    groupY, label, gutter, dynamicDimension, subSort, scaleDomain, legend, calendarLabel,
    animationDuration, theme,
  } = component;
  const {
    subColorLabelLogic, subLabelLogic, groupYLogic,
    labelLogic, onCellClick, onMouseOver, onMouseOut,
  } = eventHandlers;

  const calHeatmap = useMemo(() => new CalHeatmap(), []);

  const maxValid = useMemo(() => data && Math.max(...data.map(({ value }) => value)), [data]);
  const minValid = useMemo(() => data && Math.min(...data.map(({ value }) => value)), [data]);

  useEffect(() => {
    calHeatmap.paint({
      range,
      date: shapeDate(startDate, minDate, maxDate, highlightDate),

      data: shapeData({
        sourceDataUrl, data, dataType, datePropName,
        valuePropName, defaultDataValue, groupYLogic, groupY,
      }),

      scale: ensureValidScale({
        scaleColorRange, scaleColorScheme, scaleOpacityBaseColor,
        scaleType, scaleDomain, minValid, maxValid,
      }),

      domain: shapeDomain({
        type, dynamicDimension, gutter, sort, labelLogic, label, labelPosition, labelRotation,
        textAlign, labelOffsetX, labelOffsetY, labelHeight, labelWidth,
      }),

      subDomain: shapeSubDomain({
        subType, subLabel, subGutter, subColorLabel, subColorLabelLogic, subSort,
        cellWidth, cellHeight, subLabelLogic, cellRadius,
      }),

      verticalOrientation,
      animationDuration,
      theme,
      itemSelector: `#bl-cal-heatmap-${ instanceId }`,
    },
    shapePlugins(legend, instanceId, calendarLabel)
    );
  }, [calHeatmap, cellHeight, cellRadius, cellWidth, dataType, datePropName, defaultDataValue, highlightDate,
    instanceId, labelHeight, labelPosition, labelRotation, labelWidth, labelOffsetX, labelOffsetY, maxDate, maxValid,
    minDate, minValid, range, scaleColorRange, scaleColorScheme, scaleOpacityBaseColor, scaleType, sort, startDate,
    subColorLabel, subColorLabelLogic, subGutter, subLabel, subLabelLogic, subType, textAlign, type, valuePropName,
    verticalOrientation, sourceDataUrl, data, groupYLogic, groupY, scaleDomain, dynamicDimension, gutter, labelLogic,
    label, subSort, legend, calendarLabel, animationDuration, theme]);

  useEffect(() => {
    calHeatmap.on('click', (event, timestamp, value) => onCellClick({ event, timestamp, value }));
    calHeatmap.on('mouseover', (event, timestamp, value) => onMouseOver({ event, timestamp, value }));
    calHeatmap.on('mouseout', (event, timestamp, value) => onMouseOut({ event, timestamp, value }));
  }, []);

  component.goNext = steps => calHeatmap.next(steps);
  component.goPrev = steps => calHeatmap.previous(steps);
  component.jumpTo = (date, reset) => calHeatmap.jumpTo(date, reset);

  if (!display) {
    calHeatmap.destroy();

    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-calendar-heatmap', classList) } style={ style }>
      <div id={ `bl-cal-heatmap-${ instanceId }` }/>
      <div id={ `bl-cal-heatmap--legend-label--${ instanceId }` }/>
    </div>
  );
}
