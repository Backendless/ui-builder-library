import { useEffect, useState } from 'react';

import dayjs from './lib/dayjs.min';
import utc from './lib/utc';
import { AnalogClock } from './views/analog-clock';
import { DigitalClock } from './views/digital-clock';

const { cn } = BackendlessUI.CSSUtils;

const ClockTypes = {
  analog : AnalogClock,
  digital: DigitalClock,
};
const TimeFormats = {
  '12'     : 'hh',
  '24'     : 'HH',
  'minute' : 'mm',
  'second' : 'ss',
  'ampm'   : 'A',
  'weekday': 'd',
};

dayjs.extend(utc);

export default function WorldClockComponent({ component, elRef }) {
  const { classList, style, display, type, timezone, label, timeFormat, displaySeconds } = component;

  const [time, setTime] = useState(() => getTimeData(timezone, timeFormat));

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(getTimeData(timezone, timeFormat));
    }, 1000);

    return () => clearInterval(timerID);
  }, [timezone, timeFormat]);

  const clockType = type.split('-');
  const WorldClock = ClockTypes[clockType[0]];
  const clockSubType = clockType[1];

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-worldClock', classList) } style={ style } ref={ elRef }>
      { WorldClock && (
        <WorldClock time={ time } label={ label } clockSubType={ clockSubType } displaySeconds={ displaySeconds }/>
      ) }
    </div>
  );
}

function getTimeData(timezone, timeFormat) {
  const date = dayjs().utcOffset(timezone);

  return {
    hour   : date.format(TimeFormats[timeFormat]),
    minute : date.format(TimeFormats['minute']),
    second : date.format(TimeFormats['second']),
    isAmpm : timeFormat === '12',
    ampm   : date.format(TimeFormats['ampm']),
    weekday: date.format(TimeFormats['weekday']),
  };
}
