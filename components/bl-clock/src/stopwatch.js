import { useEffect, useMemo, useRef, useState } from 'react';

export function Stopwatch({ component }) {
  const { tickRate } = component;

  const [remainingSecond, setRemainingSecond] = useState(0);

  const timerRef = useRef();

  const validTickRate = useMemo(() => {
    if (tickRate < 0) {
      console.warn('Stopwatch Scale can\'t be less than 0');

      return 0;
    }

    return tickRate;
  }, []);

  component.startStopwatch = () => {
    if (!timerRef.current) {
      const startDate = Date.now();

      timerRef.current = setInterval(() => {
        const currentDate = Date.now();
        const gap = getRemainingSeconds(startDate, currentDate, remainingSecond);

        setRemainingSecond((gap / 1000).toFixed(validTickRate));
      }, 1);
    }
  };

  component.stopStopwatch = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  component.resetStopwatch = () => {
    setRemainingSecond(0);
    component.stopStopwatch();
  };

  useEffect(() => {
    return () => component.stopStopwatch();
  }, []);

  return (
    <div className="stopwatch"> { remainingSecond } </div>
  );
}

const getRemainingSeconds = (startDate, currentDate, remainingSecond) => {
  return remainingSecond * 1000 + currentDate - startDate;
};
