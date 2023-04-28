import { useEffect, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const Card = ({ className, digit }) => (
  <div className={ className }>
    <span>{ digit }</span>
  </div>
);

const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  let currentDigit, previousDigit;

  if (unit === 'ampm') {
    currentDigit = digit;
    previousDigit = digit === 'AM' ? 'PM' : 'AM';
  } else {
    currentDigit = digit * 1;
    previousDigit = digit - 1;

    if (previousDigit === -1) {
      previousDigit = unit === 'hour' ? 23 : 59;
    }

    if (currentDigit < 10) {
      currentDigit = `0${ currentDigit }`;
    }

    if (previousDigit < 10) {
      previousDigit = `0${ previousDigit }`;
    }
  }

  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = shuffle ? currentDigit : previousDigit;
  const animation1 = shuffle ? 'fold' : 'unfold';
  const animation2 = shuffle ? 'unfold' : 'fold';

  return (
    <div className={ cn('flip-unit-container', { 'flip-ampm': unit === 'ampm' }) }>
      <Card className="upper-card" digit={ currentDigit }/>
      <Card className="lower-card" digit={ previousDigit }/>
      <Card className={ `flip-card ${ animation1 }` } digit={ digit1 }/>
      <Card className={ `flip-card ${ animation2 }` } digit={ digit2 }/>
    </div>
  );
};

const Semicolon = () => (
  <div className="semicolon">
    <span></span>
    <span></span>
  </div>
);

export function DigitalClockFlip({ time, displaySeconds }) {
  const { hour, minute, second, isAmpm, ampm } = time;
  const [state, setState] = useState({
    hour, minute, second, ampm,
    hourShuffle: true,
    minuteShuffle: true,
    secondShuffle: true,
    ampmShuffle: true
  });

  useEffect(() => {
    if (hour !== state.hour) {
      setState(prevState => ({ ...prevState, hour, hourShuffle: !state.hourShuffle }));
    }

    if (minute !== state.minute) {
      setState(prevState => ({ ...prevState, minute, minuteShuffle: !state.minuteShuffle }));
    }

    if (second !== state.second) {
      setState(prevState => ({ ...prevState, second, secondShuffle: !state.secondShuffle }));
    }

    if (ampm !== state.ampm) {
      setState(prevState => ({ ...prevState, ampm, ampmShuffle: !state.ampmShuffle }));
    }
  }, [hour, minute, second, ampm]);

  return (
    <div className="flip-clock">
      <FlipUnitContainer unit="hour" digit={ state.hour } shuffle={ state.hourShuffle }/>
      <Semicolon />
      <FlipUnitContainer unit="minute" digit={ state.minute } shuffle={ state.minuteShuffle }/>

      { displaySeconds && (
        <>
          <Semicolon />
          <FlipUnitContainer unit="second" digit={ state.second } shuffle={ state.secondShuffle }/>
        </>
      ) }

      { isAmpm && (
        <FlipUnitContainer unit="ampm" digit={ state.ampm } shuffle={ state.ampmShuffle }/>
      ) }
    </div>
  );
}
