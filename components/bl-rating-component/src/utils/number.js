function getDecimalPrecision(num) {
  const decimalPart = num.toString().split('.')[1];
  
  return decimalPart ? decimalPart.length : 0;
}

export const roundValueToPrecision = (value, precision) => {
  if (value == null) return value;

  const nearest = Math.round(value / precision) * precision;
  
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
};