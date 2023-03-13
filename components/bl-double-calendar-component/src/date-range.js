import { useState, useEffect, useCallback } from 'react';

import DatePicker from './lib/react-datepicker.min.js';

import { useActions, differenceInDays, differenceInTime } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function DateRange(props) {
  const {
    fromDate, toDate, dateFormat, headerVisibility, daysAmountVisibility, monthDropdownVisibility,
    yearDropdownVisibility, component, onStartDateChange, onEndDateChange, onDateReset
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
          { daysAmountVisibility &&
            <span className="info__days-amount">Days amount: { daysAmount }</span>
          }
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
          scrollableYearDropdown
          scrollableMonthDropdown
          endDate={ endDate }
          selected={ startDate }
          startDate={ startDate }
          dateFormat={ dateFormat }
          yearDropdownItemNumber={ 1000 }
          showYearDropdown={ yearDropdownVisibility }
          showMonthDropdown={ monthDropdownVisibility }
          maxDate={ endDate ? new Date(endDate) : null }
          onChange={ handleStartDateChange }
        />
        <DatePicker
          inline
          selectsEnd
          scrollableYearDropdown
          scrollableMonthDropdown
          endDate={ endDate }
          selected={ endDate }
          minDate={ startDate }
          startDate={ startDate }
          dateFormat={ dateFormat }
          yearDropdownItemNumber={ 1000 }
          showYearDropdown={ yearDropdownVisibility }
          showMonthDropdown={ monthDropdownVisibility }
          onChange={ handleEndDateChange }
        />
      </div>
    </>
  );
}
