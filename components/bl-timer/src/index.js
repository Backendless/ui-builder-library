import { useEffect, useMemo, useState } from 'react';

import { getTimer } from './helpers';
import { Time } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function Timer({ component, eventHandlers }) {
  const { display, classList, style, timerDate, animationDuration } = component;
  const { onTimerEnd } = eventHandlers;

  const [time, setTime] = useState(() => getTimer(new Date(timerDate)));

  const daysVisibility = useMemo(() => time.dayTens + time.dayUnits > 0, [time]);
  const hoursVisibility = useMemo(() => time.hourTens + time.hourUnits > 0 || daysVisibility, [time, daysVisibility]);
  const minutesVisibility = useMemo(() => {
    return time.minuteTens + time.minuteUnits > 0 || daysVisibility || hoursVisibility;
  }, [time, daysVisibility, hoursVisibility]);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimer(new Date(timerDate))), 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time.all) {
    onTimerEnd();

    return null;
  }

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
