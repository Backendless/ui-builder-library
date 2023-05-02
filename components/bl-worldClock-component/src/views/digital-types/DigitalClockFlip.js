import { useEffect, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const Formats = {
  AM  : 'AM',
  PM  : 'PM',
  AMPM: 'ampm',
  HOUR: 'hour',
};
const LimitValues = {
  MAX_HOUR       : 23,
  MAX_TIME_UNIT  : 59,
  MIN_DIGIT_VALUE: 10,
};
const Shuffle = {
  FOLD  : 'fold',
  UNFOLD: 'unfold',
};

export function DigitalClockFlip({ time, displaySeconds }) {
  const { hour, minute, second, isAmpm, ampm } = time;

  const [state, setState] = useState({
    hour, minute, second, ampm,
    hourShuffle  : true,
    minuteShuffle: true,
    secondShuffle: true,
    ampmShuffle  : true,
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
      <Semicolon/>
      <FlipUnitContainer unit="minute" digit={ state.minute } shuffle={ state.minuteShuffle }/>

      { displaySeconds && (
        <>
          <Semicolon/>
          <FlipUnitContainer unit="second" digit={ state.second } shuffle={ state.secondShuffle }/>
        </>
      ) }

      { isAmpm && (
        <FlipUnitContainer unit="ampm" digit={ state.ampm } shuffle={ state.ampmShuffle }/>
      ) }
    </div>
  );
}

function Card({ className, digit }) {
  return (
    <div className={ className }>
      <span>{ digit }</span>
    </div>
  );
}

function FlipUnitContainer({ digit, shuffle, unit }) {
  let currentDigit, previousDigit;

  if (unit === Formats.AMPM) {
    currentDigit = digit;
    previousDigit = digit === Formats.AM ? Formats.PM : Formats.AM;
  } else {
    currentDigit = Number(digit);
    previousDigit = digit - 1;

    if (previousDigit < 0) {
      previousDigit = unit === Formats.HOUR ? LimitValues.MAX_HOUR : LimitValues.MAX_TIME_UNIT;
    }

    if (currentDigit < LimitValues.MIN_DIGIT_VALUE) {
      currentDigit = `0${ currentDigit }`;
    }

    if (previousDigit < LimitValues.MIN_DIGIT_VALUE) {
      previousDigit = `0${ previousDigit }`;
    }
  }

  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = shuffle ? currentDigit : previousDigit;
  const animation1 = shuffle ? Shuffle.FOLD : Shuffle.UNFOLD;
  const animation2 = shuffle ? Shuffle.UNFOLD : Shuffle.FOLD;

  return (
    <div className={ cn('flip-unit-container', { 'flip-ampm': unit === Formats.AMPM }) }>
      <Card className="upper-card" digit={ currentDigit }/>
      <Card className="lower-card" digit={ previousDigit }/>
      <Card className={ `flip-card ${ animation1 }` } digit={ digit1 }/>
      <Card className={ `flip-card ${ animation2 }` } digit={ digit2 }/>
    </div>
  );
}

function Semicolon() {
  return (
    <div className="semicolon">
      <span></span>
      <span></span>
    </div>
  );
}
