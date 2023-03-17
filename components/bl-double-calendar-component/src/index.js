import { DateRange } from './date-range';
import { SpecificDateRange } from './specific-date-range';

import { normalizeFormat } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function DoubleCalendarComponent({ component, eventHandlers }) {
 const {
    classList, display, disabled, style, specificDateRange, selectionRange, selectedDate, headerVisibility,
    daysAmountVisibility, monthDropdownVisibility, yearDropdownVisibility, dateFormat, fromDate, toDate
  } = component;
  const { onStartDateChange, onEndDateChange, onDateSelect, onDateReset } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div
      style={ style }
      className={
        cn("bl-customComponent-doubleCalendar", { "bl-customComponent-doubleCalendar--disabled": disabled }, classList)
      }>
      { specificDateRange ?
        <SpecificDateRange
          dateFormat={ dateFormat }
          selectionRange={ selectionRange }
          defaultSelectedDate={ selectedDate }
          onDateSelect={ onDateSelect }
        />
        :
        <DateRange
          toDate={ normalizeFormat(toDate, dateFormat) }
          fromDate={ normalizeFormat(fromDate, dateFormat) }
          dateFormat={ dateFormat }
          headerVisibility={ headerVisibility }
          daysAmountVisibility={ daysAmountVisibility }
          yearDropdownVisibility={ yearDropdownVisibility }
          monthDropdownVisibility={ monthDropdownVisibility }
          component={ component }
          onDateReset={ onDateReset }
          onEndDateChange={ onEndDateChange }
          onStartDateChange={ onStartDateChange }
        />
      }
    </div>
  );
}
