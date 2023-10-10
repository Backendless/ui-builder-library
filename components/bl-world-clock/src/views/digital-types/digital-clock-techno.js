const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function DigitalClockTechno({ time, displaySeconds }) {
  const { hour, minute, second, weekday, isAmpm, ampm } = time;

  const isPM = ampm === 'PM';

  return (
    <div className="clock">
      <div className="calendar">
        { WEEKDAYS.map((value, index) => (
          <Word key={ value } value={ value } dimmed={ String(index) !== weekday }/>
        )) }
      </div>

      <div className="row">
        <div className="hour">
          <Number value={ hour }/>
          <Word value=":"/>
          <Number value={ minute }/>

          { displaySeconds && (
            <>
              <Word value=":"/>
              <Number value={ second }/>
            </>
          ) }
        </div>

        { isAmpm && (
          <div className="ampm">
            <Word value="AM" dimmed={ isPM }/>
            <Word value="PM" dimmed={ !isPM }/>
          </div>
        ) }
      </div>
    </div>
  );
}

function Number({ value = '00' }) {
  return (
    <div className="digit">
      <p>88</p>
      <p>{ value }</p>
    </div>
  );
}

function Word({ value, dimmed = false }) {
  return (
    <div className="digit">
      <p>{ value }</p>
      <p style={{ visibility:  dimmed ? 'hidden' : 'visible' }}>{ value }</p>
    </div>
  );
}
