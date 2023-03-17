const ONE_DAY = 86400000;

export function differenceInTime(start, end) {
  return end.getTime() - start.getTime();
}

export function differenceInDays(start, end) {
  if (!start || !end) {
    return 0;
  }

  const diffInTime = differenceInTime(start, end);

  return Math.round(diffInTime / ONE_DAY) + 1;
}

export function normalizeFormat(date, format) {
  if (!date) {
    console.warn('Date is not provided!')

    return null;
  }

  const splitDate = date.split("-");
  const { DD, MM, YYYY } = format.split("-").reduce((acc, item, index) => {
    return {
      ...acc,
      [item]: index,
    };
  }, {});

  return `${splitDate[MM]}-${splitDate[DD]}-${splitDate[YYYY]}`;
}
