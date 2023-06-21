function getDecimalPrecision(num) {
  const decimalPart = num.toString().split('.')[1];
  
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  if (Object.is(value, null)) {
    return value;
  }
  
  const nearest = Math.round(value / precision) * precision;
  
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

export const getIconHoverValue = (rootNode, iconsAmount, clientX, setHoverValue, precision) => {
  const { left } = rootNode.getBoundingClientRect();
  const { width } = rootNode.firstChild.getBoundingClientRect();
  
  const ratingPrecision = Number(precision);
  const percent = (clientX - left) / (width * iconsAmount);
  const value = iconsAmount * percent + ratingPrecision / 2;
  
  setHoverValue(roundValueToPrecision(value, ratingPrecision).toString());
};
