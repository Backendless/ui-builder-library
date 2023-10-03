import { useEffect, useRef, useState } from 'react';

const TimeVariant = {
  HHMMSS: 'hhmmss',
  MMSS: 'mmss',
  SS: 'ss',
};

const stopwatchMap = {
  ss: elapsedTime => ({ seconds: (elapsedTime / 1000) }),
  mmss: elapsedTime => {
    const { seconds } = stopwatchMap.ss(elapsedTime);
    const minutes = Math.floor(elapsedTime / 1000 / 60);

    return { seconds: seconds % 60, minutes };
  },
  hhmmss: elapsedTime => {
    const { seconds, minutes } = stopwatchMap.mmss(elapsedTime);
    const hours = Math.floor(elapsedTime / 1000 / 60 / 60);

    return { seconds: seconds % 60, minutes: minutes % 60, hours };
  },
};

export function Stopwatch({ component }) {
  const { stopwatchVariant } = component;

  const [second, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const timerRef = useRef();

  component.startStopwatch = () => {
    if (!timerRef.current) {
      const startTime = Date.now();

      timerRef.current = setInterval(() => {

        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;

        const { seconds, minutes, hours } = stopwatchMap[stopwatchVariant](elapsedTime);

        setSeconds(seconds.toFixed(2));
        minutes && setMinutes(minutes);
        hours && setHours(hours);
      }, 1);
    }
  };

  component.stopStopwatch = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  component.resetStopwatch = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    component.stopStopwatch();
  };

  useEffect(() => {
    return () => component.stopStopwatch();
  }, []);

  return (
    <>
      {hasHours(stopwatchVariant) && (<span className="stopwatch">{`${pad(hours)}:`}</span>)}
      {hasMinutes(stopwatchVariant) && (<span className="stopwatch">{`${pad(minutes)}:`}</span>)}
      <span className="stopwatch"> {`${pad(second)}`} </span>
    </>
  );
}

const pad = number => (number < 10 ? '0' : '') + number;

const hasMinutes = timeVariant => timeVariant === TimeVariant.HHMMSS || timeVariant === TimeVariant.MMSS;
const hasHours = timeVariant => timeVariant === TimeVariant.HHMMSS;
