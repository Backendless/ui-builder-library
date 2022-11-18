import { useState, useEffect } from 'react';
import { getTime } from './helpers';
import { Time } from './subcomponents';

const TIME_VARIANT = {
  hhmmss: 'hhmmss',
  hhmm: 'hhmm',
  hh: 'hh'
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
      { (timeVariant === TIME_VARIANT.hhmmss || timeVariant === TIME_VARIANT.hhmm) && (
        <>
          <Time
            timeTens={ time.minuteTens }
            timeUnits={ time.minuteUnits }
            withDelimeter={ true }
          />
        </>
      ) }
      { timeVariant === TIME_VARIANT.hhmmss && (
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
