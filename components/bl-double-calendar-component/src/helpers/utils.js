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

export function getShortDate(date) {
  const dateObject = new Date(date);

  const month = dateObject.toLocaleDateString('en-US', { month: 'short' });
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  return `${month} ${day} ${year}`;
}
