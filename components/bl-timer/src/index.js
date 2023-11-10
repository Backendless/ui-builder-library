import { useEffect, useMemo, useRef, useState } from 'react';

import { getCountdown, getTimer, timeFormatter } from './helpers';
import { Time } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

const getTimeInSeconds = time => {
  const timeUnits = time.split(':');

  const seconds = Number(timeUnits[2]);
  const minutes = Number(timeUnits[1]) * 60;
  const hours = Number(timeUnits[0]) * 60 * 60;

  return seconds + minutes + hours;
};

export default function Timer({ component, eventHandlers }) {
  const { display, classList, style, countdown, animationDuration, simpleTimer } = component;
  const { onTimerEnd } = eventHandlers;

  const startTime = useMemo(() => (
    countdown ? getCountdown(new Date(countdown)) : timeFormatter(getTimeInSeconds(simpleTimer))
  ), [countdown, simpleTimer]);

  const [time, setTime] = useState(startTime);

  const { daysVisibility, hoursVisibility, minutesVisibility } = useMemo(() => {
    const daysVisibility = time.dayTens + time.dayUnits > 0;
    const hoursVisibility = time.hourTens + time.hourUnits > 0 || daysVisibility;
    const minutesVisibility = time.minuteTens + time.minuteUnits > 0 || daysVisibility || hoursVisibility;

    return { daysVisibility, hoursVisibility, minutesVisibility };
  }, [time]);

  const timer = useRef(null);

  useEffect(() => {
    if (countdown && !timer.current) {
      timer.current = setInterval(() => setTime(getCountdown(new Date(countdown))), 1000);
    }

    return () => clearInterval(timer.current);
  }, [countdown]);

  const stopTimer = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  component.start = () => {
    if (!countdown && !timer.current && time.all > 0) {
      const startTime = Date.now();

      timer.current = setInterval(() => setTime(getTimer(startTime, time)), 1000);
    }
  };

  component.stop = () => stopTimer();

  component.reset = () => {
    if (!countdown) {
      stopTimer();
      setTime(startTime);
    }
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
