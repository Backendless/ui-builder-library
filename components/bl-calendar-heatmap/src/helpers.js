import CalendarLabel from './cal-heatmap-calendar-label.min';
import Legend from './cal-heatmap-legend.min';
import LegendLite from './cal-heatmap-legend-lite.min';
import Tooltip from './cal-heatmap-tooltip.min';

const LegendTypes = {
  Legend    : Legend,
  LegendLite: LegendLite,
};

export const ensureValidScale = scale => {
  const {
    scaleColorRange, scaleColorScheme, scaleOpacityBaseColor,
    scaleType, scaleDomain, minValid, maxValid,
  } = scale;

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

const validateCalendarLabel = calendarLabel => calendarLabel.map(item => [
  CalendarLabel,
  { ...item, text: () => item.text },
]);

export const shapeDate = (startDate, minDate, maxDate, highlightDate) => ({
  start    : startDate ? new Date(startDate) : new Date(),
  min      : minDate,
  max      : maxDate,
  highlight: highlightDate && prepareHighlights(highlightDate),
});

export const shapeData = props => {
  const {
    sourceDataUrl, data, dataType, datePropName,
    valuePropName, defaultDataValue, groupYLogic, groupY,
  } = props;

  return {
    source: sourceDataUrl || data,
    type  : dataType,
    x     : datePropName,
    y     : valuePropName,
    defaultDataValue,
    groupY: groupYLogic.hasLogic
      ? values => groupYLogic({ values })
      : groupY,
  };
};

export const shapeDomain = props => {
  const {
    type, dynamicDimension, gutter, sort, labelLogic, label, labelPosition, labelRotation, textAlign,
    labelOffsetX, labelOffsetY, labelHeight, labelWidth,
  } = props;

  return {
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
  };
};

export const shapeSubDomain = props => {
  const {
    subType, subLabel, subGutter, subColorLabel, subColorLabelLogic,
    subSort, cellWidth, cellHeight, subLabelLogic, cellRadius,
  } = props;

  return {
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
  };
};

export const shapePlugins = (legend, instanceId, calendarLabel) => {
  const plugins = [[Tooltip]];

  if (legend !== 'none') {
    plugins.push([LegendTypes[legend], { itemSelector: `#bl-cal-heatmap--legend-label--${ instanceId }` }]);
  }

  if (calendarLabel) {
    plugins.push(...validateCalendarLabel(calendarLabel));
  }

  return plugins;
};
