import { useState, useEffect } from 'react';
import { getTime } from './helpers';
import { Time } from './subcomponents';

const TimeVariant = {
  HHMMSS: 'hhmmss',
  HHMM: 'hhmm',
  HH: 'hh'
};

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
      { (timeVariant === TimeVariant.HHMMSS || timeVariant === TimeVariant.HHMM) && (
        <>
          <Time
            timeTens={ time.minuteTens }
            timeUnits={ time.minuteUnits }
            withDelimeter={ true }
          />
        </>
      ) }
      { timeVariant === TimeVariant.HHMMSS && (
        <>
          <Time
            timeTens={ time.secondTens }
            timeUnits={ time.secondUnits }
            withDelimeter={ true }
          />
        </>
      ) }
    </>
  );
}
