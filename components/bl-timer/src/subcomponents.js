import { useRef } from 'react';

import { useAnimation } from './helpers';

export function Time({ timeTens, timeUnits, animationDuration, withDelimeter, timeInterval }) {
  const secondTensRef = useRef();
  const secondUnitsRef = useRef();

  useAnimation(timeTens, secondTensRef, animationDuration);
  useAnimation(timeUnits, secondUnitsRef, animationDuration);

  return (
    <>
      <div className="clock__item" ref={ secondTensRef }></div>
      <div className="clock__item" ref={ secondUnitsRef }></div>
      { timeInterval && (
        <span className="time-interval">{ timeInterval }</span>
      ) }
      { withDelimeter && <Delimiter/> }
    </>
  );
}

function Delimiter() {
  return (
    <div className="clock__item">:</div>
  );
}
