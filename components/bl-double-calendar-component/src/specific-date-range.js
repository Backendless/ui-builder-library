import { useState } from 'react';

import DatePicker from './lib/react-datepicker.min.js';
import addDays from './lib/date-fns/addDays';

export function SpecificDateRange({ selectionRange, defaultSelectedDate, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date(defaultSelectedDate));
  
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
