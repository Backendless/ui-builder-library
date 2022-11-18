import { useState, useEffect } from 'react';
import { getTimer } from './helpers';
import { Time, Delimeter } from './subcomponents';

export function Timer({ timerDate, timeVariant, onTimerEnd }) {
  const [update, setUpdate] = useState();
  const [time, setTime] = useState(getTimer(new Date(timerDate)));

  const [daysVisibility, setDaysVisibility] = useState(false);
  const [hoursVisibility, setHoursVisibility] = useState(false);
  const [minutesVisibility, setMinutesVisibility] = useState(false);

  useEffect(() => {
    setUpdate(setInterval(() => {
      setTime(getTimer(new Date(timerDate)));
    }, 1000));

    return () => {
      clearInterval(update);
    };
  }, []);

  useEffect(() => {
    const isDays = time.dayTens + time.dayUnits > 0;
    const isHours = time.hourTens + time.hourUnits > 0 || isDays;
    const isMinutes = time.minuteTens + time.minuteUnits > 0 || isDays || isHours;

    setDaysVisibility(isDays);
    setHoursVisibility(isHours);
    setMinutesVisibility(isMinutes);
  }, [time, timeVariant]);

  if (!time.all) {
    onTimerEnd();

    return null;
  }

  return (
    <>
      { daysVisibility && (
        <>
          <Time timeTens={ time.dayTens } timeUnits={ time.dayUnits }/>
        </>
      ) }

      { hoursVisibility && (
        <>
          <Time
            timeTens={ time.hourTens }
            timeUnits={ time.hourUnits }
            withDelimeter={ true }
          />
        </>
      ) }

      { minutesVisibility && (
        <>
          <Time
            timeTens={ time.minuteTens }
            timeUnits={ time.minuteUnits }
            withDelimeter={ true }
          />
        </>
      ) }

      <Time
        imeTens={ time.secondTens }
        timeUnits={ time.secondUnits }
        withDelimeter={ minutesVisibility }
      />
    </>
  );
}
