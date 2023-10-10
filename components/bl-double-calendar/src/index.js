import { DateRange } from './date-range';
import { SpecificDateRange } from './specific-date-range';

const { cn } = BackendlessUI.CSSUtils;

export default function DoubleCalendarComponent({ component, eventHandlers }) {
 const {
    classList, display, disabled, style, specificDateRange, startDateOfRange, selectionRange, selectedDate,
    headerVisibility, daysAmountVisibility, monthDropdownVisibility, yearDropdownVisibility, fromDate, toDate,
  } = component;
  const { onStartDateChange, onEndDateChange, onDateSelect, onDateReset } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div
      style={ style }
      className={ cn('bl-customComponent-doubleCalendar', { 'bl-customComponent-doubleCalendar--disabled': disabled }, classList) }>
      { specificDateRange ?
        <SpecificDateRange
          selectionRange={ selectionRange }
          defaultSelectedDate={ selectedDate }
          startDateOfRange={ startDateOfRange }
          onDateSelect={ onDateSelect }
        />
        :
        <DateRange
          fromDate={ fromDate }
          toDate={ toDate }
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
