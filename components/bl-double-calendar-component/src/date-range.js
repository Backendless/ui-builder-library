import { useState, useEffect, useCallback } from 'react';

import DatePicker from './lib/react-datepicker.min.js';

const { cn } = BackendlessUI.CSSUtils;

export function DateRange(props) {
  const {
    fromDate, toDate, dateFormat, headerVisibility, component, onStartDateChange, onEndDateChange, onDateReset
  } = props;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const daysAmount = differenceInDays(startDate, endDate);
  const resetDisabled = !startDate && !endDate;

  useActions({ component, fromDate, toDate, startDate, endDate, daysAmount, setStartDate, setEndDate });

  // this is needed to display the current month in the calendar after the reset without selecting the current day
  const setCurrentMonthForStartDate = useCallback(() => {
    setStartDate(new Date());
    setTimeout(() => setStartDate(null), 1);
  }, []);

  const setCurrentMonthForEndDate = useCallback(() => {
    setEndDate(new Date());
    setTimeout(() => setEndDate(null), 1);
  }, []);

  useEffect(() => {
    if (!fromDate) {
      console.error("From Date is not provided!");

      setCurrentMonthForStartDate();
    } else {
      setStartDate(new Date(fromDate));
    }
  }, [fromDate]);

  useEffect(() => {
    if (!toDate) {
      console.error("To Date is not provided!");

      setCurrentMonthForEndDate();
    } else {
      setEndDate(new Date(toDate));
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
    setCurrentMonthForEndDate();
    setCurrentMonthForStartDate();

    if (onDateReset) {
      onDateReset();
    }
  };

  return (
    <>
      { headerVisibility &&
        <div className="info">
          <span className="info__days-amount">Days amount: { daysAmount }</span>
          <button
            onClick={ handleReset }
            disabled={ resetDisabled }
            className={ cn("info__button-reset", { "info__button-reset--disabled": resetDisabled }) }>
            Reset
          </button>
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

const ONE_DAY = 86400000;

function useActions({ component, fromDate, toDate, startDate, endDate, daysAmount, setStartDate, setEndDate }) {
  Object.assign(component, {
    getFromDate     : () => startDate,
    setFromDate     : fromDate => setStartDate(new Date(fromDate)),
    getToDate       : () => endDate,
    setToDate       : toDate => setEndDate(new Date(toDate)),
    getFromAndToDate: () => ({ fromDate: startDate, toDate: endDate }),
    setFromAndToDate: (fromDate, toDate) => {
      setStartDate(new Date(fromDate));
      setEndDate(new Date(toDate));
    },
    getDaysAmount   : () => daysAmount,
    resetDate       : () => {
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
