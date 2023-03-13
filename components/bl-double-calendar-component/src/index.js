import { DateRange } from './date-range';
import { SpecificDateRange } from './specific-date-range';

const { cn } = BackendlessUI.CSSUtils;

export default function DoubleCalendarComponent({ component, eventHandlers }) {
  const {
    classList, display, disabled, style, specificDateRange, selectionRange, selectedDate,
    headerVisibility, monthDropdownVisibility, yearDropdownVisibility, dateFormat, fromDate, toDate
  } = component;
  const { onStartDateChange, onEndDateChange, onDateSelect, onDateReset } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn("bl-customComponent-doubleCalendar", { disabled }, classList) } style={ style }>
      { specificDateRange ?
        <SpecificDateRange
          dateFormat={ dateFormat }
          selectionRange={ selectionRange }
          defaultSelectedDate={ selectedDate }
          onDateSelect={ onDateSelect }
        />
        :
        <DateRange
          toDate={ toDate }
          fromDate={ fromDate }
          dateFormat={ dateFormat }
          headerVisibility={ headerVisibility }
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
