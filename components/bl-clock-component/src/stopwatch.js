import { useState } from 'react';

export function Stopwatch({ component }) {
  const [update, setUpdate] = useState();
  const [stopwatch, setStopwatch] = useState(0);

  component.startStopwatch = () => {
    if (!update) {
      setUpdate(setInterval(() => {
        setStopwatch(state => Number((state + 0.01).toFixed(2)));
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
    <div className=""> { stopwatch } </div>
  );
}
