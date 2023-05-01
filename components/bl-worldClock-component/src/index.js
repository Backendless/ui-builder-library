import { useEffect, useState } from 'react';

import dayjs from './lib/dayjs.min';
import utc from './lib/utc';
import { AnalogClock } from './views/analog-clock';
import { DigitalClock } from './views/digital-clock';

const { cn } = BackendlessUI.CSSUtils;

const ClockTypes = {
  ANALOG : 'analog',
  DIGITAL: 'digital',
};
const ClockViews = {
  [ClockTypes.ANALOG] : AnalogClock,
  [ClockTypes.DIGITAL]: DigitalClock,
}
const TWELVE_HOUR = '12';
const TimeFormats = {
  TWELVE_HOUR     : 'hh',
  TWENTY_FOUR_HOUR: 'HH',
  MINUTE          : 'mm',
  SECOND          : 'ss',
  AMPM            : 'A',
  WEEKDAY         : 'd',
};

dayjs.extend(utc);

export default function WorldClockComponent({ component, elRef }) {
  const { classList, style, display, type, timezone, label, timeFormat, displaySeconds } = component;

  const [time, setTime] = useState(() => getTimeData(timezone, timeFormat));

  useEffect(() => {
    const timerID = setInterval(() => setTime(getTimeData(timezone, timeFormat)), 1000);

    return () => clearInterval(timerID);
  }, [timezone, timeFormat]);

  const clockTypes = type.split('-');
  const WorldClock = ClockViews[clockTypes[0]];
  const clockSubType = clockTypes[1];

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-worldClock', classList) } style={ style } ref={ elRef }>
      { WorldClock && (
        <WorldClock time={ time } label={ label } type={ clockSubType } displaySeconds={ displaySeconds }/>
      ) }
    </div>
  );
}

function getTimeData(timezone, timeFormat) {
  const date = dayjs().utcOffset(timezone);
  const isAmpm = timeFormat === TWELVE_HOUR;
  const hourFormat = isAmpm ? TimeFormats.TWELVE_HOUR : TimeFormats.TWENTY_FOUR_HOUR;

  return {
    hour   : date.format(hourFormat),
    minute : date.format(TimeFormats.MINUTE),
    second : date.format(TimeFormats.SECOND),
    ampm   : date.format(TimeFormats.AMPM),
    weekday: date.format(TimeFormats.WEEKDAY),
    isAmpm,
  };
}
