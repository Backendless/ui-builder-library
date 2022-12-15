import { useState, useEffect, useRef } from 'react';

export function Stopwatch({ component }) {
  const [remainingSecond, setRemainingSecond] = useState(0);

  const timerRef = useRef();

  component.startStopwatch = () => {
    if (!timerRef.current) {
      const startDate = Date.now();

      timerRef.current = setInterval(() => {
        const currentDate = Date.now();
        const gap = getRemainingSeconds(startDate, currentDate, remainingSecond);

        setRemainingSecond((gap / 1000).toFixed(2));
      }, 100);
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
    return () => {
      component.stopStopwatch();
    };
  }, []);

  return (
    <div className="stopwatch"> { remainingSecond } </div>
  );
}

const getRemainingSeconds = (startDate, currentDate, stopwatch) => {
  return stopwatch * 1000 + currentDate - startDate;
};
