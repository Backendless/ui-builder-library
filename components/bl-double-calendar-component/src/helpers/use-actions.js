import { differenceInTime, normalizeFormat } from './utils';

export function useActions({ component, dateFormat, startDate, endDate, daysAmount, setStartDate, setEndDate }) {
  Object.assign(component, {
    getFromDate     : () => startDate,
    setFromDate     : fromDate => setStartDate(new Date(normalizeFormat(fromDate, dateFormat))),
    getToDate       : () => endDate,
    setToDate       : toDate => setEndDate(new Date(normalizeFormat(toDate, dateFormat))),
    getFromAndToDate: () => ({ fromDate: startDate, toDate: endDate }),
    setFromAndToDate: (fromDate, toDate) => {
      const normalizedFromDate = new Date(normalizeFormat(fromDate, dateFormat));
      const normalizedToDate = new Date(normalizeFormat(toDate, dateFormat));

      const diffInTime = differenceInTime(normalizedFromDate, normalizedToDate);

      if (diffInTime >= 0) {
        setStartDate(normalizedFromDate);
        setEndDate(normalizedToDate);
      } else {
        console.warn("The date in the From Date property is later than the To Date! Please pass a valid date.");
      }
    },
    getDaysAmount   : () => daysAmount,
    resetDate       : () => {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  })
}
