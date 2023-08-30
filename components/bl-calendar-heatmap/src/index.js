import { useEffect, useMemo } from 'react';

import CalHeatmap from './cal-heatmap.min';
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
  const { subColorLabelLogic, subLabelLogic, groupYLogic, labelLogic, onCellClick } = eventHandlers;

  const cal = useMemo(() => new CalHeatmap(), []);

  const maxValid = useMemo(() => data && Math.max(...data.map(({ value }) => value)), [data]);
  const minValid = useMemo(() => data && Math.min(...data.map(({ value }) => value)), [data]);

  useEffect(() => {
    cal.paint({
        range,
        date: shapeDate(startDate, minDate, maxDate, highlightDate),

        data: shapeData(sourceDataUrl, data, dataType, datePropName,
          valuePropName, defaultDataValue, groupYLogic, groupY),

        scale: ensureValidScale(
          scaleColorRange, scaleColorScheme, scaleOpacityBaseColor,
          scaleType, scaleDomain, minValid, maxValid
        ),

        domain: shapeDomain(type, dynamicDimension, gutter, sort, labelLogic, label, labelPosition, labelRotation,
          textAlign, labelOffsetX, labelOffsetY, labelHeight, labelWidth),

        subDomain: shapeSubDomain(subType, subLabel, subGutter, subColorLabel, subColorLabelLogic, subSort,
          cellWidth, cellHeight, subLabelLogic, cellRadius),

        verticalOrientation,
        animationDuration,
        theme,
        itemSelector: `#bl-cal-heatmap-${ instanceId }`,
      },
      shapePlugins(legend, instanceId, calendarLabel)
    );
  }, [cal, cellHeight, cellRadius, cellWidth, dataType, datePropName, defaultDataValue, highlightDate, instanceId,
    labelHeight, labelPosition, labelRotation, labelWidth, labelOffsetX, labelOffsetY, maxDate, maxValid, minDate,
    minValid, range, scaleColorRange, scaleColorScheme, scaleOpacityBaseColor, scaleType, sort, startDate,
    subColorLabel, subColorLabelLogic, subGutter, subLabel, subLabelLogic, subType, textAlign, type, valuePropName,
    verticalOrientation, sourceDataUrl, data, groupYLogic, groupY, scaleDomain, dynamicDimension, gutter, labelLogic,
    label, subSort, legend, calendarLabel, animationDuration, theme]);

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
        ref={ elRef }
        id={ `bl-cal-heatmap-${ instanceId }` }
        className={ cn('bl-customComponent-calendar-heatmap', classList) }
        style={ style }
      />
      <div id={ `bl-legend-label-${ instanceId }` }/>
    </>
  );
}
