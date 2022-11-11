import { useRef } from 'react';
import { useLogic } from './helpers';

export function Time({ timeTens, timeUnits }) {
  const secondTensRef = useRef();
  const secondUnitsRef = useRef();

  useLogic(timeTens, secondTensRef);
  useLogic(timeUnits, secondUnitsRef);

  return (
    <>
      <div className="clock__item" ref={ secondTensRef }></div>
      <div className="clock__item" ref={ secondUnitsRef }></div>
    </>
  );
}
