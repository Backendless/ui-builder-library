import { differenceInTime } from './utils';

export function useActions({ component, startDate, endDate, daysAmount, setStartDate, setEndDate }) {
  Object.assign(component, {
    getFromDate     : () => startDate,
    setFromDate     : fromDate => setStartDate(new Date(fromDate)),
    getToDate       : () => endDate,
    setToDate       : toDate => setEndDate(new Date(toDate)),
    getFromAndToDate: () => ({ fromDate: startDate, toDate: endDate }),
    setFromAndToDate: (fromDate, toDate) => {
      const fromDateObject = new Date(fromDate);
      const toDateObject = new Date(toDate);

      const diffInTime = differenceInTime(fromDateObject, toDateObject);

      if (diffInTime >= 0) {
        setStartDate(fromDateObject);
        setEndDate(toDateObject);
      } else {
        console.warn("The date in the From Date property is later than the To Date! Please pass a valid date.");
      }
    },
    getDaysAmount   : () => daysAmount,
    resetDate       : () => {
      const now = new Date();

      setStartDate(now);
      setEndDate(now);
    }
  })
}
