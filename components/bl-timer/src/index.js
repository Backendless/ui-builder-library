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

export default function Timer({ component, eventHandlers: { onTimerEnd } }) {
  const { display, classList, style, countdown, animationDuration, simpleTimer } = component;

  const startTime = useMemo(() => {
    if (countdown) {
      return getCountdown(new Date(countdown));
    }

    if (simpleTimer) {
      return timeFormatter(getTimeInSeconds(simpleTimer));
    }

    console.warn('Timer value is not provided.');

    return {};
  }, [countdown, simpleTimer]);

  const [time, setTime] = useState(startTime);

  const { dayTens, dayUnits, hourTens, hourUnits, minuteTens, minuteUnits, secondTens, secondUnits, all } = time;

  const { daysVisibility, hoursVisibility, minutesVisibility } = useMemo(() => {
    const daysVisibility = dayTens + dayUnits > 0;
    const hoursVisibility = hourTens + hourUnits > 0 || daysVisibility;
    const minutesVisibility = minuteTens + minuteUnits > 0 || daysVisibility || hoursVisibility;

    return { daysVisibility, hoursVisibility, minutesVisibility };
  }, [time]);

  const timer = useRef(null);

  useEffect(() => {
    setTime(startTime);

    if (countdown) {
      timer.current = setInterval(() => setTime(getCountdown(new Date(countdown))), 1000);
    }

    return () => clearInterval(timer.current);
  }, [startTime]);

  const stopTimer = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  component.start = () => {
    if (!countdown && !timer.current && all > 0) {
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
    if (all <= 0) {
      clearInterval(timer.current);
      timer.current = null;

      onTimerEnd();
    }
  }, [time]);

  if (!display || !secondUnits) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-timer', classList) } style={ style }>
      { daysVisibility && (
        <Time timeTens={ dayTens } timeUnits={ dayUnits } animationDuration={ animationDuration } withDelimeter/>
      ) }

      { hoursVisibility && (
        <Time timeTens={ hourTens } timeUnits={ hourUnits } animationDuration={ animationDuration } withDelimeter/>
      ) }

      { minutesVisibility && (
        <Time timeTens={ minuteTens } timeUnits={ minuteUnits } animationDuration={ animationDuration } withDelimeter/>
      ) }

      <Time timeTens={ secondTens } timeUnits={ secondUnits } animationDuration={ animationDuration }/>
    </div>
  );
}
