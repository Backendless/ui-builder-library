import { useState } from 'react';

export function Stopwatch({ component }) {
  const [update, setUpdate] = useState();
  const [stopwatch, setStopwatch] = useState(0);

  component.startStopwatch = () => {
    if (!update) {
      const startDate = new Date();

      setUpdate(setInterval(() => {
        const currentDate = new Date();
        const gap = stopwatch * 1000 + currentDate.getTime() - startDate.getTime();

        setStopwatch((gap / 1000).toFixed(2));
      }, 10));
    }
  };

  component.stopStopwatch = () => {
    clearInterval(update);
    setUpdate(null);
  };

  component.resetStopwatch = () => {
    setStopwatch(0);
    component.stopStopwatch();
  };

  return (
    <div className="stopwatch"> { stopwatch } </div>
  );
}
