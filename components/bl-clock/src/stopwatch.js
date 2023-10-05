import { useEffect, useReducer, useRef, useState } from 'react';

const StopwatchTimeFormat = {
  HHMMSS: 'hhmmss',
  MMSS: 'mmss',
  SS: 'ss',
};

const timeFormatter = {
  ss: elapsedTime => ({ seconds: (elapsedTime / 1000) }),
  mmss: elapsedTime => {
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

export function Stopwatch({ component }) {
  const { stopwatchTimeFormat } = component;

  const [time, setTime] = useObjectState(initTime);

  const timerRef = useRef();

  component.startStopwatch = () => {
    if (!timerRef.current) {
      const startTime = Date.now();

      timerRef.current = setInterval(() => {

        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;

        const { seconds, minutes, hours } = timeFormatter[stopwatchTimeFormat](elapsedTime);

        setTime({ seconds: seconds.toFixed(2), minutes, hours });
      }, 1);
    }
  };

  component.stopStopwatch = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  component.resetStopwatch = () => {
    setTime({ seconds: 0, minutes: 0, hours: 0 });
    component.stopStopwatch();
  };

  useEffect(() => {
    return () => component.stopStopwatch();
  }, []);

  return (
    <>
      {hasHours(stopwatchTimeFormat) && (<span className="stopwatch">{`${pad(time.hours)}:`}</span>)}
      {hasMinutes(stopwatchTimeFormat) && (<span className="stopwatch">{`${pad(time.minutes)}:`}</span>)}
      <span className="stopwatch"> {`${pad(time.seconds)}`} </span>
    </>
  );
}

const pad = number => (number < 10 ? '0' : '') + number;

const hasMinutes = timeFormat => timeFormat === StopwatchTimeFormat.HHMMSS || timeFormat === StopwatchTimeFormat.MMSS;
const hasHours = timeFormat => timeFormat === StopwatchTimeFormat.HHMMSS;

function useObjectState(initialState) {
  initialState = useState(initialState)[0];

  return useReducer((state, patch) => {
    const changes = typeof patch === 'function' ? patch(state) : patch;

    const changed = Object.entries(changes).some(([key, value]) => state[key] !== value);

    return changed ? { ...state, ...changes } : state;
  }, initialState || {});
}
