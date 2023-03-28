import { today } from './index';

export const generateData = (numberDays, data) => {
  if (numberDays && data) {
    const newData = [];

    for (let i = 0; i < numberDays; i++) {
      const previousDay = getPreviousDay(today, i);
      const foundData = data.find(value => new Date(value.date).toDateString() === previousDay.toDateString());

      if (foundData) {
        const { date, count } = foundData;

        newData.push({ date, count });
      } else {
        newData.push({ date: previousDay, count: 0 });
      }
    }

    return newData;
  }

  return data;
};

const getPreviousDay = (date, previousDay) => {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - previousDay);

  return previous;
};

export const shiftDate = (date, numDays) => {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() - numDays);

  return newDate;
};

export const validate = items => {
  if (typeof items === 'string') {
    return items.split(',');
  }

  return items;
};

// https://css-tricks.com/snippets/javascript/lighten-darken-color/
export const shadeColor = (col, amt) => {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  r = validateRgb(r);

  let b = ((num >> 8) & 0x00FF) + amt;

  b = validateRgb(b);

  let g = (num & 0x0000FF) + amt;

  g = validateRgb(g);

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

const validateRgb = color => {
  return Math.max(0, Math.min(255, color));
};
