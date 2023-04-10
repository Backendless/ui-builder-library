import { useEffect, useMemo, useState } from 'react';

import { luxon } from './lib/luxon';

import { AnalogClock } from './analog-clock';
import { DigitalClock } from './digital-clock';

const { cn } = BackendlessUI.CSSUtils;

const DateTime = luxon.DateTime;
const FixedOffsetZone = luxon.FixedOffsetZone;
const ClockTypes = {
  analog: AnalogClock,
  digital: DigitalClock
}

export default function WorldClockComponent({ component, elRef, eventHandlers }) {
  const { classList, style, display, type, timezone, label, timeFormat, } = component;

  const fixedOffsetZone = useMemo(() => FixedOffsetZone.instance(timezone * 60), [timezone]);
  const [time, setTime] = useState(() => DateTime.local().setZone(fixedOffsetZone));

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(DateTime.local().setZone(fixedOffsetZone));
    }, 1000);

    return () => clearInterval(timerID);
  }, [fixedOffsetZone]);

  const clockType = type.split('-');
  const WorldClock = ClockTypes[clockType[0]];
  const clockSubType = clockType[1];

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-worldClock', classList) } style={ style } ref={ elRef }>
      {WorldClock && (
        <WorldClock time={ time } label={ label } timeFormat={ timeFormat } clockSubType={ clockSubType } />
      )}
    </div>
  );
}
