import { useEffect } from 'react';

import { useObjectState } from '../helpers';

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
const FOLD = 'fold';
const UNFOLD = 'unfold';

export function DigitalClockFlip({ time, displaySeconds }) {
  const { hour, minute, second, isAmpm, ampm } = time;

  const [state, setState] = useObjectState({
    hour, minute, second, ampm,
    hourShuffle  : true,
    minuteShuffle: true,
    secondShuffle: true,
    ampmShuffle  : true,
  });

  useEffect(() => {
    if (hour !== state.hour) {
      setState({ hour, hourShuffle: !state.hourShuffle });
    }

    if (minute !== state.minute) {
      setState({ minute, minuteShuffle: !state.minuteShuffle });
    }

    if (second !== state.second) {
      setState({ second, secondShuffle: !state.secondShuffle });
    }

    if (ampm !== state.ampm) {
      setState({ ampm, ampmShuffle: !state.ampmShuffle });
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

    [previousDigit, currentDigit] = ensureLimits(previousDigit, currentDigit, unit);
  }

  const [digit1, digit2] = shuffle ? [previousDigit, currentDigit] : [currentDigit, previousDigit];

  return (
    <div className={ cn('flip-unit-container', { 'flip-ampm': unit === Formats.AMPM }) }>
      <Card className="upper-card" digit={ currentDigit }/>
      <Card className="lower-card" digit={ previousDigit }/>
      <Card className={ cn('flip-card', shuffle ? FOLD : UNFOLD) } digit={ digit1 }/>
      <Card className={ cn('flip-card', shuffle ? UNFOLD : FOLD) } digit={ digit2 }/>
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

function ensureLimits(prev, current, unit) {
  if (prev < 0) {
    prev = unit === Formats.HOUR ? LimitValues.MAX_HOUR : LimitValues.MAX_TIME_UNIT;
  }

  if (current < LimitValues.MIN_DIGIT_VALUE) {
    current = `0${ current }`;
  }

  if (prev < LimitValues.MIN_DIGIT_VALUE) {
    prev = `0${ prev }`;
  }

  return [prev, current];
}
