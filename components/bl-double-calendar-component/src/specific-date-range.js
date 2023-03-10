import { useState } from 'react';

import { addDays } from './lib/date-fns.min.js';
import DatePicker from './lib/react-datepicker.min.js';

export function SpecificDateRange({ dateFormat, selectionRange, defaultSelectedDate, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date(defaultSelectedDate || Date.now()));

  const handleDateSelect = date => {
    setSelectedDate(date);
    onDateSelect({ selectedDate: date });
  }

  return (
    <DatePicker
      inline
      selected={ selectedDate }
      minDate={ new Date() }
      maxDate={ addDays(new Date(), selectionRange) }
      dateFormat={ dateFormat }
      onChange={ handleDateSelect }
    />
  );
}
