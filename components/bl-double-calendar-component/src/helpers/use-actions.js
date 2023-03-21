import { differenceInTime } from './utils';

export function useActions({ component, startDate, endDate, daysAmount, setStartDate, setEndDate }) {
  Object.assign(component, {
    getFromDate     : () => startDate,
    setFromDate     : fromDate => setStartDate(new Date(fromDate)),
    getToDate       : () => endDate,
    setToDate       : toDate => setEndDate(new Date(toDate)),
    getFromAndToDate: () => ({ fromDate: startDate, toDate: endDate }),
    setFromAndToDate: (fromDate, toDate) => {
      const diffInTime = differenceInTime(new Date(fromDate), new Date(toDate));

      if (diffInTime >= 0) {
        setStartDate(new Date(fromDate));
        setEndDate(new Date(toDate));
      } else {
        console.warn("Date is not valid!");
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
