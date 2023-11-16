import { useEffect, useMemo, useRef, useState } from 'react';

import { getCountdown, getTimer, timeFormatter } from './helpers';
import { Time } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

const TimeIntervals = {
  DAY  : 'Day',
  DAYS : 'Days',
  WEEK : 'Week',
  WEEKS: 'Weeks',
};

const Formats = {
  SECONDS                         : 'seconds',
  MINUTES_SECONDS                 : 'minutesSeconds',
  HOURS_MINUTES_SECONDS           : 'hoursMinutesSeconds',
  DAYS_HOURS_MINUTES_SECONDS      : 'daysHoursMinutesSeconds',
  WEEKS_DAYS_HOURS_MINUTES_SECONDS: 'weeksDaysHoursMinutesSeconds',
};

const getTimeInSeconds = time => {
  const timeUnits = time.split(':');

  const seconds = Number(timeUnits[2]);
  const minutes = Number(timeUnits[1]) * 60;
  const hours = Number(timeUnits[0]) * 60 * 60;

  return seconds + minutes + hours;
};

export default function Timer({ component, eventHandlers: { onTimerEnd } }) {
  const { display, classList, style, countdown, animationDuration, simpleTimer, format } = component;

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

  const {
    weekTens, weekUnits, dayTens, dayUnits, hourTens, hourUnits, minuteTens, minuteUnits, secondTens, secondUnits, all,
  } = time;

  const { weeksVisibility, daysVisibility, hoursVisibility, minutesVisibility } = useMemo(() => {
    const weeksVisibility = weekTens + weekUnits > 0 || Formats.WEEKS_DAYS_HOURS_MINUTES_SECONDS === format;
    const daysVisibility = dayTens + dayUnits > 0 || weeksVisibility || Formats.DAYS_HOURS_MINUTES_SECONDS === format;
    const hoursVisibility = hourTens + hourUnits > 0 || daysVisibility || Formats.HOURS_MINUTES_SECONDS === format;
    const minutesVisibility = minuteTens + minuteUnits > 0 || hoursVisibility || Formats.MINUTES_SECONDS === format;

    return { weeksVisibility, daysVisibility, hoursVisibility, minutesVisibility };
  }, [time, format]);

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

  component.stop = () => !countdown && stopTimer();

  component.reset = () => {
    if (!countdown) {
      stopTimer();
      setTime(startTime);
    }
  };

  component.getActualValue = () => ({
    weeks  : Number(weekTens + weekUnits),
    days   : Number(dayTens + dayUnits),
    hours  : Number(hourTens + hourUnits),
    minutes: Number(minuteTens + minuteUnits),
    seconds: Number(secondTens + secondUnits),
  });

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
      { weeksVisibility && (
        <Time
          timeTens={ weekTens }
          timeUnits={ weekUnits }
          animationDuration={ animationDuration }
          timeInterval={ Number(weekTens + weekUnits) === 1 ? TimeIntervals.WEEK : TimeIntervals.WEEKS }
        />
      ) }
      { daysVisibility && (
        <Time
          timeTens={ dayTens }
          timeUnits={ dayUnits }
          animationDuration={ animationDuration }
          timeInterval={ Number(dayTens + dayUnits) === 1 ? TimeIntervals.DAY : TimeIntervals.DAYS }
        />
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
