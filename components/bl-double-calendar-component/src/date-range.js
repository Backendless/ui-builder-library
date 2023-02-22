import { useState, useEffect } from 'react';

import DatePicker from './lib/react-datepicker.min.js';

export function DateRange(props) {
  const { fromDate, toDate, headerVisibility, component, onStartDateChange, onEndDateChange, onDateReset } = props;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const daysAmount = differenceInDays(startDate, endDate);

  useActions({ component, fromDate, toDate, startDate, endDate, daysAmount, setStartDate, setEndDate });

  useEffect(() => { setStartDate(new Date(fromDate || 0)) }, [fromDate]);
  useEffect(() => { setEndDate(new Date(toDate || 0)) }, [toDate]);

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

function useActions({ component, fromDate, toDate, startDate, endDate, daysAmount, setStartDate, setEndDate }) {
  Object.assign(component, {
    getFromDate           : () => startDate,
    setFromDate           : fromDate => { setStartDate(new Date(fromDate)) },
    getToDate             : () => endDate,
    setToDate             : toDate => { setEndDate(new Date(toDate)) },
    getFromAndToDate      : () => ({ fromDate: startDate, toDate: endDate }),
    setFromAndToDate      : (fromDate, toDate) => {
      setStartDate(new Date(fromDate));
      setEndDate(new Date(toDate));
    },
    getDaysAmount         : () => daysAmount,
    resetDataInTheCalendar: () => {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  })
}

function differenceInDays(start, end) {
  if (!start || !end) {
    return 0;
  }

  const diffInTime = end.getTime() - start.getTime();

  return Math.round(diffInTime / ONE_DAY) + 1;
}
