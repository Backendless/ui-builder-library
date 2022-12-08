import { useRef } from 'react';
import { useAnimation } from './helpers';

export function Time({ timeTens, timeUnits, animationDuration, withDelimeter }) {
  const secondTensRef = useRef();
  const secondUnitsRef = useRef();

  useAnimation(timeTens, secondTensRef, animationDuration);
  useAnimation(timeUnits, secondUnitsRef, animationDuration);

  return (
    <>
      { withDelimeter && <Delimeter/> }
      <div className="clock__item" ref={ secondTensRef }></div>
      <div className="clock__item" ref={ secondUnitsRef }></div>
    </>
  );
}

function Delimeter() {
  return (
    <div className="clock__item">:</div>
  );
}
