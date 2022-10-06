export const validate = (items) => {
  if (typeof items === 'string') {
    return items.split(',');
  }

  return items;
};

export const shiftDate = (date, numDays) => {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() - numDays);

  return newDate;
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

const validateRgb = (color) => {
  return Math.max(0, Math.min(255, color));
};
