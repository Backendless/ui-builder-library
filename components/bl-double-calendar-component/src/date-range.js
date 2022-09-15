import { useState } from 'react';

import DatePicker from './lib/react-datepicker.min.js';

export function DateRange({ dayFrom, dayTo, displayHeader, onStartDateChange, onEndDateChange, onDateReset }) {
  const [startDate, setStartDate] = useState(new Date(dayFrom));
  const [endDate, setEndDate] = useState(new Date(dayTo));

  const daysAmount = getNumberOfDays(startDate, endDate);

  const handleStartDateChange = date => {
    setStartDate(date);

    if (onStartDateChange) {
      onStartDateChange({ startDate: date, daysAmount: getNumberOfDays(date, endDate) });
    }
  };

  const handleEndDateChange = date => {
    setEndDate(date);

    if (onEndDateChange) {
      onEndDateChange({ endDate: date, daysAmount: getNumberOfDays(startDate, date) });
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
      { displayHeader &&
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

function getNumberOfDays(start, end) {
  if (!start || !end) {
    return 0;
  }

  const ONE_DAY = 86400000;
  const diffInTime = end.getTime() - start.getTime();

  return Math.round(diffInTime / ONE_DAY) + 1;
}
