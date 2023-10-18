import { useEffect, useMemo, useRef, useState } from 'react';

import { getTimer, timeFormatter } from './helpers';
import { Time } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

const getSimpleTimerInSeconds = time => {
  const timeUnits = time.split(':');

  const seconds = Number(timeUnits[2]);
  const minutes = Number(timeUnits[1]) * 60;
  const hours = Number(timeUnits[0]) * 60 * 60;

  return seconds + minutes + hours;
};

export default function Timer({ component, eventHandlers }) {
  const { display, classList, style, timerDate, animationDuration, simpleTimer } = component;
  const { onTimerEnd } = eventHandlers;

  const [time, setTime] = useState(() => timerDate
    ? getTimer(new Date(timerDate))
    : timeFormatter(getSimpleTimerInSeconds(simpleTimer) * 1000));

  const { daysVisibility, hoursVisibility, minutesVisibility } = useMemo(() => {
    const daysVisibility = time.dayTens + time.dayUnits > 0;
    const hoursVisibility = time.hourTens + time.hourUnits > 0 || daysVisibility;
    const minutesVisibility = time.minuteTens + time.minuteUnits > 0 || daysVisibility || hoursVisibility;

    return { daysVisibility, hoursVisibility, minutesVisibility };
  }, [time]);

  const timer = useRef(null);

  useEffect(() => {
    if (timerDate && !timer.current) {
      timer.current = setInterval(() => setTime(getTimer(new Date(timerDate))), 1000);
    }

    return () => clearInterval(timer.current);
  }, [timerDate]);

  component.start = () => {
    if (!timerDate && !timer.current) {
      const startTime = Date.now();

      timer.current = setInterval(() => {
        const gap = Math.floor(Date.now() / 1000) - Math.floor(startTime / 1000);
        const timePassed = time.all - gap;

        setTime(timeFormatter(timePassed * 1000));
      }, 1000);
    }
  };

  component.stop = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    if (time.all <= 0) {
      clearInterval(timer.current);
      timer.current = null;

      onTimerEnd();
    }
  }, [time]);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-timer', classList) } style={ style }>
      { daysVisibility && (
        <Time
          timeTens={ time.dayTens }
          timeUnits={ time.dayUnits }
          animationDuration={ animationDuration }
          withDelimeter
        />
      ) }

      { hoursVisibility && (
        <Time
          timeTens={ time.hourTens }
          timeUnits={ time.hourUnits }
          animationDuration={ animationDuration }
          withDelimeter
        />
      ) }

      { minutesVisibility && (
        <Time
          timeTens={ time.minuteTens }
          timeUnits={ time.minuteUnits }
          animationDuration={ animationDuration }
          withDelimeter
        />
      ) }

      <Time
        timeTens={ time.secondTens }
        timeUnits={ time.secondUnits }
        animationDuration={ animationDuration }
      />
    </div>
  );
}
