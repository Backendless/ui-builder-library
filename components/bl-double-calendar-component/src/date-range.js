import { useState, useEffect } from 'react';

import DatePicker from './lib/react-datepicker.min.js';

import { useActions, differenceInDays, differenceInTime } from './helpers';

export function DateRange(props) {
  const {
    fromDate, toDate, dateFormat, headerVisibility, component, onStartDateChange, onEndDateChange, onDateReset
  } = props;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const daysAmount = differenceInDays(startDate, endDate);

  useActions({ component, fromDate, toDate, startDate, endDate, daysAmount, setStartDate, setEndDate });

  useEffect(() => {
    const diffInTime = differenceInTime(new Date(fromDate), new Date(toDate));

    if (fromDate && diffInTime > 0) {
      setStartDate(new Date(fromDate));
    }

    if (!fromDate) {
      console.error("From Date is not provided!");

      setCurrentMonthForStartDate();
    }

    if (diffInTime <= 0) {
      console.error("From Date is not valid!");

      setCurrentMonthForStartDate();
    }
  }, [fromDate]);

  useEffect(() => {
    const diffInTime = differenceInTime(new Date(fromDate), new Date(toDate));

    if (toDate && diffInTime > 0) {
      setEndDate(new Date(toDate));
    }

    if (!toDate) {
      console.error("To Date is not provided!");

      setCurrentMonthForEndDate();
    }

    if (diffInTime <= 0) {
      console.error("To Date is not valid!");

      setCurrentMonthForEndDate();
    }
  }, [toDate]);

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
    setEndDate(null);

    // this is needed to display the current month in the calendar after the reset without selecting the current day
    setStartDate(new Date());
    setTimeout(() => setStartDate(null), 1);

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
          dateFormat={ dateFormat }
          maxDate={ endDate ? new Date(endDate) : null }
          onChange={ handleStartDateChange }
        />
        <DatePicker
          inline
          selectsEnd
          endDate={ endDate }
          selected={ endDate }
          minDate={ startDate }
          startDate={ startDate }
          dateFormat={ dateFormat }
          onChange={ handleEndDateChange }
        />
      </div>
    </>
  );
}
