import { useEffect, useState } from 'react';

import { getTime } from './helpers';
import { Time } from './subcomponents';

const TimeVariant = {
  HHMMSS: 'hhmmss',
  HHMM  : 'hhmm',
  HH    : 'hh',
};

export function ClockComponent({ component }) {
  const { timeVariant, animationDuration } = component;

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
      { hasMinutes(timeVariant) && (
        <Time
          timeTens={ time.minuteTens }
          timeUnits={ time.minuteUnits }
          animationDuration={ animationDuration }
          withDelimeter={ true }
        />
      ) }
      { hasSeconds(timeVariant) && (
        <Time
          timeTens={ time.secondTens }
          timeUnits={ time.secondUnits }
          animationDuration={ animationDuration }
        />
      ) }
    </>
  );
}

const hasMinutes = timeVariant => timeVariant === TimeVariant.HHMMSS || timeVariant === TimeVariant.HHMM;
const hasSeconds = timeVariant => timeVariant === TimeVariant.HHMMSS;
