import { useState, useEffect } from 'react';
import { getTimer } from './helpers';
import { Time } from './subcomponents';

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
    setDaysVisibility(time.dayTens + time.dayUnits > 0);
    setHoursVisibility(time.hourTens + time.hourUnits + time.dayTens + time.dayUnits > 0);
    setMinutesVisibility(time.hourTens + time.hourUnits + time.minuteTens + time.minuteUnits > 0);
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
          <div className="clock__item">:</div>
        </>
      ) }

      { hoursVisibility && (
        <>
          <Time timeTens={ time.hourTens } timeUnits={ time.hourUnits }/>
          <div className="clock__item">:</div>
        </>
      ) }

      { minutesVisibility && (
        <>
          <Time timeTens={ time.minuteTens } timeUnits={ time.minuteUnits }/>
          <div className="clock__item">:</div>
        </>
      ) }

      <Time timeTens={ time.secondTens } timeUnits={ time.secondUnits }/>
    </>
  );
}
