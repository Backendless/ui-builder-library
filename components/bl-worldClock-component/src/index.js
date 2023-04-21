import { useEffect, useState } from 'react';
import dayjs from './lib/dayjs.min';
import utc from './lib/utc';

import { AnalogClock } from './analog-clock';
import { DigitalClock } from './digital-clock';

const { cn } = BackendlessUI.CSSUtils;

const ClockTypes = {
  analog: AnalogClock,
  digital: DigitalClock
}

dayjs.extend(utc);

export default function WorldClockComponent({ component, elRef, eventHandlers }) {
  const { classList, style, display, type, timezone, label, timeFormat, displaySeconds, } = component;

  const [time, setTime] = useState(() => {
    const date = dayjs().utcOffset(timezone);

    return {
      hour: timeFormat === '24' ? +date.format('HH') : +date.format('hh'),
      minute: +date.format('mm'),
      second: +date.format('ss'),
      isAmpm: timeFormat === '12',
      ampm: date.format('A'),
      weekday: +date.format('d')
    };
  });

  useEffect(() => {
    const timerID = setInterval(() => {
      const date = dayjs().utcOffset(timezone);

      setTime({
        hour: timeFormat === '24' ? +date.format('HH') : +date.format('hh'),
        minute: +date.format('mm'),
        second: +date.format('ss'),
        isAmpm: timeFormat === '12',
        ampm: date.format('A'),
        weekday: +date.format('d')
      })
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
        <WorldClock time={ time } label={ label } clockSubType={ clockSubType } displaySeconds={ displaySeconds } />
      ) }
    </div>
  );
}
