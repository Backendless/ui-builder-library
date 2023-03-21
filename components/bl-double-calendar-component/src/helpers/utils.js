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

function getFormatPartsOrder(format) {
  return format.split("-").reduce((acc, item, index) => {
    return {
      ...acc,
      [item]: index,
    };
  }, {});
}

export function normalizeFormat(date, format) {
  if (!date) {
    console.warn('Date is not provided!')

    return null;
  }

  const dateParts = date.split("-");
  const { DD, MM, YYYY } = getFormatPartsOrder(format);

  return `${dateParts[MM]}-${dateParts[DD]}-${dateParts[YYYY]}`;
}
