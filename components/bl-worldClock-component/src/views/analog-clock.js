import AnalogClockClassic from '../lib/analog-clock-classic';

const { cn } = BackendlessUI.CSSUtils;

const AnalogClockTypes = {
  GOLD   : 'gold',
  MODERN : 'modern',
  VINTAGE: 'vintage',
};
const AnalogClockViews = {
  [AnalogClockTypes.GOLD]   : AnalogClockGold,
  [AnalogClockTypes.MODERN] : AnalogClockModern,
  [AnalogClockTypes.VINTAGE]: AnalogClockVintage,
};

export function AnalogClock({ time, label, clockStyle, displaySeconds }) {
  const { hour, minute, second } = time;

  const Clock = AnalogClockViews[clockStyle];

  return (
    <div className={ cn('analog', clockStyle) }>
      { Clock ? (
        <Clock handStyle={ useHandStyles(hour, minute, second, displaySeconds) }/>
      ) : (
        <AnalogClockClassic
          date={ useDate(hour, minute, second) }
          secondHandColor={ displaySeconds ? 'red' : 'transparent' }
        />
      ) }

      <div className="clock-label"><span className="clock-label-text">{ label }</span></div>
    </div>
  );
}

function AnalogClockGold({ handStyle }) {
  return <ClockHands handStyle={ handStyle } markersVisible={ true } markersFull={ true }/>;
}

function AnalogClockModern({ handStyle }) {
  return <ClockHands handStyle={ handStyle } markersVisible={ true }/>;
}

function AnalogClockVintage({ handStyle }) {
  return <ClockHands handStyle={ handStyle }/>;
}

function ClockHands({ handStyle, markersVisible, markersFull }) {
  return (
    <div className="clock-time">
      { markersVisible && (
        <Markers markersFull={ markersFull }/>
      ) }

      { Object.entries(handStyle).map(([key, value]) => (
        <div className={ `clock-${ key }` } style={ value } key={ key }/>
      )) }

      <div className="clock-rounder"/>
    </div>
  );
}

function Markers({ markersFull=false }) {
  return (
    <>
      { markersFull ? (
        [...Array(12).keys()].map((i, key) => {
          const rotation = -60 + 30 * i;
          const rotate = 60 - 30 * i;

          return (
            <div className="number" key={ key } style={{ '--rotation': `${ rotation }deg` }}>
              <span className="number-content" style={{ transform: `rotate(${ rotate }deg)` }}>{ i + 1 }</span>
            </div>
          );
      })) : (
        <>
          <span className="clock-twelve"/>
          <span className="clock-three"/>
          <span className="clock-six"/>
          <span className="clock-nine"/>
        </>
      ) }
    </>
  );
}

function useHandStyles(hours, minutes, seconds, displaySeconds) {
  const hourDegree = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegree = minutes * 6 + seconds * 0.1;
  const secondDegree = seconds * 6;
  const hour = { transform: `rotate(${ hourDegree }deg)` };
  const minute = { transform: `rotate(${ minuteDegree }deg)` };
  const second = { transform: `rotate(${ secondDegree }deg)` };

  return { hour, minute, ...(displaySeconds && { second }) };
}

function useDate(hour, minute, second) {
  const date = new Date();

  date.setHours(hour, minute, second);

  return date;
}
