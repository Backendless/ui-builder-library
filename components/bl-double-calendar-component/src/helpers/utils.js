const separators = ['-', '.', ':', '/'];
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

function getSeparator(date) {
  return separators.find(el => date.includes(el));
}

export function normalizeFormat(date, format) {
  if (!date) {
    console.warn('Date is not provided!')

    return null;
  }

  const separator = getSeparator(date);
  const dateParts = date.split(separator);
  const { DD, MM, YYYY } = getFormatPartsOrder(format);

  return `${dateParts[MM]}-${dateParts[DD]}-${dateParts[YYYY]}`;
}

export function getShortDate(date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
