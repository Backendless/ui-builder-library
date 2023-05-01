const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function DigitalClockTechno({ time, displaySeconds }) {
  const { hour, minute, second, weekday, isAmpm, ampm } = time;

  const isPM = ampm === 'PM';

  return (
    <div className="clock">
      <div className="calendar">
        { WEEKDAYS.map((value, index) => (
          <Word key={ value } value={ value } hidden={ index != weekday }/>
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
            <Word value="AM" hidden={ isPM }/>
            <Word value="PM" hidden={ !isPM }/>
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

function Word({ value, hidden = false }) {
  return (
    <div className="digit">
      <p>{ value }</p>
      <p style={{ visibility:  hidden ? 'hidden' : 'visible' }}>{ value }</p>
    </div>
  );
}
