import { useMemo } from 'react';

import { DateRange } from './date-range';
import { SpecificDateRange } from './specific-date-range';

const { cn } = BackendlessUI.CSSUtils;

export default function MyCustomComponent({ component, eventHandlers }) {
  const {
    classList,
    display,
    disable,
    style,
    specificDateRange,
    selectionRange,
    selectedDate,
    displayHeader,
    dateFrom,
    dateTo,
  } = component;
  const { onStartDateChange, onEndDateChange, onDateSelect, onDateReset } = eventHandlers;
  
  const dayFrom = useMemo(() => dateFrom, [dateFrom]);
  const dayTo = useMemo(() => dateTo, [dateTo]);
  const defaultSelectedDate = useMemo(() => selectedDate, [selectedDate]);
  
  if (!display) {
    return null;
  }

  return (
    <div className={ cn("bl-customComponent-doubleCalendar", { disable }, classList) } style={ style }>
      { specificDateRange ?
        <SpecificDateRange
          selectionRange={ selectionRange }
          defaultSelectedDate={ defaultSelectedDate }
          onDateSelect={ onDateSelect }
        />
        :
        <DateRange
          dayTo={ dayTo }
          dayFrom={ dayFrom }
          displayHeader={ displayHeader }
          onDateReset={ onDateReset }
          onEndDateChange={ onEndDateChange }
          onStartDateChange={ onStartDateChange }
        />
      }
    </div>
  );
}
