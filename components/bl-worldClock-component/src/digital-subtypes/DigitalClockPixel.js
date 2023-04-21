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
	':': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
};

function Segment({ active, color }) {
  const style = {
    backgroundColor: active ? color : 'transparent'
  };

  return <div className="segment" style={style} />;
}

function Digit({ value, colors }) {
  const segments = digits[value].map((active, index) => (
    <Segment key={ index } active={ active } color={ colors[index] } />
  ));

  return <div className="digit">{ segments }</div>;
}

export function DigitalClockPixel({ time, displaySeconds, ampm, isAmpm }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const newColors = Array(15)
      .fill()
      .map(() => `rgb(0, ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 255)})`);
    setColors(newColors);
  }, []);

  const digits = useMemo(() => {
    const [hour, minute, second] = time.map((num) => num.toString().padStart(2, '0').split(''));
    const formattedTime = displaySeconds ? [...hour, ':', ...minute, ':', ...second] : [...hour, ':', ...minute];

    return formattedTime;
  }, [time]);

  return (
    <div className="clock">
      { digits.map((value, index) => (
        <Digit key={ index } value={ value } colors={ colors } />
      )) }

      { isAmpm && ( <span className="ampm">{ ampm }</span> ) }
    </div>
  );
}
