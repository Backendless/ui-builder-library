import { useMemo } from 'react';

import ClockClassic from '../lib/analog-clock-classic';
import { Label } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

const AnalogClockTypes = {
  CLASSIC     : 'classic',
  GOLD        : 'gold',
  MODERN      : 'modern',
  CUSTOMIZABLE: 'customizable',
};
const AnalogClockViews = {
  [AnalogClockTypes.CLASSIC]     : AnalogClockClassic,
  [AnalogClockTypes.GOLD]        : AnalogClockGold,
  [AnalogClockTypes.MODERN]      : AnalogClockModern,
  [AnalogClockTypes.CUSTOMIZABLE]: AnalogClockCustomizable,
};
const HOURS_LIST = [...Array(12).keys()];

export function AnalogClock({ time, label, clockStyle, displaySeconds }) {
  const { hour, minute, second } = time;

  const clockProps = useMemo(() => {
    const props = {};

    if (clockStyle === AnalogClockTypes.CLASSIC) {
      props.date = useDate(hour, minute, second);
      props.secondHandColor = displaySeconds ? 'red' : 'transparent';
    } else {
      props.handStyle = useHandStyles(hour, minute, second, displaySeconds);
    }

    return props;
  }, [clockStyle, hour, minute, second, displaySeconds]);

  const Clock = AnalogClockViews[clockStyle];

  return (
    <div className={ cn('analog', clockStyle) }>
      <Clock { ...clockProps }/>
      <Label content={ label }/>
    </div>
  );
}

function AnalogClockClassic({ date, secondHandColor }) {
  return (
    <ClockClassic
      date={ date }
      secondHandColor={ secondHandColor }
      size={ 800 }
      hourMarkerSize={ 32 }
      minuteMarkerSize={ 24 }
      hourMarkerThickness={ 20 }
      minuteMarkerThickness={ 12 }
      hourHandSize={ 200 }
      minuteHandSize={ 280 }
      secondHandSize={ 320 }
      secondHandTailSize={ 40 }
      hourHandThickness={ 28 }
      minuteHandThickness={ 20 }
      secondHandThickness={ 8 }
      hourHandRadius={ 32 }
      minuteHandRadius={ 24 }
      secondHandRadius={ 16 }
      borderThickness={ 16 }
      padding={ 24 }
    />
  );
}

function AnalogClockGold({ handStyle }) {
  return <ClockHands handStyle={ handStyle } markersVisible markersFull/>;
}

function AnalogClockModern({ handStyle }) {
  return <ClockHands handStyle={ handStyle } markersVisible/>;
}

function AnalogClockCustomizable({ handStyle }) {
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
  const renderedMarkers = useMemo(() => {
    if (markersFull) {
      return (
        HOURS_LIST.map(i => {
          const rotation = -60 + 30 * i;
          const rotate = 60 - 30 * i;

          return (
            <div className="number" key={ i } style={{ '--rotation': `${ rotation }deg` }}>
              <span className="number-content" style={{ transform: `rotate(${ rotate }deg)` }}>{ i + 1 }</span>
            </div>
          );
      }));
    }

    return (
      <>
        <span className="clock-twelve"/>
        <span className="clock-three"/>
        <span className="clock-six"/>
        <span className="clock-nine"/>
      </>
    );
  }, [markersFull]);

  return renderedMarkers;
}

function useDate(hour, minute, second) {
  const date = new Date();

  date.setHours(hour, minute, second);

  return date;
}

function useHandStyles(hours, minutes, seconds, displaySeconds) {
  const hourDegree = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegree = minutes * 6 + seconds * 0.1;
  const secondDegree = seconds * 6;

  return {
    hour  : { transform: `rotate(${ hourDegree }deg)` },
    minute: { transform: `rotate(${ minuteDegree }deg)` },
    second: displaySeconds ? { transform: `rotate(${ secondDegree }deg)` } : undefined,
  };
}
