import Clock from './lib/clock';

const { cn } = BackendlessUI.CSSUtils;

export function AnalogClock({ time, label, timeFormat, clockSubType }) {
  if (clockSubType === 'classic') {
    const date = new Date(time.ts);
    // Late we can added settings for customising this clock
    // https://www.jsdelivr.com/package/npm/@nealrame/react-clock?path=dist&tab=files

    return (
      <div className={ cn('analog', clockSubType) }>
        <Clock date={ date } />
        <div className="clock-label">
          <span className="clock-label-text">{ label }</span>
        </div>
      </div>
    );
  } else {
    const hourDegree = (time.hour % 12) * 30 + time.minute * 0.5;
    const minuteDegree = time.minute * 6 + time.second * 0.1;
    const secondDegree = time.second * 6;

    const hourStyle = { transform: `rotate(${ hourDegree }deg)` };
    const minuteStyle = { transform: `rotate(${ minuteDegree }deg)` };
    const secondStyle = { transform: `rotate(${ secondDegree }deg)` };

    return (
      <div className={ cn('analog', clockSubType) }>
        <div className="clock-time">
          { clockSubType === 'modern' && (
            <>
              <span className="clock-twelve"></span>
              <span className="clock-three"></span>
              <span className="clock-six"></span>
              <span className="clock-nine"></span>
            </>
          ) }

          { clockSubType === 'gold' && (
            <>
              {[...Array(12).keys()].map((i, key) => {
                let a = -60 + 30 * i;
                let b = 60 - 30 * i;
                return (
                  <div className="number" key={ key } style={{ '--rotation': `${ a }deg` }}>
                    <span className="number-content" style={{ transform: `rotate(${ b }deg)` }}>
                      { i + 1 }
                    </span>
                  </div>
                );
              })}
            </>
          ) }

          <div className="clock-hour" style={ hourStyle }></div>
          <div className="clock-minute" style={ minuteStyle }></div>
          <div className="clock-second" style={ secondStyle }></div>
          <div className="clock-rounder"></div>
        </div>
        <div className="clock-label">
          <span className="clock-label-text">{ label }</span>
        </div>
      </div>
    );
  }
}
