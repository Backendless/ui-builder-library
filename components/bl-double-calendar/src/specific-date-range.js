import { useState, useEffect } from 'react';

import { addDays } from './lib/date-fns.min.js';
import DatePicker from './lib/react-datepicker.min.js';

export function SpecificDateRange({ selectionRange, defaultSelectedDate, startDateOfRange, onDateSelect }) {
  const [startOfRange, setStartOfRange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (startDateOfRange) {
      setStartOfRange(new Date(startDateOfRange));
    }
  }, [startDateOfRange]);

  useEffect(() => {
    const selectedDate = defaultSelectedDate || startDateOfRange || Date.now();

    setSelectedDate(new Date(selectedDate));
  }, [defaultSelectedDate, startDateOfRange]);

  const handleDateSelect = date => {
    setSelectedDate(date);
    onDateSelect({ selectedDate: date });
  }

  return (
    <DatePicker
      inline
      selected={ selectedDate }
      minDate={ startOfRange }
      maxDate={ addDays(startOfRange, selectionRange) }
      onChange={ handleDateSelect }
    />
  );
}
