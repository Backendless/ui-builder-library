import { today } from './index';

const NTH_ROOT = 3;

export const generateData = (numberDays, data) => {
  const newData = [];

  for (let i = 0; i < numberDays; i++) {
    const previousDay = getPreviousDay(today, i);
    const foundData = data.find(({ date }) => dateComparison(date, previousDay));
    const { date, count } = foundData || { date: previousDay, count: 0 };

    newData.push({ date, count });
  }

  return newData;
};

const dateComparison = (date1, date2) => new Date(date1).toDateString() === new Date(date2).toDateString();

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

export const getSaturationByCount = (maxCount, minCount, count) => {
  maxCount = maxCount - minCount;
  count = count - minCount;

  const maxCountRoot = Math.pow(maxCount, 1 / NTH_ROOT);
  const countRoot = Math.pow(count, 1 / NTH_ROOT);
  const onePercentOfSaturationCost = maxCountRoot / 100;

  return countRoot / onePercentOfSaturationCost;
};

// https://gist.github.com/xenozauros/f6e185c8de2a04cdfecf?permalink_comment_id=4193442#gistcomment-4193442
export const hexToHSL = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
};
