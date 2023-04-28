import { useEffect, useMemo, useState } from 'react';

const digits = {
  '0': [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  '1': [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  '2': [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
  '3': [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1],
  '4': [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  '5': [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  '6': [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  '7': [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  '8': [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  '9': [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  ':': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
};

function Digit({ value, colors }) {
  return (
    <div className="digit">
      { digits[value].map((active, index) => (
        <div className="segment" style={{ backgroundColor: active ? colors[index] : 'transparent' }} key={ index }/>
      )) }
    </div>
  );
}

export function DigitalClockPixel({ time, displaySeconds }) {
  const { hour, minute, second, isAmpm, ampm } = time;
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const newColors = Array(15)
      .fill()
      .map(() => `rgb(0, ${ Math.floor(Math.random() * 150) }, ${ Math.floor(Math.random() * 255) })`);

    setColors(newColors);
  }, []);

  const digits = useMemo(() => {
    return displaySeconds ? [...hour, ':', ...minute, ':', ...second] : [...hour, ':', ...minute];
  }, [hour, minute, second]);

  return (
    <div className="clock">
      { digits.map((value, index) => (
        <Digit key={ index } value={ value } colors={ colors } />
      )) }

      { isAmpm && (
        <span className="ampm">{ ampm }</span>
      ) }
    </div>
  );
}
