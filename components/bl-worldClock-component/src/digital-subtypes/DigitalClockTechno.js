const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const DigitalClockTechno = ({hour, minute, second, weekday, isAmpm, isPM}) => {
  return (
    <div className='clock'>
      <div className='calendar'>
        { weekdays.map((value, index) => (
          <Word key={ value } value={ value } hidden={ index != weekday }/>
        )) }
      </div>

      <div className='row'>
        <div className='hour'>
          <Number value={ hour }/>
          <Word value={ ':' } />
          <Number value={ minute }/>
          <Word value={ ':' } />
          <Number value={ second }/>
        </div>

        { isAmpm && (
          <div className="ampm">
            <Word value={ 'AM' } hidden={ isPM } />
            <Word value={ 'PM' } hidden={ !isPM } />
          </div>
        ) }
      </div>
    </div>
  );
}

const Number = ({ value = 0 }) => {
  const result = String(value).padStart(2, '0');

  return (
    <div className="digit">
      <p>88</p>
      <p>{ result }</p>
    </div>
  )
};

const Word = ({ value, hidden = false }) => {
  const getStyle = () => {
    return { visibility:  hidden ? 'hidden' : 'visible' };
  };

  return (
    <div className="digit">
      <p>{ value }</p>
      <p style={ getStyle() }>{ value }</p>
    </div>
  );
};
