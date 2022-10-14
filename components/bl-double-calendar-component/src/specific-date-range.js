import { useState } from 'react';

import { addDays } from './lib/date-fns.min.js';
import DatePicker from './lib/react-datepicker.min.js';

export function SpecificDateRange({ selectionRange, defaultSelectedDate, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate ? new Date(defaultSelectedDate) : new Date());

  const handleDateSelect = date => {
    setSelectedDate(date);

    if (onDateSelect) {
      onDateSelect({ selectedDate: date });
    }
  }

  return (
    <DatePicker
      inline
      selected={ selectedDate }
      minDate={ new Date() }
      maxDate={ addDays(new Date(), selectionRange) }
      onChange={ handleDateSelect }
    />
  );
}
