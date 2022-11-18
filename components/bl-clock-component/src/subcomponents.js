import { useRef } from 'react';
import { useAnimation } from './helpers';

export function Time({ timeTens, timeUnits, withDelimeter }) {
  const secondTensRef = useRef();
  const secondUnitsRef = useRef();

  useAnimation(timeTens, secondTensRef);
  useAnimation(timeUnits, secondUnitsRef);

  return (
    <>
      { withDelimeter && (
        <Delimeter />
      )}
      <div className="clock__item" ref={ secondTensRef }></div>
      <div className="clock__item" ref={ secondUnitsRef }></div>
    </>
  );
}

function Delimeter() {

  return (
    <div className="clock__item">:</div>
  )
}
