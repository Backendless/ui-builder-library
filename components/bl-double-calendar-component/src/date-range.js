import { useState, useEffect } from 'react';

import DatePicker from './lib/react-datepicker.min.js';

export function DateRange({ fromDate, toDate, headerVisibility, onStartDateChange, onEndDateChange, onDateReset }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setStartDate(() => fromDate ? new Date(fromDate) : new Date("0"));
    setEndDate(() => toDate ? new Date(toDate) : new Date("0"));
  }, [fromDate, toDate])

  const daysAmount = differenceInDays(startDate, endDate);

  const handleStartDateChange = date => {
    setStartDate(date);

    if (onStartDateChange) {
      onStartDateChange({ startDate: date, daysAmount: differenceInDays(date, endDate) });
    }
  };

  const handleEndDateChange = date => {
    setEndDate(date);

    if (onEndDateChange) {
      onEndDateChange({ endDate: date, daysAmount: differenceInDays(startDate, date) });
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);

    if (onDateReset) {
      onDateReset();
    }
  };

  return (
    <>
      { headerVisibility &&
        <div className="info">
          <span className="info__days-amount">Days amount: { daysAmount }</span>
          <button onClick={ handleReset } className="info__button-reset">Reset</button>
        </div>
      }
      <div className="date-picker">
        <DatePicker
          inline
          selectsStart
          endDate={ endDate }
          selected={ startDate }
          startDate={ startDate }
          onChange={ handleStartDateChange }
        />
        <DatePicker
          inline
          selectsEnd
          endDate={ endDate }
          selected={ endDate }
          minDate={ startDate }
          startDate={ startDate }
          onChange={ handleEndDateChange }
        />
      </div>
    </>
  );
}

const ONE_DAY = 86400000;

function differenceInDays(start, end) {
  if (!start || !end) {
    return 0;
  }

  const diffInTime = end.getTime() - start.getTime();

  return Math.round(diffInTime / ONE_DAY) + 1;
}
