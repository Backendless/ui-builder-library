import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const TimeFormat = {
  HHMMSS: 'hhmmss',
  MMSS  : 'mmss',
  SS    : 'ss',
};

const timeFormatter = {
  ss    : elapsedTime => ({ seconds: (elapsedTime / 1000) }),
  mmss  : elapsedTime => {
    const { seconds } = timeFormatter.ss(elapsedTime);
    const minutes = Math.floor(elapsedTime / 1000 / 60);

    return { seconds: seconds % 60, minutes };
  },
  hhmmss: elapsedTime => {
    const { seconds, minutes } = timeFormatter.mmss(elapsedTime);
    const hours = Math.floor(elapsedTime / 1000 / 60 / 60);

    return { seconds: seconds % 60, minutes: minutes % 60, hours };
  },
};

const initTime = { seconds: 0, minutes: 0, hours: 0 };

export default function Stopwatch({ component }) {
  const { display, classList, timeFormat, decimalPlaces } = component;

  const [time, setTime] = useObjectState(initTime);

  const timerRef = useRef();

  component.start = () => {
    if (!timerRef.current) {
      const startTime = Date.now();
      const interval = 1 / Math.pow(10, Number(decimalPlaces)) * 1000;

      timerRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;

        const { seconds, minutes, hours } = timeFormatter[timeFormat](elapsedTime);

        setTime({ seconds: seconds.toFixed(Number(decimalPlaces)), minutes, hours });
      }, interval);
    }
  };

  component.stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  component.reset = () => {
    setTime({ seconds: 0, minutes: 0, hours: 0 });
    component.stopStopwatch();
  };

  useEffect(() => {
    return () => component.stopStopwatch();
  }, []);

  const FormatTokens = useMemo(() => ({
    HH: hasHours(timeFormat),
    MM: hasMinutes(timeFormat),
  }), [timeFormat]);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-stopwatch', classList) }>
      { FormatTokens.HH && (<span className="stopwatch">{ `${ pad(time.hours) }:` }</span>) }
      { FormatTokens.MM && (<span className="stopwatch">{ `${ pad(time.minutes) }:` }</span>) }
      <span className="stopwatch">{ `${ pad(time.seconds) }` }</span>
    </div>
  );
}

const pad = number => (number < 10 ? '0' : '') + number;

const hasMinutes = timeFormat => timeFormat === TimeFormat.HHMMSS || timeFormat === TimeFormat.MMSS;
const hasHours = timeFormat => timeFormat === TimeFormat.HHMMSS;

function useObjectState(initialState) {
  initialState = useState(initialState)[0];

  return useReducer((state, patch) => {
    const changes = typeof patch === 'function' ? patch(state) : patch;

    const changed = Object.entries(changes).some(([key, value]) => state[key] !== value);

    return changed ? { ...state, ...changes } : state;
  }, initialState || {});
}
