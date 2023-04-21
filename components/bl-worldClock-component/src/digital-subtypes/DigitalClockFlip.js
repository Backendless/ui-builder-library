import { useState, useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;

const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={ `flipCard ${ animation }` }>
      <span>{ digit }</span>
    </div>
  );
};

const StaticCard = ({ position, digit }) => {
  return (
    <div className={ position }>
      <span>{ digit }</span>
    </div>
  );
};

const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  let currentDigit, previousDigit;

  if(unit === 'ampm') {
    currentDigit = digit;
    previousDigit = digit === 'AM' ? 'PM' : 'AM';
  } else {
    currentDigit = digit * 1;
    previousDigit = digit - 1;

    if (unit !== 'hour') {
      previousDigit = previousDigit === -1
        ? 59
        : previousDigit;
    } else {
      previousDigit = previousDigit === -1
        ? 23
        : previousDigit;
    }

    if (currentDigit < 10) {
      currentDigit = `0${ currentDigit }`;
    }
    if (previousDigit < 10) {
      previousDigit = `0${ previousDigit }`;
    }
  }

  const digit1 = shuffle
    ? previousDigit
    : currentDigit;
  const digit2 = !shuffle
    ? previousDigit
    : currentDigit;

  const animation1 = shuffle
    ? 'fold'
    : 'unfold';
  const animation2 = !shuffle
    ? 'fold'
    : 'unfold';

  return (
    <div className={ cn('flipUnitContainer', (unit === 'ampm' ? 'flip-ampm' : '')) }>
      <StaticCard
        position={ 'upperCard' }
        digit={ currentDigit }
      />
      <StaticCard
        position={ 'lowerCard' }
        digit={ previousDigit }
      />
      <AnimatedCard
        digit={ digit1 }
        animation={ animation1 }
      />
      <AnimatedCard
        digit={ digit2 }
        animation={ animation2 }
      />
    </div>
  );
};

const Semicolon = () => {
  return (
    <div className="semicolon">
      <span></span>
      <span></span>
    </div>
  );
}

export function DigitalClockFlip({ hour, minute, second, displaySeconds, ampm, isAmpm }) {
  const [state, setState] = useState({
    hour,
    hourShuffle: true,
    minute,
    minuteShuffle: true,
    second,
    secondShuffle: true,
    ampm,
    ampmShuffle: true
  });

  useEffect(() => {
    if (hour !== state.hour) {
      const hourShuffle = !state.hourShuffle;

      setState(prevState => ({
        ...prevState,
        hour,
        hourShuffle
      }));
    }

    if (minute !== state.minute) {
      const minuteShuffle = !state.minuteShuffle;

      setState(prevState => ({
        ...prevState,
        minute,
        minuteShuffle
      }));
    }

    if (second !== state.second) {
      const secondShuffle = !state.secondShuffle;

      setState(prevState => ({
        ...prevState,
        second,
        secondShuffle
      }));
    }

    if (ampm !== state.ampm) {
      const ampmShuffle = !state.ampmShuffle;

      setState(prevState => ({
        ...prevState,
        ampm,
        ampmShuffle
      }));
    }
  }, [hour, minute, second, ampm]);

  return (
    <div className="flipClock">
      <FlipUnitContainer
        unit={ 'hour' }
        digit={ state.hour }
        shuffle={ state.hourShuffle }
      />
      <Semicolon />
      <FlipUnitContainer
        unit={ 'minute' }
        digit={ state.minute }
        shuffle={ state.minuteShuffle }
      />

      { displaySeconds && (
        <>
          <Semicolon />
          <FlipUnitContainer
            unit={ 'second' }
            digit={ state.second }
            shuffle={ state.secondShuffle }
          />
        </>
      ) }

      { isAmpm && (
        <>
          <FlipUnitContainer
            unit={ 'ampm' }
            digit={ state.ampm }
            shuffle={ state.ampmShuffle }
          />
        </>
      ) }
    </div>
  );
}
