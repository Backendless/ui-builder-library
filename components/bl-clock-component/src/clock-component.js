import { useState, useEffect } from 'react';
import { getTime } from './helpers';
import { Time } from './subcomponents';

export function ClockComponent({ timeVariant }) {
  const [update, setUpdate] = useState();
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    setUpdate(setInterval(() => {
      setTime(getTime());
    }, 1000));

    return () => {
      clearInterval(update);
    };
  }, []);

  return (
    <>
      <Time timeTens={ time.hourTens } timeUnits={ time.hourUnits }/>
      { (timeVariant === 'all' || timeVariant === 'hoursMinutes') && (
        <>
          <div className="clock__item">:</div>
          <Time timeTens={ time.minuteTens } timeUnits={ time.minuteUnits }/>
        </>
      ) }
      { timeVariant === 'all' && (
        <>
          <div className="clock__item">:</div>
          <Time timeTens={ time.secondTens } timeUnits={ time.secondUnits }/>
        </>
      ) }
    </>
  );
}
