import AnalogClockClassic from '../lib/analog-clock-classic';

const { cn } = BackendlessUI.CSSUtils;

const AnalogClockTypes = {
  gold   : AnalogClockGold,
  modern : AnalogClockModern,
  vintage: AnalogClockVintage,
};

export function AnalogClock({ time, label, clockSubType, displaySeconds }) {
  const Clock = AnalogClockTypes[clockSubType];
  const { hour, minute, second } = time;
  const hourDegree = (hour % 12) * 30 + minute * 0.5;
  const minuteDegree = minute * 6 + second * 0.1;
  const secondDegree = second * 6;
  const hourStyle = { transform: `rotate(${ hourDegree }deg)` };
  const minuteStyle = { transform: `rotate(${ minuteDegree }deg)` };
  const secondStyle = { transform: `rotate(${ secondDegree }deg)` };
  const handStyle = useHandStyles(hourStyle, minuteStyle, secondStyle, displaySeconds);
  const date = new Date();

  date.setHours(hour, minute, second);

  return (
    <div className={ cn('analog', clockSubType) }>
      { Clock ? (
        <Clock handStyle={ handStyle }/>
      ) : (
        <AnalogClockClassic date={ date } secondHandColor={ displaySeconds ? 'red' : 'transparent' }/>
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

const ClockHands = ({ handStyle, markersVisible, markersFull }) => (
  <div className="clock-time">
    { markersVisible && (markersFull || !markersFull) && (
      <Markers markersFull={ markersFull ?? false }/>
    ) }

    {Object.entries(handStyle).map(([key, value]) => (
      <div className={ `clock-${ key }` } style={ value } key={ key }/>
    ))}

    <div className="clock-rounder"/>
  </div>
);

const Markers = ({ markersFull }) => (
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

function useHandStyles(hour, minute, second, displaySeconds) {
  return { hour, minute, ...(displaySeconds && { second }) };
}
