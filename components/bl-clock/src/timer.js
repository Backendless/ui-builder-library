import { useEffect, useState } from 'react';

import { getTimer } from './helpers';
import { Time } from './subcomponents';

export function Timer({ component, eventHandlers }) {
  const { timerDate, animationDuration } = component;
  const { onTimerEnd } = eventHandlers;

  const [time, setTime] = useState(() => getTimer(new Date(timerDate)));

  const [daysVisibility, setDaysVisibility] = useState(false);
  const [hoursVisibility, setHoursVisibility] = useState(false);
  const [minutesVisibility, setMinutesVisibility] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimer(new Date(timerDate)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const isDays = time.dayTens + time.dayUnits > 0;
    const isHours = time.hourTens + time.hourUnits > 0 || isDays;
    const isMinutes = time.minuteTens + time.minuteUnits > 0 || isDays || isHours;

    setDaysVisibility(isDays);
    setHoursVisibility(isHours);
    setMinutesVisibility(isMinutes);
  }, [time]);

  if (!time.all) {
    onTimerEnd();

    return null;
  }

  return (
    <>
      { daysVisibility && (
        <Time
          timeTens={ time.dayTens }
          timeUnits={ time.dayUnits }
          animationDuration={ animationDuration }
          withDelimeter={ true }
        />
      ) }

      { hoursVisibility && (
        <Time
          timeTens={ time.hourTens }
          timeUnits={ time.hourUnits }
          animationDuration={ animationDuration }
          withDelimeter={ true }
        />
      ) }

      { minutesVisibility && (
        <Time
          timeTens={ time.minuteTens }
          timeUnits={ time.minuteUnits }
          animationDuration={ animationDuration }
          withDelimeter={ true }
        />
      ) }

      <Time
        timeTens={ time.secondTens }
        timeUnits={ time.secondUnits }
        animationDuration={ animationDuration }
      />
    </>
  );
}
