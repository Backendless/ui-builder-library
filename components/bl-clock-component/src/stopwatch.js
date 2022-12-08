import { useState } from 'react';

export function Stopwatch({ component }) {
  const [updateInterval, setUpdateInterval] = useState();
  const [remainingSecond, setRemainingSecond] = useState(0);

  component.startStopwatch = () => {
    if (!updateInterval) {
      const startDate = Date.now();

      setUpdateInterval(setInterval(() => {
        const currentDate = Date.now();
        const gap = getRemainingSeconds(startDate, currentDate, remainingSecond);

        setRemainingSecond((gap / 1000).toFixed(2));
      }, 10));
    }
  };

  component.stopStopwatch = () => {
    clearInterval(updateInterval);
    setUpdateInterval(null);
  };

  component.resetStopwatch = () => {
    setRemainingSecond(0);
    component.stopStopwatch();
  };

  return (
    <div className="stopwatch"> { remainingSecond } </div>
  );
}

const getRemainingSeconds = (startDate, currentDate, stopwatch) => {
  return stopwatch * 1000 + currentDate - startDate;
}
