import { useState, useEffect } from 'react';

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
  const resetButtonDisabled = daysAmount === 1;

  useActions({ component, startDate, endDate, daysAmount, setStartDate, setEndDate });

  useEffect(() => {
    const diffInTime = differenceInTime(new Date(fromDate), new Date(toDate));

    if (fromDate && diffInTime > 0) {
      setStartDate(new Date(fromDate));
    }

    if (!fromDate) {
      console.warn("From Date is not provided!");

      setStartDate(new Date());
    }

    if (diffInTime <= 0) {
      console.warn("From Date is not valid!");

      setStartDate(new Date());
    }
  }, [fromDate]);

  useEffect(() => {
    const diffInTime = differenceInTime(new Date(fromDate), new Date(toDate));

    if (toDate && diffInTime > 0) {
      setEndDate(new Date(toDate));
    }

    if (!toDate) {
      console.warn("To Date is not provided!");

      setEndDate(new Date());
    }

    if (diffInTime <= 0) {
      console.warn("To Date is not valid!");

      setEndDate(new Date());
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
    setStartDate(new Date());
    setEndDate(new Date());

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
            disabled={ resetButtonDisabled }
            className={ cn("info__button-reset", { "info__button-reset--disabled": resetButtonDisabled }) }>
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
          yearDropdownItemNumber={ 50 }
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
          yearDropdownItemNumber={ 50 }
          showYearDropdown={ yearDropdownVisibility }
          showMonthDropdown={ monthDropdownVisibility }
          onChange={ handleEndDateChange }
        />
      </div>
    </>
  );
}
