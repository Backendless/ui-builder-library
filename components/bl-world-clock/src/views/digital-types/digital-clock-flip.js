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
  const [{
    hour, minute, second, ampm, hourShuffle, minuteShuffle, secondShuffle, ampmShuffle,
  }, setState] = useObjectState({
    ...time,
    hourShuffle: true,
    minuteShuffle: true,
    secondShuffle: true,
    ampmShuffle: true,
  });

  useEffect(() => {
    if (time.hour !== hour) {
      setState({ hour: time.hour, hourShuffle: !hourShuffle });
    }

    if (time.minute !== minute) {
      setState({ minute: time.minute, minuteShuffle: !minuteShuffle });
    }

    if (time.second !== second) {
      setState({ second: time.second, secondShuffle: !secondShuffle });
    }

    if (time.ampm !== ampm) {
      setState({ ampm: time.ampm, ampmShuffle: !ampmShuffle });
    }
  }, [time]);

  return (
    <div className="flip-clock">
      <FlipUnitContainer unit="hour" digit={ hour } shuffle={ hourShuffle }/>
      <Semicolon/>
      <FlipUnitContainer unit="minute" digit={ minute } shuffle={ minuteShuffle }/>

      { displaySeconds && (
        <>
          <Semicolon/>
          <FlipUnitContainer unit="second" digit={ second } shuffle={ secondShuffle }/>
        </>
      ) }

      { time.isAmpm && (
        <FlipUnitContainer unit="ampm" digit={ ampm } shuffle={ ampmShuffle }/>
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
