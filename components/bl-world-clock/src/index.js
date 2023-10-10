import { useEffect, useState } from 'react';

import dayjs from './lib/dayjs.min';
import utc from './lib/utc';

import { AnalogClock } from './views/analog-clock';
import { DigitalClock } from './views/digital-clock';

const { cn } = BackendlessUI.CSSUtils;

const TWELVE_HOUR = '12';

const ClockTypes = {
  ANALOG : 'analog',
  DIGITAL: 'digital',
};

const ClockViews = {
  [ClockTypes.ANALOG] : AnalogClock,
  [ClockTypes.DIGITAL]: DigitalClock,
};

const TimeFormats = {
  TWELVE_HOUR     : 'hh',
  TWENTY_FOUR_HOUR: 'HH',
  MINUTE          : 'mm',
  SECOND          : 'ss',
  AMPM            : 'A',
  WEEKDAY         : 'd',
};

dayjs.extend(utc);

export default function WorldClockComponent({ component, elRef, eventHandlers }) {
  const { classList, style, display, type, timezone, label, timeFormat, displaySeconds, labelVisibility } = component;
  const { onSecondChange, onMinuteChange, onHourChange } = eventHandlers;

  const [time, setTime] = useState(() => getTimeData(timezone, timeFormat));

  useEffect(() => {
    const timerID = setInterval(() => {
      const newTime = getTimeData(timezone, timeFormat);

      if (newTime.second !== time.second) {
        onSecondChange({ timeData: newTime });
      }

      if (newTime.minute !== time.minute) {
        onMinuteChange({ timeData: newTime });
      }

      if (newTime.hour !== time.hour) {
        onHourChange({ timeData: newTime });
      }

      setTime(newTime);
    }, 1000);

    return () => clearInterval(timerID);
  }, [timezone, timeFormat, time]);

  const [clockType, clockStyle] = type.split('-');
  const WorldClock = ClockViews[clockType];

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-worldClock', classList) } style={ style } ref={ elRef }>
      <WorldClock
        time={ time }
        label={ label }
        clockStyle={ clockStyle }
        displaySeconds={ displaySeconds }
        labelVisibility={ labelVisibility }
      />
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
