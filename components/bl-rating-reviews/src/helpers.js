const DEFAULT_DATA = [{
  value: 1,
  color: '#ffffff',
}];

export const calculatePercent = (value, maxValue) => {
  return value * 100 / maxValue;
};

export const calculateAverage = reviewData => {
  let totalReviews = 0;
  let totalForFormula = 0;

  for (let i = 0; i < reviewData.length; i++) {
    totalReviews += reviewData[i].value;
    totalForFormula += ( reviewData.length - i ) * reviewData[i].value;
  }

  return (totalForFormula / totalReviews).toFixed(1);
};

export const calculateTotalReviews = reviewData => {
  return reviewData.reduce((accumulator, current) => accumulator + current.value, 0);
};

export const prepareReviewData = (data, color) => {
  if (!Array.isArray(data) || data.length === 0) {
    return DEFAULT_DATA;
  }

  return data.map(el => {
    if (typeof el === 'number') {
      return ({
        value: el,
        color: color,
      });
    }
    else {
      return el;
    }
  });
};
