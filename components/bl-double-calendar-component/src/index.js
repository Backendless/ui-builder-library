import { DateRange } from './date-range';
import { SpecificDateRange } from './specific-date-range';

const { cn } = BackendlessUI.CSSUtils;

export default function DoubleCalendarComponent({ component, eventHandlers }) {
  const {
    classList, display, disabled, style, specificDateRange, selectionRange,
    selectedDate, headerVisibility, fromDate, toDate
  } = component;
  const { onStartDateChange, onEndDateChange, onDateSelect, onDateReset } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn("bl-customComponent-doubleCalendar", { disabled }, classList) } style={ style }>
      { specificDateRange ?
        <SpecificDateRange
          selectionRange={ selectionRange }
          defaultSelectedDate={ selectedDate }
          onDateSelect={ onDateSelect }
        />
        :
        <DateRange
          toDate={ toDate }
          fromDate={ fromDate }
          headerVisibility={ headerVisibility }
          component={ component }
          onDateReset={ onDateReset }
          onEndDateChange={ onEndDateChange }
          onStartDateChange={ onStartDateChange }
        />
      }
    </div>
  );
}
