import { useEffect, useState } from 'react';

import { getTime } from './helpers';
import { Time } from './subcomponents';

const TimeFormat = {
  HHMMSS: 'hhmmss',
  HHMM  : 'hhmm',
  HH    : 'hh',
};

export function ClockComponent({ component }) {
  const { timeFormat, animationDuration } = component;

  const [time, setTime] = useState(() => getTime());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTime()), 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Time
        timeTens={ time.hourTens }
        timeUnits={ time.hourUnits }
        animationDuration={ animationDuration }
        withDelimeter={ true }
      />
      { hasMinutes(timeFormat) && (
        <Time
          timeTens={ time.minuteTens }
          timeUnits={ time.minuteUnits }
          animationDuration={ animationDuration }
          withDelimeter={ true }
        />
      ) }
      { hasSeconds(timeFormat) && (
        <Time
          timeTens={ time.secondTens }
          timeUnits={ time.secondUnits }
          animationDuration={ animationDuration }
        />
      ) }
    </>
  );
}

const hasMinutes = timeFormat => timeFormat === TimeFormat.HHMMSS || timeFormat === TimeFormat.HHMM;
const hasSeconds = timeFormat => timeFormat === TimeFormat.HHMMSS;
