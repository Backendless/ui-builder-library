import { useRef } from 'react';
import { useLogic } from './helpers';

export function Time({ timeTens, timeUnits }) {
  const secondTensRef = useRef();
  const secondUnitsRef = useRef();

  useLogic(timeTens, secondTensRef);
  useLogic(timeUnits, secondUnitsRef);

  return (
    <>
      <div className="digital" ref={ secondTensRef }></div>
      <div className="digital" ref={ secondUnitsRef }></div>
    </>
  );
}
