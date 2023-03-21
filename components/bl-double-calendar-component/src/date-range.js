import { useState, useEffect } from 'react';

import DatePicker from './lib/react-datepicker.min.js';

import { Header } from './header';

import { useActions, differenceInDays, differenceInTime } from './helpers';

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
    onStartDateChange({ startDate: date, daysAmount: differenceInDays(date, endDate) });
  };

  const handleEndDateChange = date => {
    setEndDate(date);
    onEndDateChange({ endDate: date, daysAmount: differenceInDays(startDate, date) });
  };

  const handleReset = () => {
    const now = new Date();

    setStartDate(now);
    setEndDate(now);

    onDateReset();
  };

  return (
    <>
      { headerVisibility &&
        <Header
          startDate={ startDate }
          endDate={ endDate }
          daysAmount={ daysAmount }
          daysAmountVisibility={ daysAmountVisibility }
          resetButtonDisabled={ resetButtonDisabled }
          handleReset={ handleReset }
        />
      }
      <div className="date-picker">
        <DatePicker
          inline
          scrollableYearDropdown
          scrollableMonthDropdown
          endDate={ endDate }
          selected={ startDate }
          startDate={ startDate }
          dateFormat={ dateFormat }
          yearDropdownItemNumber={ 50 }
          showYearDropdown={ yearDropdownVisibility }
          showMonthDropdown={ monthDropdownVisibility }
          maxDate={ endDate }
          onChange={ handleStartDateChange }
        />
        <DatePicker
          inline
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
